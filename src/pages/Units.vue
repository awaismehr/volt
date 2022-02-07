<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <h5>Units</h5>
        <DataTable
          :value="units"
          :paginator="true"
          class="p-datatable-gridlines"
          :rows="10"
          dataKey="id"
          :rowHover="true"
          v-model:filters="filters"
          filterDisplay="menu"
          :loading="loading1"
          :filters="filters1"
          responsiveLayout="scroll"
          :globalFilterFields="['id', 'date', 'status']"
          @row-click="goToDetailPage"
        >
          <template #header>
            <div class="flex justify-content-between flex-column sm:flex-row">
              <div>
                <Button type="button" icon="pi pi-filter-slash" label="Clear" class="p-button-outlined mb-2 mr-3" @click="clearFilter" />
              </div>

              <span class="p-input-icon-left mb-2">
                <i class="pi pi-search" />
                <InputText v-model="filters['global'].value" placeholder="Keyword Search" style="width: 100%" />
              </span>
            </div>
          </template>
          <template #empty> No units found. </template>
          <template #loading> Loading unit data. Please wait. </template>
          <Column field="id" header="Unit ID" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.unitNumber }}
            </template>
            <template #filter="{ filterModel }">
              <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by id" />
            </template>
          </Column>
          <Column header="Initialized" filterField="date" dataType="date" style="min-width: 10rem">
            <template #body="{ data }">
              {{ formatDate(data.initialized) }}
            </template>
            <template #filter="{ filterModel }">
              <Calendar v-model="filterModel.value" dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" />
            </template>
          </Column>
          <Column field="status" header="Status" :filterMenuStyle="{ width: '14rem' }" style="min-width: 12rem">
            <template #body="{ data }">
              <span :class="'customer-badge status-' + data.status">{{ data.status.replace('-', ' ') }}</span>
            </template>
            <template #filter="{ filterModel }">
              <Dropdown v-model="filterModel.value" :options="status" placeholder="Any" class="p-column-filter" :showClear="true">
                <template #value="slotProps">
                  <span :class="'customer-badge status-' + slotProps.value" v-if="slotProps.value">{{ slotProps.value }}</span>
                  <span v-else>{{ slotProps.placeholder }}</span>
                </template>
                <template #option="slotProps">
                  <span :class="'customer-badge status-' + slotProps.option">{{ slotProps.option.replace('-', ' ') }}</span>
                </template>
              </Dropdown>
            </template>
          </Column>
          <Column field="activity" header="Activity" :showFilterMatchModes="false" style="min-width: 12rem">
            <template #body="{ data }">
              <ProgressBar :value="data.activity" :showValue="false" style="height: 0.5rem"></ProgressBar>
            </template>
            <template #filter="{ filterModel }">
              <Slider v-model="filterModel.value" range class="m-3"></Slider>
              <div class="flex align-items-center justify-content-between px-2">
                <span>{{ filterModel.value ? filterModel.value[0] : 0 }}</span>
                <span>{{ filterModel.value ? filterModel.value[1] : 100 }}</span>
              </div>
            </template>
          </Column>
          <Column field="connection" header="Connection" dataType="boolean" bodyClass="text-center" style="min-width: 8rem">
            <template #body="{ data }">
              <i
                class="pi"
                :class="{
                  'text-green-500 pi-check-circle': data.connection,
                  'text-pink-500 pi-times-circle': !data.connection,
                }"
              ></i>
            </template>
            <template #filter="{ filterModel }">
              <TriStateCheckbox v-model="filterModel.value" />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script>
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Units',
  props: {},
  setup() {
    const { dispatch, getters } = useStore();
    const router = useRouter();
    onMounted(() => dispatch('getAllUnits'));

    const units = computed(() => getters.units);
    const initFilter = () => {
      return {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        id: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
        },
        // 'initialized': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
        representative: { value: null, matchMode: FilterMatchMode.IN },
        date: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
        },
        balance: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
        },
        status: {
          operator: FilterOperator.OR,
          constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
        },
        activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
        connected: { value: null, matchMode: FilterMatchMode.EQUALS },
      };
    };

    const filters = ref(initFilter());

    const clearFilter = () => {
      filters.value = initFilter();
    };

    const formatDate = (value) => {
      const timeStamp = new Date(value).getTime();
      const toDate = new Date(timeStamp).getDate();
      const toMonth = new Date(timeStamp).getMonth() + 1;
      const toYear = new Date(timeStamp).getFullYear();
      const originalDate = toMonth + '/' + toDate + '/' + toYear;
      return originalDate;
    };

    const goToDetailPage = ({ data }) => router.push(`/units/${data.id}`);

    return {
      units,
      filters,
      clearFilter,
      goToDetailPage,
      formatDate,
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

  &.status-needs-attention {
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
