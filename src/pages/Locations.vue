<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <h5>Locations</h5>
        <DataTable
          :value="customer1"
          :paginator="true"
          class="p-datatable-gridlines"
          :rows="10"
          dataKey="id"
          :rowHover="true"
          v-model:filters="filters1"
          filterDisplay="menu"
          :loading="loading1"
          :filters="filters1"
          responsiveLayout="scroll"
          :globalFilterFields="['name', 'country.name', 'representative.name', 'balance', 'status']"
        >
          <template #header>
            <div class="flex justify-content-between flex-column sm:flex-row">
              <div>
                <Button type="button" icon="pi pi-filter-slash" label="Clear" class="p-button-outlined mb-2 mr-3" @click="clearFilter1()" />
                <Button type="button" label="Add Location" class="p-button mb-2" @click="showPopUp()" />
              </div>

              <span class="p-input-icon-left mb-2">
                <i class="pi pi-search" />
                <InputText v-model="filters1['global'].value" placeholder="Keyword Search" style="width: 100%" />
              </span>
            </div>
          </template>
          <template #empty> No locations found. </template>
          <template #loading> Loading location data. Please wait. </template>
          <Column field="name" header="Location" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.name }}
            </template>
            <template #filter="{ filterModel }">
              <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by name" />
            </template>
          </Column>
          <Column header="State" filterField="country.name" style="min-width: 12rem">
            <template #body="{ data }">
              <!-- <img src="../assets/demo/flags/flag_placeholder.png" :alt="data.country.name" :class="'flag flag-' + data.country.code" width="30" /> -->
              <span style="margin-left: 0.5em; vertical-align: middle" class="image-text">{{ data.country.name }}</span>
            </template>
            <template #filter="{ filterModel }">
              <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by country" />
            </template>
            <template #filterclear="{ filterCallback }">
              <Button type="button" icon="pi pi-times" @click="filterCallback()" class="p-button-secondary"></Button>
            </template>
            <template #filterapply="{ filterCallback }">
              <Button type="button" icon="pi pi-check" @click="filterCallback()" class="p-button-success"></Button>
            </template>
          </Column>
          <Column header="Date Added" filterField="date" dataType="date" style="min-width: 10rem">
            <template #body="{ data }">
              {{ formatDate(data.date) }}
            </template>
            <template #filter="{ filterModel }">
              <Calendar v-model="filterModel.value" dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" />
            </template>
          </Column>
          <Column
            header="Support Technician"
            filterField="representative"
            :showFilterMatchModes="false"
            :filterMenuStyle="{ width: '14rem' }"
            style="min-width: 14rem"
          >
            <template #body="{ data }">
              <img :alt="data.representative.name" :src="'images/avatar/' + data.representative.image" width="32" style="vertical-align: middle" />
              <span style="margin-left: 0.5em; vertical-align: middle" class="image-text">{{ data.representative.name }}</span>
            </template>
            <template #filter="{ filterModel }">
              <div class="mb-3 text-bold">Agent Picker</div>
              <MultiSelect v-model="filterModel.value" :options="representatives" optionLabel="name" placeholder="Any" class="p-column-filter">
                <template #option="slotProps">
                  <div class="p-multiselect-representative-option">
                    <img :alt="slotProps.option.name" :src="'images/avatar/' + slotProps.option.image" width="32" style="vertical-align: middle" />
                    <span style="margin-left: 0.5em; vertical-align: middle" class="image-text">{{ slotProps.option.name }}</span>
                  </div>
                </template>
              </MultiSelect>
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
          <Column field="verified" header="Verified" dataType="boolean" bodyClass="text-center" style="min-width: 8rem">
            <template #body="{ data }">
              <i
                class="pi"
                :class="{
                  'text-green-500 pi-check-circle': data.verified,
                  'text-pink-500 pi-times-circle': !data.verified,
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

  <Dialog header="Add Location" v-model:visible="show" :style="{ width: '50vw' }">
    <InputText placeholder="Location Name" style="width: 100%" v-model="name" />
    <template #footer>
      <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="closePopUp" />
      <Button label="Proceed" icon="pi pi-check" autofocus @click="okHandler" />
    </template>
  </Dialog>
</template>

<script>
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import CustomerService from '../service/CustomerService';
import store from '../store';
export default {
  data() {
    return {
      customer1: null,
      filters1: null,
      filters2: {},
      loading1: true,
      name: '',
      loading2: true,
      idFrozen: false,
      show: false,
      expandedRows: [],
      statuses: ['unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal'],
      representatives: [
        { name: 'Amy Elsner', image: 'amyelsner.png' },
        { name: 'Anna Fali', image: 'annafali.png' },
        { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
        { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
        { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
        { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
        { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
        { name: 'Onyama Limba', image: 'onyamalimba.png' },
        { name: 'Stephen Shaw', image: 'stephenshaw.png' },
        { name: 'XuXue Feng', image: 'xuxuefeng.png' },
      ],
    };
  },
  customerService: null,
  created() {
    this.customerService = new CustomerService();
    this.initFilters1();
  },
  mounted() {
    this.customerService.getCustomersLarge().then((data) => {
      this.customer1 = data;
      this.loading1 = false;
      this.customer1.forEach((customer) => (customer.date = new Date(customer.date)));
    });
    this.loading2 = false;
  },
  methods: {
    initFilters1() {
      this.filters1 = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
        },
        'country.name': {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
        },
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
        verified: { value: null, matchMode: FilterMatchMode.EQUALS },
      };
    },
    clearFilter1() {
      this.initFilters1();
    },
    expandAll() {
      this.expandedRows = this.products.filter((p) => p.id);
    },
    collapseAll() {
      this.expandedRows = null;
    },
    showPopUp() {
      this.show = true;
    },

    closePopUp() {
      this.show = false;
    },
    async okHandler() {
      try {
        await store.dispatch('createLocation', { name: this.name });
        this.location = '';
        this.closePopUp();
      } catch (error) {
        console.log(error);
      }
    },

    formatCurrency(value) {
      return value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });
    },
    formatDate(value) {
      return value.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    },
    calculateCustomerTotal(name) {
      let total = 0;
      if (this.customer3) {
        for (let customer of this.customer3) {
          if (customer.representative.name === name) {
            total++;
          }
        }
      }

      return total;
    },
  },
};
</script>

<style scoped lang="scss">
.customer-badge {
  border-radius: 2px;
  padding: 0.25em 0.5rem;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.3px;

  &.status-qualified {
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

  &.status-ready {
    background: #b3e5fc;
    color: #23547b;
  }

  &.status-renewal {
    background: #eccfff;
    color: #694382;
  }

  &.status-proposal {
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
