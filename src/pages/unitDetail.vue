<template>
  <div class="grid unit-detail">
    <div class="col-12 md:col-6">
      <div class="card">
        <div class="grid">
          <!-- <div class="col-1">
            <i class="pi pi-question" style="font-size: 1rem"></i>
          </div> -->
          <div class="col-12">
            <h4>
              Unit {{ unit_id }} at
              <router-link to="#">Vineyard Vines - Grand Central Station</router-link>
            </h4>
            <p class="flex align-center">
              <span>Location: <span class="mr-2">Employee Lounge</span></span>
              <Button label="Change Location" class="p-button-secondary p-button-sm" @click="openModal" />
            </p>
          </div>
        </div>
        <div class="cards-info">
          <div class="grid">
            <div class="col-12 md:col-6">
              <div class="grey-card">
                <h5>MAC Address</h5>
                <div class="grey-card-footer">
                  <p>00:01:2e:71:b7:c8</p>
                </div>
              </div>
            </div>
            <!-- <div class="col-12 md:col-6">
              <div class="grey-card">
                <h5>Software</h5>
                <div class="grey-card-footer">
                  <router-link to="#">
                    <i class="pi pi-github" style="font-size: 1rem"></i
                    >v0.4.4.2(234mj234)</router-link
                  >
                  <p class="sm">2 Apr</p>
                </div>
              </div>
            </div> -->
            <div class="col-12 md:col-6">
              <div class="grey-card">
                <h5>Last Checkin</h5>
                <div class="grey-card-footer">
                  <p>3 minutes ago (connected)</p>
                  <!-- <p class="sm">10 Jun 02:57</p> -->
                </div>
              </div>
            </div>
            <!-- <div class="col-12 md:col-6">
              <div class="grey-card">
                <h5>Last Chef Run</h5>
                <div class="grey-card-footer">
                  <p>over 1 year ago</p>
                  <p class="sm">10 Jun 02:57</p>
                </div>
              </div>
            </div> -->
          </div>
          <!-- <div class="grey-card mt-2">
            <h5>Assembly CIN / Color / USB-C</h5>
            <div class="grey-card-footer">
              <p>
                <router-link to="#">BM-3X-1234n2</router-link>/ White/
                <Checkbox
                  id="token_cards"
                  name="token_cards"
                  v-model="assembly_apply"
                  binary
                  :value="true"
                />
                <button class="btn">Apply</button>
              </p>
            </div>
          </div> -->
        </div>

        <h5>Chamber Status Summary</h5>

        <Accordion class="mt-5">
          <AccordionTab v-for="(bay, index) in bays" :key="index">
            <template #header>
              <div class="accordion--header">
                <div :class="toogleClassName(bay.status)">{{ index + 1 }}</div>
                <div class="accordion--header-item">
                  <div class="grid">
                    <div class="col-6">Last Accessed</div>
                    <div class="col-6">Status</div>
                    <!-- <div class="col-6" v-once v-text="timeSince(+new Date(2021, 11, 8, 16, 19, 0, 0))"></div> -->
                    <div class="col-6">{{ bay.status }}</div>
                  </div>
                </div>
              </div>
            </template>

            <div class="chamber-summary-details">
              <div>12/08/2021 4:19pm: Frank Kailey checked out a device</div>
              <div>12/08/2021 1:18pm: Pamela Everett returned a device</div>
              <div>12/08/2021 1:15pm: Pamela Everett checked out a device</div>
              <div>12/08/2021 10:07am: Frank Kailey checked out a device</div>
              <div>12/07/2021 12:12pm: Irving Averie returned a device</div>
              <div>12/07/2021 9:17am: Irving Averie checked out a device</div>
            </div>
          </AccordionTab>
        </Accordion>

        <h5>Notes:</h5>
        <Textarea placeholder="Installation Notes" :autoResize="true" rows="6" class="w-100" />
      </div>
    </div>
    <div class="col-12 md:col-6">
      <div class="card" style="height: 98%">
        <h5>Recent Activity</h5>

        <div class="col-12 py-0">9 hours ago - Chamber 4 brought online</div>
        <div class="col-12 py-0">1 day ago - Chamber 3 opened remotely</div>
        <div class="col-12 py-0">4 days ago - Chamber 4 taken offline</div>

        <!-- <h5>Deploy New Software</h5>
        <Dropdown
          v-model="software"
          :options="softwareList"
          placeholder="Select Software to deploy to this unit"
          class="w-100"
          optionLabel="name"
          optionValue="value"
        />

        <Button
          label="Deploy"
          icon="pi pi-arrow-circle-right"
          class="mt-3 mb-2 p-button-raised"
          iconPos="right"
        ></Button> -->

        <!-- <div class="col-12 w-100">
          <h5 class="text-center">Latest Screenshot: {{ new Date().toLocaleString() }}</h5>
          <img src="@/assets/demo/unit-detail.png" class="img-fluid" alt="" />
        </div> -->
      </div>
    </div>
  </div>

  <!-- modal content -->
  <Dialog header="Select Location" v-model:visible="visible" :breakpoints="{ '960px': '75vw' }" :style="{ width: '50vw' }">
    <Dropdown
      v-model="selectedLocation"
      :options="locations"
      optionLabel="name"
      optionValue="id"
      placeholder="Select a Location"
      class="w-100"
      @change="changeLocation"
    />
  </Dialog>

  <!-- toast -->
  <Toast />
