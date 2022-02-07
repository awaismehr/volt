<template>
  <div class="grid">
    <Toast />
    <div class="col-12">
      <h5>User detail</h5>
      <div class="card">
        <div
          class="
            col-12
            lg:col-4
            flex
            align-items-center
            justify-content-between
            flex-wrap
          "
          style="width: auto"
        >
          <div class="flex align-items-center flex-wrap flex-1">
            <Avatar
              icon="pi pi-user"
              size="xlarge"
              class="mr-2"
              shape="circle"
            />
            <span class="userName">{{ user?.full_name }}</span>
          </div>
          <div
            class="
              flex
              align-items-center
              flex-wrap
              justify-content-evenly
              flex-1
            "
          >
            <Button
              label="Assign Bay"
              @click="openBaysPopUp"
              class="p-button-sm"
            />
            <Button
              label="Reset Password"
              class="p-button-sm"
              @click="resetPassword"
            />
            <Button
              label="Change Password"
              @click="openPopUp"
              class="p-button-sm"
            />
          </div>
        </div>
      </div>
      <div class="card">
        <div class="col-12 lg:col-4">
          <div class="flex justify-content-between">
            <p class="emailHolder">Email: {{ user?.email }}</p>
            <i class="pi pi-pencil" />
          </div>
        </div>
        <div class="col-12 lg:col-4 mb-5">
          <div class="flex justify-content-between">
            <p>
              Access Level:
              {{ user?.access_level ? user?.access_level : "N/A" }}
            </p>
            <i class="pi pi-pencil" />
          </div>
        </div>

        <!-- data table -->
        <DataTable
          :value="reportArr"
          :paginator="true"
          class="p-datatable-gridlines"
          :rows="10"
          dataKey="id"
          :rowHover="true"
          showGridlines
          filterDisplay="menu"
          responsiveLayout="scroll"
          :globalFilterFields="['id', 'date', 'status']"
        >
          <template #empty> No reports found. </template>
          <template #loading> Loading reporting data. Please wait. </template>
          <Column field="status" header="Status" style="min-width: 10rem">
            <template #body="{ data }">
              <span
                :class="`reports-badge status-${data?.Bay?.Device?.status}`"
                >{{ data?.Bay?.Device?.status }}</span
              >
            </template>
          </Column>
          <Column field="unitNumber" header="Unit Id" style="min-width: 8rem">
            <template #body="{ data }">
              {{ data?.Bay?.Unit?.unitNumber }}
            </template>
          </Column>
          <Column field="device" header="Device" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data?.Bay?.Device?.name }}
            </template>
          </Column>
          <Column field="location" header="Location" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data?.Bay?.Unit?.unitNumber }}
            </template>
          </Column>
          <Column field="BayNumber" header="Chamber#" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data?.Bay?.bayNumber }}
            </template>
          </Column>

          <Column
            filterField="date"
            header="Date & Time"
            style="min-width: 12rem"
            dataType="date"
            field="date"
          >
            <template #body="{ data }">
              {{ data?.date }}
            </template>
          </Column>
          <Column field="report" header="Report" style="min-width: 15rem">
            <template #body="{ data }">
              {{ data?.report }}
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>

  <!--modal here-->
  <Dialog
    header="Change Password"
    v-model:visible="show"
    :style="{ width: '50vw' }"
  >
    <InputText
      type="password"
      placeholder="Password"
      style="width: 100%"
      v-model="password"
    />
    <small v-if="v$.password.$error" class="p-error">{{
      v$.password.$errors[0].$message
    }}</small>
    <InputText
      type="password"
      placeholder="Confirm Password"
      class="mt-5"
      style="width: 100%"
      v-model="cpassword"
    />
    <small v-if="v$.cpassword.$error" class="p-error">{{
      v$.cpassword.$errors[0].$message
    }}</small>
    <template #footer>
      <Button
        label="Cancel"
        icon="pi pi-times"
        class="p-button-text"
        @click="closePopUp"
      />
      <Button label="Proceed" icon="pi pi-check" autofocus @click="okHandler" />
    </template>
  </Dialog>

  <!-- all units and bays  modal -->
  <Dialog
    header="Select Bay"
    v-model:visible="showBaysModal"
    :style="{ width: '50vw' }"
  >
    <div>
      <h5>Units</h5>
      <Dropdown
        v-model="selectedUnit"
        :options="units"
        optionLabel="unitNumber"
        optionValue="id"
        placeholder="Select a Unit"
        class="w-100"
        @change="changeUnitsHandler"
      />
      <template v-if="selectedUnit">
        <h5>Bay</h5>
        <Dropdown
          v-model="selectedBay"
          :options="bays"
          optionLabel="bayNumber"
          optionValue="id"
          placeholder="Select a Bay"
          class="w-100"
        />
      </template>
      <template v-if="selectedUnit">
        <h5>Retrieval Date</h5>
        <Calendar
          class="w-100"
          :showIcon="true"
          v-model="retrievalDate"
          dateFormat="mm/dd/yy"
          placeholder="Pick Retrieval Date"
        />
      </template>
    </div>

    <template #footer>
      <Button
        label="Cancel"
        icon="pi pi-times"
        class="p-button-text"
        @click="closeBaysPopUp"
      />
      <Button
        label="Proceed"
        icon="pi pi-check"
        autofocus
        @click="submitHandler"
        :disabled="!retrievalDate || !selectedBay"
      />
    </template>
  </Dialog>
