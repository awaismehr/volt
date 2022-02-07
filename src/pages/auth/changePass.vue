<template>
  <div class="login-page">
    <form @submit.prevent="changePassword">
      <h1 class="text-white">KwikIQ</h1>
      <h6 v-if="err !== ''" class="p-error">{{ err }}</h6>
      <div>
        <span class="p-input-icon-left">
          <i class="pi pi-user" />
          <InputText type="password" placeholder="Password" v-model="password" />
        </span>
        <small v-if="v$.password.$error" class="p-error">{{ v$.password.$errors[0].$message }}</small>
      </div>
      <div>
        <span class="p-input-icon-left">
          <i class="pi pi-user" />
          <InputText type="password" placeholder="Confirm Password" v-model="cpassword" />
        </span>
        <small v-if="v$.cpassword.$error" class="p-error">{{ v$.cpassword.$errors[0].$message }}</small>
      </div>
      <Button label="Submit" class="mr-2 mb-2 mt-2 w-100" type="submit" />
    </form>
  </div>
</template>

<script>
import { defineComponent, ref, computed, reactive, toRefs } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { required, helpers, sameAs } from '@vuelidate/validators';
import { useStore } from 'vuex';
import googleLogo from '../../assets/images/googleLogo.png';
import { changePass } from '../../validation';

export default defineComponent({
  name: 'changePass',
  props: {},
  setup() {
    const loading = ref(false);
    const { dispatch } = useStore();

    const state = reactive({
      password: '',
      cpassword: '',
    });

    // validation rules
    const rules = computed(() => changePass(state.password));
    const router = useRouter();
    const { params } = useRoute();
    const v$ = useVuelidate(rules, state);
    const err = ref('');

    const changePassword = async () => {
      try {
        v$.value.$validate();
        if (!v$.value.$error) {
          await dispatch('forgetPassword', { ...state, ...params });
          v$.value.$reset();
          router.push({ name: 'login' });
        }
      } catch (error) {
        const exception = error?.response;
        if (exception?.status === 400) err.value = exception?.data?.error?.message;
      }
    };

    return {
      loading,
      changePassword,
      v$,
      googleLogo,
      err,
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss" scoped>
.login-page {
  width: 100%;

  form {
    max-width: 350px;

    > div {
      margin-bottom: 1rem;

      span,
      input {
        width: 100%;
      }
    }
  }
}

.loginBtn {
  background: white !important;
  color: #7f7f7f !important;
  padding: 0.5rem 5rem !important;
}

.loginBtn span {
  padding-left: 20px;
}
</style>
