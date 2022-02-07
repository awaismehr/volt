<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <h5>Reports</h5>
        <DataTable
          :value="reports"
          :paginator="true"
          class="p-datatable-gridlines"
          :rows="10"
          dataKey="id"
          :rowHover="true"
          showGridlines
          v-model:filters="filters1"
          filterDisplay="menu"
          :loading="loading1"
          :filters="filters1"
          responsiveLayout="scroll"
          :globalFilterFields="['id', 'date', 'status']"
        >
          <template #header>
            <div class="flex justify-content-between flex-column sm:flex-row">
              <div>
                <Button type="button" icon="pi pi-filter-slash" label="Clear" class="p-button-outlined mb-2 mr-3" @click="clearFilter1()" />
              </div>
              <span class="p-input-icon-left mb-2">
                <i class="pi pi-search" />
                <InputText v-model="filters1['global'].value" placeholder="Keyword Search" style="width: 100%" />
              </span>
            </div>
          </template>
          <template #empty> No reports found. </template>
          <template #loading> Loading reporting data. Please wait. </template>
          <Column field="status" header="Status" style="min-width: 10rem">
            <template #body="{ data }">
              <span :class="`reports-badge status-${data.status}`">{{ data.status }}</span>
            </template>
            <template #filter="{ filterModel }">
              <Dropdown v-model="filterModel.value" :options="statuses" placeholder="Any" class="p-column-filter" :showClear="true">
                <template #value="slotProps">
                  <span :class="'reports-badge status-' + slotProps.value" v-if="slotProps.value">{{ slotProps.value }}</span>
                  <span v-else>{{ slotProps.placeholder }}</span>
                </template>
                <template #option="slotProps">
                  <span :class="'reports-badge status-' + slotProps.option">{{ slotProps.option }}</span>
                </template>
              </Dropdown>
            </template>
          </Column>
          <Column field="unitId" header="Unit Id" style="min-width: 8rem">
            <template #body="{ data }">
              {{ data.id }}
            </template>
            <template #filter="{ filterModel }">
              <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by Unit Id" />
            </template>
          </Column>
          <Column field="username" header="Users" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.username }}
            </template>
            <template #filter="{ filterModel }">
              <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by Users" />
            </template>
          </Column>
          <Column field="device" header="Device" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.device }}
            </template>
            <template #filter="{ filterModel }">
              <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by device" />
            </template>
          </Column>
          <Column field="location" header="Location" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.location }}
            </template>
            <template #filter="{ filterModel }">
              <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by Location" />
            </template>
          </Column>
          <Column field="chamber" header="Chamber #" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.chamber }}
            </template>
            <template #filter="{ filterModel }">
              <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by Chamber" />
            </template>
          </Column>

          <Column filterField="date" header="Date & Time" style="min-width: 12rem" dataType="date" field="date">
            <template #body="{ data }">
              {{ formatDate(data.date) }}
            </template>
            <template #filter="{ filterModel }">
              <Calendar v-model="filterModel.value" dateFormat="mm/dd/yy" placeholder="Search by date" :showTime="true" hourFormat="12" />
            </template>
          </Column>
          <Column field="report" header="Report" style="min-width: 15rem">
            <template #body="{ data }">
              {{ data.report }}
            </template>
            <template #filter="{ filterModel }">
              <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by report" />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>

    <input type="file" ref="csv" accept=".csv" class="d-none" @change="getFileHandler" />
  </div>
</template>

<script>
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import ReportService from '@/service/ReportService';
export default {
  data() {
    return {
      reports: null,
      filters1: null,
      filters2: {},
      loading1: true,
      idFrozen: false,
      expandedRows: [],
      statuses: ['Retrieved', 'Deposited'],
    };
  },
  created() {
    this.reportService = new ReportService();
    this.initFilters1();
  },
  mounted() {
    this.reportService
      .getReports()
      .then((data) => {
        this.reports = data;
        this.loading1 = false;
        this.reports.forEach((report) => (report.date = new Date(report.date)));
      })
      .catch((err) => console.log(err));
    this.loading2 = false;
  },
  methods: {
    initFilters1() {
      this.filters1 = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        id: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
        },
        username: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
        },
        device: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
        },
        location: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
        },
        chamber: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
        },
        status: {
          operator: FilterOperator.OR,
          constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
        },
        report: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
        },
        date: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
        },
      };
    },
    clearFilter1() {
      this.initFilters1();
    },
    uploadUserCSV() {
      this.$refs.csv.click();
    },
    formatDate(value) {
      return value.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    },
    async getFileHandler(e) {
      if (e.target.files.length) {
        this.loading1 = true;
        const file = e.target.files[0];
        this.users = await this.userService.uploadCSV(file);
        this.loading1 = false;
      }

      e.target.value = null;
    },
  },
};
</script>

<style scoped lang="scss">
.reports-badge {
  border-radius: 2px;
  padding: 0.25em 0.5rem;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.3px;
  &.status-Retrieved {
    background: #c8e6c9;
    color: #256029;
  }

  &.status-Deposited {
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