</template>

<script>
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  toRefs,
} from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { useVuelidate } from "@vuelidate/core";
import { changePass } from "../validation";
import { useToast } from "primevue/usetoast";

export default defineComponent({
  setup() {
    const { dispatch, getters } = useStore();
    const { params } = useRoute();
    const user = computed(() => getters.selectedUser);
    const reportArr = ref([]);
    const show = ref(false);
    const showBaysModal = ref(false);
    const values = reactive({
      password: "",
      cpassword: "",
    });
    const units = computed(() => getters.units);
    const bays = computed(() => getters.bays);
    const report = computed(() => getters.userReport);
    const selectedUnit = ref(null);
    const selectedBay = ref(null);
    const retrievalDate = ref(null);
    const token = computed(() => getters.token);
    const toast = useToast();

    // validation rules
    const rules = computed(() => changePass(values.password));
    const v$ = useVuelidate(rules, values);

    onMounted(async () => {
      await dispatch("getUser", params.id);
      await dispatch("userReport", params.id);
      reportArr.value = [report.value];
    });

    const closePopUp = () => {
      show.value = false;
    };

    const openPopUp = () => {
      show.value = true;
    };

    const closeBaysPopUp = () => {
      showBaysModal.value = false;
    };

    const openBaysPopUp = async () => {
      showBaysModal.value = true;
      await dispatch("getAllUnits");
    };

    const changeUnitsHandler = () =>
      dispatch("findBaysByUnitId", selectedUnit.value);

    const okHandler = async () => {
      try {
        v$.value.$validate();
        if (!v$.value.$error) {
          await dispatch("forgetPassword", {
            ...values,
            ...params,
            token: token.value,
          });
          toast.add({
            severity: "success",
            summary: "Success",
            detail: `${user.value.full_name} password has been successfully updated`,
          });
          v$.value.$reset();
          closePopUp();
        }
      } catch (error) {
        console.log(error);
      }
    };

    const resetPassword = async () => {
      try {
        await dispatch("sendForgetPasswordEmail", { email: user.value.email });
        toast.add({
          severity: "success",
          summary: "Success",
          detail: "Reset password link is sent to email",
        });
      } catch (error) {
        console.log(error);
      }
    };

    const submitHandler = async () => {
      try {
        await dispatch("assignBay", {
          ...params,
          body: { bayId: selectedBay.value },
        });
        selectedUnit.value = false;
        selectedBay.value = false;
        retrievalDate.value = false;
        toast.add({
          severity: "success",
          summary: "Success",
          detail: "Bay assigned successfully",
        });
        closeBaysPopUp();
      } catch (error) {
        console.log(error);
      }
    };

    return {
      user,
      ...toRefs(values),
      report,
      show,
      closePopUp,
      showBaysModal,
      reportArr,
      openPopUp,
      v$,
      openBaysPopUp,
      closeBaysPopUp,
      okHandler,
      retrievalDate,
      units,
      changeUnitsHandler,
      selectedUnit,
      bays,
      selectedBay,
      resetPassword,
      submitHandler,
    };
  },
});
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

  &.status-DEPOSITED {
    background: #ffd8b2;
    color: #805b36;
  }
}

.p-avatar.p-avatar-xl {
  width: 6rem;
  height: 6rem;
}

.flex span {
  font-size: 3rem;
}

.user-icon {
  font-size: 5rem;
  color: #64b5f6;
}

.emailHolder {
  margin-top: 0;
  margin-bottom: 0;
}
</style>
