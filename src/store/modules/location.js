import { locationService } from '../../service';

const state = {
  locations: [],
  success: false,
  selectedLocation: null,
};

export const location = {
  state,

  // mutations
  mutations: {
    showLoader(state, loadingStatus) {
      state.loading = loadingStatus;
    },

    createLocation: (state, { location }) => {
      state.location = location;
      state.success = true;
    },

    getAllLocations: (state, { locations }) => {
      state.locations = locations;
      state.success = true;
    },

    setSelectedLocation: (state, { location }) => {
      state.selectedLocation = location;
      state.success = true;
    },
  },

  // getters
  getters: {
    locations: (state) => state.locations,
  },

  // actions
  actions: {
    createLocation: async ({ commit }, data) => {
      try {
        const res = await locationService.create(data);
        commit('createLocation', res.data);
      } catch (error) {
        console.log(error);
      }
    },

    getAllLocations: async ({ commit }) => {
      try {
        const res = await locationService.findAll();
        commit('getAllLocations', res.data);
      } catch (error) {
        console.log(error);
      }
    },
    changeLocation: async ({ commit }, data) => {
      try {
        const res = await locationService.changeLocation(data);
        commit('setSelectedLocation', res.data);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
