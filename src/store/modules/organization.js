import { organizationService } from '../../service';

const state = {
  organization: null,
  success: false,
  error: '',
};

export const organization = {
  state,

  // mutations
  mutations: {
    showLoader(state, loadingStatus) {
      state.loading = loadingStatus;
    },

    updateCompany: (state, { organization }) => {
      state.organization = organization;
      state.success = true;
    },

    setError: (state, { error }) => {
      state.error = error.message;
      state.success = false;
    },
  },

  // getters
  getters: {
    organization: (state) => state.organization,
  },

  // actions
  actions: {
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
