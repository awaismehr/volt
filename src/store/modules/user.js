import { userService } from '../../service';

const state = {
  users: [],
  success: false,
  selectedUser: null,
  report: null,
};

export const user = {
  state,

  // mutations
  mutations: {
    createUsers: (state, { users }) => {
      state.users = users;
      state.success = true;
    },
    getUsers: (state, { users }) => {
      state.users = users;
      state.success = true;
    },

    createUser: (state, { user }) => {
      const users = [...state.users, user];
      state.users = users;
      state.success = true;
    },

    getUser: (state, { user }) => {
      state.selectedUser = user;
      state.success = true;
    },

    assignBay: (state, { user }) => {
      state.selectedUser = user;
      state.success = true;
    },

    userReport: (state, { report }) => {
      state.report = report;
      state.success = true;
    },
  },

  // getters
  getters: {
    users: (state) => state.users,
    selectedUser: (state) => state.selectedUser,
    userReport: (state) => state.report,
  },

  // actions
  actions: {
    createUsers: async ({ commit }, data) => {
      try {
        const res = await userService.createUsers(data);
        commit('createUsers', res.data);
      } catch (error) {
        console.log(error);
      }
    },

    getUsers: async ({ commit }) => {
      try {
        const res = await userService.getUsers();
        commit('getUsers', res.data);
      } catch (error) {
        console.log(error);
      }
    },

    createUser: async ({ commit }, data) => {
      try {
        const res = await userService.createUser(data);
        commit('createUser', res.data);
      } catch (error) {
        console.log(error);
      }
    },

    getUser: async ({ commit }, data) => {
      try {
        const res = await userService.getUser(data);
        commit('getUser', res.data);
      } catch (error) {
        console.log(error);
      }
    },

    assignBay: async ({ commit }, data) => {
      try {
        const res = await userService.assignBay(data.id, data.body);
        commit('assignBay', res.data);
      } catch (error) {
        console.log(error);
      }
    },

    userReport: async ({ commit }, data) => {
      try {
        const res = await userService.report(data);
        commit('userReport', res.data);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
