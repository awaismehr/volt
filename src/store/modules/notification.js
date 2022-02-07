import { notificationService } from '../../service';

const state = {
  notifications: [],
  success: false,
};

export const notification = {
  state,

  // mutations
  mutations: {
    findAllNotifications: (state, { notifications }) => {
      state.notifications = notifications;
      state.success = true;
    },
  },

  // getters
  getters: {
    notifications: (state) => state.notifications,
  },

  // actions
  actions: {
    findAllNotifications: async ({ commit }) => {
      try {
        const res = await notificationService.findAll();
        commit('findAllNotifications', res.data);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
