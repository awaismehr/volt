<template>
  <div class="login-page">
    <form @submit.prevent="login">
      <h1 class="text-white">KwikIQ</h1>
      <h6 v-if="err !== ''" class="p-error">{{ err }}</h6>
      <div>
        <span class="p-input-icon-left">
          <i class="pi pi-user" />
          <InputText type="email" placeholder="Email" v-model="email" />
        </span>
        <small v-if="v$.email.$error" class="p-error">{{ v$.email.$errors[0].$message }}</small>
      </div>
      <div>
        <span class="p-input-icon-left">
          <i class="pi pi-lock" />
          <InputText type="password" placeholder="Password" v-model="password" />
        </span>
        <small v-if="v$.password.$error" class="p-error">{{ v$.password.$errors[0].$message }}</small>
      </div>
      <router-link :to="{ name: 'forgetPassword' }" class="sm">Forgot Password</router-link>
      <Button label="Login" class="mr-2 mb-2 mt-4 w-100" type="submit" />
      <Button type="button" class="loginBtn w-100" @click="loginWithGoogle">
        <img alt="logo" :src="googleLogo" style="width: 1.5rem" />
        <span class="p-text-bold">Login with google</span>
      </Button>

      <p class="sm">Don’t have an account? <router-link to="#">Sign-up here</router-link></p>
    </form>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, computed, reactive, toRefs } from 'vue';
import { installGoogleAuth } from '@/helper';
import { useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { loginSchema } from '../../validation';
import { useStore } from 'vuex';
import googleLogo from '../../assets/images/googleLogo.png';
import { HttpService } from '../../service';

export default defineComponent({
  name: 'login',
  props: {},
  setup() {
    const loading = ref(false);
    const { dispatch, getters } = useStore();

    const state = reactive({
      email: '',
      password: '',
    });

    // validation rules
    const rules = computed(() => loginSchema);
    const router = useRouter();
    const v$ = useVuelidate(rules, state);
    const token = computed(() => getters.token);
    const err = computed(() => getters.error);

    let gAuth;
    const options = {
      clientId: `${process.env.VUE_APP_AUTH_CLIENT_ID}`,
      scope: 'profile email',
      prompt: 'select_account',
    };

    onMounted(async () => {
      gAuth = await installGoogleAuth(options);
    });

    const loginWithGoogle = async () => {
      try {
        if (!gAuth) return;
        await gAuth.signIn();
      } catch (error) {
        console.log(error);
      }
    };

    const login = async () => {
      try {
        v$.value.$validate();
        if (!v$.value.$error) {
          await dispatch('login', state);
          v$.value.$reset();
          HttpService.setToken(token.value);
          router.push({ name: 'users' });
        }
      } catch (error) {
        console.log(error);
      }
    };

    return {
      loading,
      loginWithGoogle,
      login,
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
