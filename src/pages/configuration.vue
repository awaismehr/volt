<template>
  <div class="grid">
    <Toast />
    <div class="col-12">
      <h5>Configuration</h5>
      <div class="card">
        <div class="col-12 lg:col-4">
          <form @submit.prevent="submitted">
            <div class="field p-fluid">
              <label for="companyName">Company Name</label>
              <InputText id="companyName" name="name" v-model="name" />
            </div>
            <Button label="Submit" class="mr-2" type="submit" />
          </form>
        </div>
      </div>
      <div class="card">
        <div class="field p-fluid">
          <label for="companyLogo">Company Logo</label>
          <FileUpload
            name="file"
            :customUpload="true"
            :multiple="false"
            accept="image/*"
            :maxFileSize="1000000"
            :fileLimit="1"
            @uploader="onUpload"
            ref="file-uploader"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import ConfigurationService from '@/service/ConfigurationService';
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { useToast } from "primevue/usetoast";

export default defineComponent({
  setup() {
    const { dispatch, getters } = useStore();
    const organizationName = computed(() => getters.organizationName);
    const organizationId = computed(() => getters.organizationId);
    const name = ref(organizationName.value ? organizationName.value : "");
    const loading = ref(false);
    const toast = useToast();
    // const uploaderRef = ref('file-uploader');
    // const organizations = computed(() => getters.organizations);

    const submitted = async () => {
      try {
        await dispatch("updateCompany", {
          name: name.value,
          id: organizationId.value,
        });
        toast.add({
          severity: "success",
          summary: "Success",
          detail: "Company name updated",
        });
      } catch (error) {
        console.log(error);
        toast.add({
          severity: "error",
          summary: "Error",
          detail:
            "An issue occured when saving your company name. Please contact support.",
        });
      }
    };

    const onUpload = async (event) => {
      try {
        const file = event.files[0];
        const data = new FormData();
        data.append("file", file);
        data.append("id", organizationId.value);
        loading.value = true;
        await dispatch("updateCompanyLogo", data);
        toast.add({
          severity: "success",
          summary: "Success",
          detail: "Company logo updated",
        });
      } catch (error) {
        console.log(error);
        toast.add({
          severity: "error",
          summary: "Error",
          detail:
            "An issue occured when uploading your company logo. Please contact support.",
        });
      }
    };

    return {
      name,
      loading,
      submitted,
      onUpload,
    };
  },
});
</script>

<style lang="scss">
button.p-button.p-component.p-button-icon-only {
  width: 2.357rem !important;
}
</style>
