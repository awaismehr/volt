<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <h5>Users</h5>
        <DataTable
          :value="users"
          :paginator="true"
          class="p-datatable-gridlines"
          :rows="10"
          dataKey="id"
          ref="tableRef"
          :rowHover="true"
          v-model:filters="filters"
          filterDisplay="menu"
          :loading="loading"
          :filters="filter"
          responsiveLayout="scroll"
          :globalFilterFields="['id', 'date', 'status']"
          @row-click="goToUserDetailPage"
        >
          <template #header>
            <div class="flex justify-content-between flex-column sm:flex-row">
              <div>
                <Button type="button" icon="pi pi-filter-slash" label="Clear" class="p-button-outlined mb-2 mr-3" @click="clearFilter()" />
                <Button type="button" label="Add Users" class="p-button mb-2" @click="showPopUp($event)" />
                <Button type="button" label="Add User" class="p-button mb-2 ml-3" @click="openModal" />
              </div>
              <span class="p-input-icon-left mb-2">
                <i class="pi pi-search" />
                <InputText v-model="filters['global'].value" placeholder="Keyword Search" style="width: 100%" />
              </span>
            </div>
          </template>
          <template #empty> No users found. </template>
          <template #loading> Loading users data. Please wait. </template>
          <Column field="full_name" header="User" style="min-width: 10rem">
            <template #body="{ data }">
              {{ data.full_name }}
            </template>
            <template #filter="{ filterModel }">
              <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by User" />
            </template>
          </Column>
          <Column field="email" header="Email" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.email }}
            </template>
            <template #filter="{ filterModel }">
              <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by email" />
            </template>
          </Column>
          <Column field="access_level" header="Access Level" style="min-width: 8rem">
            <template #body="{ data }">
              {{ data.access_level }}
            </template>
            <template #filter="{ filterModel }">
              <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by access level" />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>

    <input type="file" ref="csv" accept=".csv" class="d-none" @change="getFileHandler" />
    <input type="text" ref="button" class="d-none" @change="getFileHandler" />
  </div>

  <!-- pop-up -->
  <ConfirmPopup />
  <ConfirmPopup group="demo">
    <template #message="slotProps">
      <div class="p-d-flex p-p-4">
        <i :class="slotProps.message.icon" style="font-size: 1.5rem"></i>
        <p class="p-pl-2" ref="div">{{ slotProps.message.message }}</p>
      </div>
    </template>
  </ConfirmPopup>

  <!-- modal -->
  <Dialog v-model:visible="visible" :breakpoints="{ '960px': '75vw', '640px': '100vw' }" :style="{ width: '50vw' }">
    <div class="p-fluid">
      <form @submit.prevent="submitHandler" id="myForm">
        <div class="p-field">
          <label for="fullName">FullName</label>
          <InputText id="fullName" type="text" v-model="full_name" />
        </div>
        <div class="p-field">
          <label for="password">Password</label>
          <InputText id="password" type="password" v-model="password" />
        </div>
      </form>
    </div>
    <template #footer>
      <Button label="Cancel" icon="pi pi-times" @click="closeModal" class="p-button-text" />
      <Button label="Proceed" icon="pi pi-check" autofocus type="submit" form="myForm" />
    </template>
  </Dialog>
</template>

<script>
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { computed, defineComponent, onMounted, reactive, ref, toRefs } from 'vue';
import { useConfirm } from 'primevue/useconfirm';
import { userService } from '@/service';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Users',
  props: {},
  setup() {
    const confirm = useConfirm();
    const initFilter = () => {
      return {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        id: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
        },
        full_name: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
        },
        email: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
        },
        access_level: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
        },
      };
    };

    const filters = ref(initFilter());
    const { getters, dispatch } = useStore();
    const loading = ref(false);
    const users = computed(() => getters.users);
    const tableRef = ref(null);
    const { push } = useRouter();
    const csv = ref(null);
    const visible = ref(false);
    const value = reactive({
      password: '',
      full_name: '',
    });

    onMounted(() => {
      dispatch('getUsers');
    });

    const clearFilter = () => {
      filters.value = initFilter();
    };

    const openModal = () => {
      visible.value = true;
    };

    const closeModal = () => {
      visible.value = false;
    };

    const exportCSV = () => {
      tableRef.value.exportCSV();
    };

    const submitHandler = async () => {
      await dispatch('createUser', value);
      value.password = '';
      value.full_name = '';
      closeModal();
    };

    const getFileHandler = async (e) => {
      try {
        if (e.target.files.length) {
          loading.value = true;
          const file = e.target.files[0];
          if (file.type !== 'text/csv') {
            alert('Invalid file type');
          } else {
            const newUsers = await userService.uploadCSV(file);
            await dispatch('createUsers', { users: newUsers });
            loading.value = false;
          }
        }
        e.target.value = null;
      } catch (error) {
        console.log(error);
      }
    };

    const goToUserDetailPage = ({ data }) => {
      console.log('working');
      push(`/users/${data.id}`);
    };

    const showPopUp = (event) => {
      confirm.require({
        target: event.currentTarget,
        message: 'Do you want to upload or download?',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Upload',
        rejectLabel: 'Download',
        accept: () => csv.value.click(),
        reject: () => exportCSV(),
      });
    };

    return {
      users,
      filters,
      loading,
      clearFilter,
      showPopUp,
      getFileHandler,
      csv,
      visible,
      openModal,
      submitHandler,
      closeModal,
      exportCSV,
      goToUserDetailPage,
      tableRef,
      ...toRefs(value),
    };
  },
});
</script>

<style scoped lang="scss">
.customer-badge {
  border-radius: 2px;
  padding: 0.25em 0.5rem;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.3px;

  &.status-ready {
    background: #c8e6c9;
    color: #256029;
  }

  &.status-unqualified {
    background: #ffcdd2;
    color: #c63737;
  }

  &.status-negotiation {
    background: #feedaf;
    color: #8a5340;
  }

  &.status-attention {
    background: #b3e5fc;
    color: #23547b;
  }

  &.status-renewal {
    background: #eccfff;
    color: #694382;
  }

  &.status-full {
    background: #ffd8b2;
    color: #805b36;
  }
}

.product-badge {
  border-radius: 2px;
  padding: 0.25em 0.5rem;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.3px;

  &.status-instock {
    background: #c8e6c9;
    color: #256029;
  }

  &.status-outofstock {
    background: #ffcdd2;
    color: #c63737;
  }

  &.status-lowstock {
    background: #feedaf;
    color: #8a5340;
  }
}

.order-badge {
  border-radius: 2px;
  padding: 0.25em 0.5rem;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.3px;

  &.order-delivered {
    background: #c8e6c9;
    color: #256029;
  }

  &.order-cancelled {
    background: #ffcdd2;
    color: #c63737;
  }

  &.order-pending {
    background: #feedaf;
    color: #8a5340;
  }

  &.order-returned {
    background: #eccfff;
    color: #694382;
  }
}
</style>
