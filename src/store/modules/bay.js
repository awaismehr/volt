import { bayService } from '../../service';

const state = {
  bays: [],
  success: false,
};

export const bays = {
  state,

  mutations: {
    findByUnitId: (state, { bays }) => {
      state.bays = bays;
      state.success = true;
    },
  },

  getters: {
    bays: (state) => state.bays,
  },

  actions: {
    findBaysByUnitId: async ({ commit }, unitId) => {
      try {
        const { data } = await bayService.findByUnitId(unitId);
        commit('findByUnitId', data);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
