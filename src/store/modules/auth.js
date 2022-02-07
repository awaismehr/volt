import { authService, organizationService } from '../../service';

const state = {
  user: null,
  success: false,
  loading: false,
  error: '',
  token: '',
};

export const auth = {
  state,

  // mutations
  mutations: {
    showLoader(state, loadingStatus) {
      state.loading = loadingStatus;
    },

    login: (state, { user, token }) => {
      state.user = user;
      state.token = token;
      state.success = true;
    },

    logout: (state) => {
      state.user = null;
      state.token = '';
      state.error = '';
    },

    forgetPassword: (state) => {},

    updateCompany: (state, { organization }) => {
      state.user.Organization = organization;
      state.success = true;
    },

    setError: (state, { error }) => {
      state.error = error.message;
    },
  },

  // getters
  getters: {
    token: (state) => state.token,
    organizations: (state) => state.user.Organizations,
    error: (state) => state.error,
    logo_filename: (state) => state.user?.Organization?.logo_filename,
    organizationName: (state) => state.user?.Organization?.name,
    organizationId: (state) => state.user?.Organization?.id,
  },

  // actions
  actions: {
    login: async ({ commit }, data) => {
      try {
        const res = await authService.login(data);
        commit('login', res.data);
        return res;
      } catch (error) {
        const err = error?.response;
        if (err.status === 400) commit('setError', err?.data);
        commit('setError', err);
        localStorage.clear();
      }
    },
    sendForgetPasswordEmail: ({ commit }, data) => authService.sendForgetPasswordEmail(data),
    forgetPassword: async ({ commit }, data) => {
      try {
        const res = await authService.forgetPassword(data);
        commit('updateCompany', res.data);
      } catch (error) {
        commit('setError', error.response.data);
      }
    },

    updateCompany: async ({ commit }, data) => {
      try {
        const res = await organizationService.update(data);
        commit('updateCompany', res.data);
      } catch (error) {
        commit('setError', error.response.data);
      }
    },

    updateCompanyLogo: async ({ commit }, data) => {
      try {
        const res = await organizationService.update(data);
        commit('updateCompany', res.data);
      } catch (error) {
        commit('setError', error.response.data);
      }
    },
  },
};
