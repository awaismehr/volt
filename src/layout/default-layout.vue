<template>
  <div :class="containerClass" @click="onWrapperClick">
    <AppTopBar @menu-toggle="onMenuToggle" />
    <div class="layout-sidebar" @click="onSidebarClick">
      <AppMenu :model="menu" @menuitem-click="onMenuItemClick" />
    </div>

    <div class="layout-main-container">
      <div class="layout-main">
        <router-view></router-view>
      </div>
      <AppFooter />
    </div>
    <transition name="layout-mask">
      <div class="layout-mask p-component-overlay" v-if="mobileMenuActive"></div>
    </transition>
  </div>
</template>

<script>
import AppTopBar from './component/AppTopbar.vue';
import AppMenu from './component/AppMenu.vue';
// import AppConfig from "./AppConfig.vue";
import AppFooter from './component/AppFooter.vue';

export default {
  data() {
    return {
      layoutMode: 'static',
      layoutColorMode: 'light',
      staticMenuInactive: false,
      overlayMenuActive: false,
      mobileMenuActive: false,
      menu: [
        {
          label: 'Home',
          items: [
            {
              label: 'Dashboard',
              icon: 'pi pi-fw pi-home',
              to: '/dashboard',
            },
          ],
        },
        {
          label: 'Kwik IQ',
          items: [
            {
              label: 'Locations',
              icon: 'pi pi-fw pi-compass',
              to: '/locations',
            },
            { label: 'Units', icon: 'pi pi-fw pi-tablet', to: '/units' },
            // {label: 'Customers', icon: 'pi pi-fw pi-users' },
            {
              label: 'Reporting',
              icon: 'pi pi-fw pi-chart-bar',
              to: '/reports',
            },
            { label: 'Users', icon: 'pi pi-fw pi-users', to: '/users' },
            { label: 'Alerts', icon: 'pi pi-fw pi-info-circle', to: '/alerts' },
            { label: 'Devices', icon: 'pi pi-fw pi-desktop', to: '/devices' },
          ],
        },
        {
          label: 'Admin',
          icon: 'pi pi-fw pi-clone',
          items: [
            // { label: 'Billing', icon: 'pi pi-fw pi-money-bill' },
            {
              label: 'Configuration',
              icon: 'pi pi-fw pi-cog',
              to: '/configuration',
            },
            // { label: 'Support', icon: 'pi pi-fw pi-question' },
          ],
        },
      ],
    };
  },
  watch: {
    $route() {
      this.menuActive = false;
      this.$toast.removeAllGroups();
    },
  },
  methods: {
    onWrapperClick() {
      if (!this.menuClick) {
        this.overlayMenuActive = false;
        this.mobileMenuActive = false;
      }

      this.menuClick = false;
    },
    onMenuToggle() {
      this.menuClick = true;

      if (this.isDesktop()) {
        if (this.layoutMode === 'overlay') {
          if (this.mobileMenuActive === true) {
            this.overlayMenuActive = true;
          }

          this.overlayMenuActive = !this.overlayMenuActive;
          this.mobileMenuActive = false;
        } else if (this.layoutMode === 'static') {
          this.staticMenuInactive = !this.staticMenuInactive;
        }
      } else {
        this.mobileMenuActive = !this.mobileMenuActive;
      }

      event.preventDefault();
    },
    onSidebarClick() {
      this.menuClick = true;
    },
    onMenuItemClick(event) {
      if (event.item && !event.item.items) {
        this.overlayMenuActive = false;
        this.mobileMenuActive = false;
      }
    },
    onLayoutChange(layoutMode) {
      this.layoutMode = layoutMode;
    },
    onLayoutColorChange(layoutColorMode) {
      this.layoutColorMode = layoutColorMode;
    },
    addClass(element, className) {
      if (element.classList) element.classList.add(className);
      else element.className += ' ' + className;
    },
    removeClass(element, className) {
      if (element.classList) element.classList.remove(className);
      else element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    },
    isDesktop() {
      return window.innerWidth >= 992;
    },
    isSidebarVisible() {
      if (this.isDesktop()) {
        if (this.layoutMode === 'static') return !this.staticMenuInactive;
        else if (this.layoutMode === 'overlay') return this.overlayMenuActive;
      }

      return true;
    },
  },
  computed: {
    containerClass() {
      return [
        'layout-wrapper',
        {
          'layout-overlay': this.layoutMode === 'overlay',
          'layout-static': this.layoutMode === 'static',
          'layout-static-sidebar-inactive': this.staticMenuInactive && this.layoutMode === 'static',
          'layout-overlay-sidebar-active': this.overlayMenuActive && this.layoutMode === 'overlay',
          'layout-mobile-sidebar-active': this.mobileMenuActive,
          'p-input-filled': this.$primevue.config.inputStyle === 'filled',
          'p-ripple-disabled': this.$primevue.config.ripple === false,
          'layout-theme-light': this.$appState.theme.startsWith('saga'),
        },
      ];
    },
    logo() {
      return this.layoutColorMode === 'dark' ? 'images/logo-white.svg' : 'images/logo.svg';
    },
  },
  beforeUpdate() {
    if (this.mobileMenuActive) this.addClass(document.body, 'body-overflow-hidden');
    else this.removeClass(document.body, 'body-overflow-hidden');
  },
  components: {
    AppTopBar: AppTopBar,
    AppMenu: AppMenu,
    // AppConfig: AppConfig,
    AppFooter: AppFooter,
  },
};
</script>
