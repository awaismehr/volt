import { createStore } from 'vuex';
import * as modules from './modules';
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
  modules: modules,
  plugins: [
    createPersistedState({
      paths: ['auth'],
    }),
  ],
});
export default store;
