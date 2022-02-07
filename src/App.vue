<template>
  <router-view />
</template>

<script>
import { computed, defineComponent } from 'vue';
import { HttpService } from './service';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'App',
  props: {},

  setup() {
    const { getters } = useStore();
    const token = computed(() => getters.token);
    HttpService.setToken(token.value);
  },
});
</script>

<style lang="scss">
@import './App.scss';
</style>
