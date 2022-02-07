<template>
  <div class="layout-topbar">
    <button
      class="p-link layout-menu-button layout-topbar-button"
      @click="onMenuToggle"
    >
      <i class="pi pi-bars"></i>
    </button>
    <router-link to="/" class="layout-topbar-logo">
      <img alt="Your logo here" :src="logo_filename" />
    </router-link>

    <button
      class="p-link layout-topbar-menu-button layout-topbar-button"
      v-styleclass="{
        selector: '@next',
        enterClass: 'hidden',
        enterActiveClass: 'scalein',
        leaveToClass: 'hidden',
        leaveActiveClass: 'fadeout',
        hideOnOutsideClick: true,
      }"
    >
      <i class="pi pi-ellipsis-v"></i>
    </button>
    <ul class="layout-topbar-menu hidden lg:flex origin-top">
      <li style="display: flex; align-items: center">
        <img
          alt="KwikIQ Logo"
          :src="defaultLogo"
          style="width: 200px; max-height: 27px"
        />
      </li>
      <!-- notification pop up -->
      <li>
        <Menu ref="NotificationMenu" :model="notifications" :popup="true" />
        <button class="p-link layout-topbar-button" @click="toggleNotification">
          <i class="pi pi-bell"></i>
          <span>Notifications</span>
        </button>
      </li>
      <!-- end notification pop up -->
      <li>
        <Menu ref="menu" :model="menuItems" :popup="true" />
        <button class="p-link layout-topbar-button" @click="toggleMenu">
          <i class="pi pi-user"></i>
          <span>Profile</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import store from "../../store";
import defaultLogo from "@/assets/images/kwikboost_logo.svg";
import defaultCompanyLogo from "@/assets/images/default_company_logo.png";
export default {
  data() {
    return {
      defaultLogo,
    };
  },

  mounted() {
    store.dispatch("findAllNotifications");
  },

  methods: {
    onMenuToggle(event) {
      this.$emit("menu-toggle", event);
    },
    onTopbarMenuToggle(event) {
      this.$emit("topbar-menu-toggle", event);
    },
    toggleMenu(event) {
      this.$refs.menu.toggle(event);
    },
    toggleNotification(event) {
      this.$refs.NotificationMenu.toggle(event);
    },
    logout() {
      this.$store.commit("logout");
      this.$router.replace("/login");
    },
  },
  computed: {
    darkTheme() {
      return this.$appState.theme.startsWith("saga");
    },
    menuItems() {
      return [
        {
          label: "Logout",
          icon: "pi pi-sign-out",
          command: this.logout,
        },
      ];
    },
    notifications() {
      return store.getters.notifications.map((notification) => {
        return { label: notification.description };
      });
    },
    fetchLogo() {
      return this.$store.state.companyLogo;
    },
    logo_filename() {
      return store.getters.logo_filename
        ? `${process.env.VUE_APP_BASE_URL}/images/${store.getters.logo_filename}`
        : defaultCompanyLogo;
    },
  },
};
</script>