</template>

<script>
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
export default defineComponent({
  name: 'UnitDetails',
  props: {},
  setup() {
    const { dispatch, getters } = useStore();
    const { params } = useRoute();
    const bays = computed(() => getters.bays);
    const locations = computed(() => getters.locations);
    const selectedLocation = ref(null);
    const visible = ref(false);

    onMounted(() => dispatch('findBaysByUnitId', params.id));

    const toogleClassName = (status) => {
      let className = '';
      if (status === 'Charging') className = 'index chamber-Charging';
      else if (status === 'Finished Charging') className = 'index chamber-Finished-Charging';
      else {
        className = 'index chamber-color';
      }
      return className;
    };

    const openModal = async () => {
      await dispatch('getAllLocations');
      visible.value = true;
    };

    const closeModal = async () => {
      visible.value = false;
    };

    const changeLocation = async () => {
      try {
        await dispatch('changeLocation', { deviceId: params.id, locationId: selectedLocation.value?.id });
        this.$toast.add({
          severity: 'success',
          detail: 'Location changed successfully',
          life: 3000,
        });
        closeModal();
      } catch (error) {
        console.log(error);
      }
    };

    return {
      bays,
      toogleClassName,
      changeLocation,
      openModal,
      closeModal,
      locations,
      selectedLocation,
      visible,
    };
  },
});

// export default {
//   name: 'unit-details',

//   data() {
//     return {
//       unit_id: window.location.href.split('/').slice(-1)[0] || '1480',
//       software: '',
//       reboot_hour: '7 am',
//       complementary_cards: false,
//       token_cards: false,
//       bank_cards: false,
//       institutional_cards: false,
//       cardless_sessions: false,
//       single_sessions: false,
//       chamber_duration: '12',
//       languages: {},
//       primary_language: 'english',
//       primary_pin_code: '',
//       assembly_apply: true,
//       additionalNotes: '',
//       visible: false,
//       selectedLocation: null,
//     };
//   },
//   methods: {
// timeSince(date) {
//       const seconds = Math.floor((new Date() - new Date(date)) / 1000);
//       let interval = seconds / 31536000;

