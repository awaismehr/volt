<template>
  <div class="login-page">
    <form @submit.prevent="sendForgetPasswordEmail">
      <h1 class="text-white">KwikIQ</h1>
      <h6 v-if="err !== ''" class="p-error">{{ err }}</h6>
      <div>
        <span class="p-input-icon-left">
          <i class="pi pi-user" />
          <InputText type="email" placeholder="Email" v-model="email" />
        </span>
        <small v-if="v$.email.$error" class="p-error">{{ v$.email.$errors[0].$message }}</small>
      </div>
      <Button label="Submit" class="mr-2 mb-2 mt-2 w-100" type="submit" />
      <router-link :to="{ name: 'login' }">Sign-in here</router-link>
    </form>
  </div>
</template>

<script>
import { defineComponent, ref, computed, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { forgetPasswordSchema } from '../../validation';
import { useStore } from 'vuex';
import googleLogo from '../../assets/images/googleLogo.png';

export default defineComponent({
  name: 'forgetPass',
  props: {},
  setup() {
    const loading = ref(false);
    const { dispatch } = useStore();

    const state = reactive({
      email: '',
    });

    // validation rules
    const rules = computed(() => forgetPasswordSchema);
    const router = useRouter();
    const v$ = useVuelidate(rules, state);
    const err = ref('');

    const sendForgetPasswordEmail = async () => {
      try {
        v$.value.$validate();
        if (!v$.value.$error) {
          await dispatch('sendForgetPasswordEmail', state);
          v$.value.$reset();
        }
      } catch (error) {
        const exception = error?.response;
        if (exception?.status === 400) err.value = exception?.data?.error?.message;
      }
    };

    return {
      loading,
      sendForgetPasswordEmail,
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
