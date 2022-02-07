import { unitService } from '../../service';

const state = {
  units: [],
  success: false,
};

export const units = {
  state,

  mutations: {
    getAllUnits: (state, { units }) => {
      state.units = units;
      state.success = true;
    },
  },

  getters: {
    units: (state) => state.units,
  },

  actions: {
    getAllUnits: async ({ commit }) => {
      try {
        const { data } = await unitService.findAll();
        commit('getAllUnits', data);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