//       if (interval > 1) {
//         return Math.floor(interval) + ' years';
//       }
//       interval = seconds / 2592000;
//       if (interval > 1) {
//         return Math.floor(interval) + ' months';
//       }
//       interval = seconds / 86400;
//       if (interval > 1) {
//         return Math.floor(interval) + ' days';
//       }
//       interval = seconds / 3600;
//       if (interval > 1) {
//         return Math.floor(interval) + ' hours';
//       }
//       interval = seconds / 60;
//       if (interval > 1) {
//         return Math.floor(interval) + ' minutes';
//       }
//       return Math.floor(seconds) + ' seconds';
//     },

//     locations() {
//       return store.state.location.locations;
//     },
//   },
//   computed: {
//     softwareList() {
//       return [
//         { name: 'Vue', value: 'vue' },
//         { name: 'React', value: 'react' },
//         { name: 'Docker', value: 'doc' },
//         { name: 'Angular', value: 'ang' },
//         { name: 'Node', value: 'node' },
//       ];
//     },
//     reboot_hoursList() {
//       return [
//         { name: 'Reboot hour(GMT): 7:00 AM', value: '7 am' },
//         { name: 'Reboot hour(GMT): 8:00 AM', value: '8 am' },
//         { name: 'Reboot hour(GMT): 9:00 AM', value: '9 am' },
//         { name: 'Reboot hour(GMT): 10:00 AM', value: '10 am' },
//       ];
//     },
//     languagesList() {
//       return [
//         { name: 'English', value: 'english' },
//         { name: 'Dutch', value: 'dutch' },
//         { name: 'Arabic', value: 'arabic' },
//       ];
//     },
//     pinCodeList() {
//       return [
//         { name: '5 Digit', value: '5' },
//         { name: '4 Digit', value: '4' },
//         { name: '3 Digit', value: '3' },
//       ];
//     },
//     chamberDurationList() {
//       return [
//         { name: '12 hr', value: '12' },
//         { name: '11 hr', value: '11' },
//         { name: '10 hr', value: '10' },
//         { name: '9 hr', value: '9' },
//         { name: '8 hr', value: '8' },
//       ];
//     },
//   },
// };
</script>

<style lang="scss" scoped>
p {
  margin-bottom: 10px;
}

.align-center {
  align-items: center;
}

.space-between {
  justify-content: space-between;
}

.languages-container {
  position: relative;
  &:after {
    content: '';
    height: 83%;
    width: 4px;
    background-color: #ddd;
    position: absolute;
    left: 6px;
    bottom: -3px;
    border-radius: 10px;
  }
  .field-checkbox {
    padding-left: 2rem;
  }
}

.grey-card {
  background-color: #f3f3f3;
  padding: 5px 8px;
  border-radius: 3px;
  h5 {
    margin-bottom: 5px;
  }
  p {
    margin-bottom: 0;
  }
  &-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .sm {
      font-size: 12px;
    }
  }
}

.btn {
  border: none;
  outline: none;
  box-shadow: none;
  margin-left: 10px;
  display: inline-block;
  background: #bbbbbb;
  padding: 5px 10px;
  border-radius: 5px;
}

.unit-detail {
  .accordion--header {
    flex: 1;
    .index {
      background: #ddd;
      position: absolute;
      left: 0;
      height: 100%;
      top: 0;
      width: 30px;
      display: grid;
      place-items: center;
    }
    &-item {
      padding-left: 2rem;
    }
    .col-6 {
      padding-bottom: 0;
    }
  }

  &::v-deep {
    .p-accordion .p-accordion-header .p-accordion-header-link {
      flex-direction: row-reverse;
    }
    .p-accordion .p-accordion-tab {
      margin-bottom: 10px;
    }
  }
}

.img-fluid {
  max-width: 100%;
  height: auto;
}

div.chamber-Charging {
  background-color: #69eb22 !important;
}

div.chamber-Finished-Charging {
  background-color: #f26dcc !important;
}

div.chamber-color-green,
.chamber-color-red,
.chamber-color {
  color: white;
}

.chamber-summary-details > div {
  padding: 4px 0;
}

.chamber-summary-details > div:not(:last-child) {
  border-bottom: 1px solid black;
}
</style>
