<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <h5>Subscribed Alerts</h5>
        <div class="alerts">
          <div
            class="alerts--item"
            v-for="alert in alertSettings"
            :key="alert.id"
          >
            <div class="field-checkbox mb-0">
              <input
                type="checkbox"
                name="option"
                :id="'alert' + alert.id"
                :checked="alert.value"
                @change="changeHandler(alert.id)"
              />
              <label :for="'alert' + alert.id"> {{ alert.label }} </label>
            </div>
          </div>
        </div>
        <h5>Recent Alerts</h5>
        <DataTable
          :value="alerts"
          :paginator="true"
          class="p-datatable-gridlines"
          :rows="10"
          dataKey="id"
          :rowHover="true"
          v-model:filters="filters"
          filterDisplay="menu"
          :loading="loading"
          :filters="filters"
          responsiveLayout="scroll"
          :globalFilterFields="['id', 'created_at', 'description']"
          @row-click="goToDetailPage"
        >
          <template #header>
            <div class="flex justify-content-between flex-column sm:flex-row">
              <Button
                type="button"
                icon="pi pi-filter-slash"
                label="Clear"
                class="p-button-outlined mb-2"
                @click="clearFilter1()"
              />
              <span class="p-input-icon-left mb-2">
                <i class="pi pi-search" />
                <InputText
                  v-model="filters['global'].value"
                  placeholder="Keyword Search"
                  style="width: 100%"
                />
              </span>
            </div>
          </template>
          <template #empty> No recent alerts. </template>
          <template #loading> Loading recent alerts. Please wait. </template>
          <Column
            header="Occured At"
            filterField="created_at"
            dataType="date"
            style="min-width: 10rem"
          >
            <template #body="{ data }">
              {{ formatDate(data.created_at) }}
            </template>
            <template #filter="{ filterModel }">
              <Calendar
                v-model="filterModel.value"
                dateFormat="mm/dd/yy"
                placeholder="mm/dd/yyyy"
              />
            </template>
          </Column>
          <Column
            field="description"
            header="Description"
            :showFilterMatchModes="false"
            style="min-width: 12rem"
          >
            <template #body="{ data }">
              {{ data.description }}
            </template>
            <template #filter="{ filterModel }">
              <InputText
                type="text"
                v-model="filterModel.value"
                class="p-column-filter"
                placeholder="Search by description"
              />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script>
import { FilterMatchMode, FilterOperator } from "primevue/api";
import AlertService from "@/service/AlertService";
export default {
  data() {
    return {
      alertService: new AlertService(),
      alertSettings: [],
      alerts: [],
      filters: [],
      loading: false,
    };
  },
  methods: {
    initFilters() {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        description: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
        created_at: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
        },
      };
    },
    async fetchAlerts() {
      try {
        this.loading = true;
        this.alertSettings = await this.alertService.getAlertSettings();
        this.alerts = await this.alertService.getAlerts();
        this.loading = false;
      } catch (error) {
        this.loading = false;
        console.log(error);
      }
    },
    async changeHandler(id) {
      this.alertSettings = await this.alertService.changeAlertState(id);
    },
    clearFilter1() {
      this.initFilters();
    },
    formatDate(value) {
      return new Date(value).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    },
    goToDetailPage({ data }) {
      if (data.unit_id) {
        this.$router.push(`/units/${data.unit_id}`);
      } else if (data.user_id) {
        this.$router.push(`/#/users/${data.user_id}`);
      }
      return;
    },
  },
  created() {
    this.initFilters();
    this.fetchAlerts();
  },
};
</script>

<style lang="scss" scoped>
.alerts {
  &--item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    span {
      margin-right: 1rem;
    }
  }
}

input[type="checkbox"] {
  border: 2px solid #ced4da;
  background: #ffffff;
  width: 20px;
  height: 20px;
  color: #495057;
  border-radius: 6px;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s,
    box-shadow 0.2s;
  margin: 0;
}
</style>
