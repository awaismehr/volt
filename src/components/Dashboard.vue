<template>
  <div class="grid">
    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3"
              >Devices Charging</span
            >
            <div class="text-900 font-medium text-xl">112</div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-cyan-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-inbox text-cyan-500 text-xl"></i>
          </div>
        </div>
        <span class="text-green-500 font-medium">6 </span>
        <span class="text-500">deposited in the last hour</span>
      </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3"
              >Average Charging Time</span
            >
            <div class="text-900 font-medium text-xl">230 minutes</div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-orange-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-clock text-orange-500 text-xl"></i>
          </div>
        </div>
        <span class="text-green-500 font-medium">+12% </span>
        <span class="text-500">since last week</span>
      </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Active Users</span>
            <div class="text-900 font-medium text-xl">74</div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-blue-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-users text-blue-500 text-xl"></i>
          </div>
        </div>
        <!-- <span class="text-green-500 font-medium">24 new </span> -->
        <span class="text-500">of 412 Enrolled Users</span>
      </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Connectivity</span>
            <div class="text-900 font-medium text-xl">28 online</div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-purple-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-wifi text-purple-500 text-xl"></i>
          </div>
        </div>
        <!-- <span class="text-green-500 font-medium">21 </span> -->
        <span class="text-500">of 30 total</span>
      </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-6">
      <router-link to="alerts">
        <div class="card mb-0">
          <div class="flex justify-content-between mb-3">
            <div>
              <span class="block text-500 font-medium mb-3"
                >Unresolved Exceptions</span
              >
              <div class="text-900 font-medium text-xl">3 issues</div>
            </div>
            <div
              class="flex align-items-center justify-content-center bg-pink-100 border-round"
              style="width: 2.5rem; height: 2.5rem"
            >
              <i class="pi pi-flag text-purple-500 text-xl"></i>
            </div>
          </div>
          <!-- <span class="text-green-500 font-medium">21 </span> -->
          <span class="text-500">need attention</span>
        </div>
      </router-link>
    </div>
    <div class="col-12 lg:col-6 xl:col-6">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3"
              >Devices Returned</span
            >
            <div class="text-900 font-medium text-xl">397</div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-green-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-info text-yellow-700 text-xl"></i>
          </div>
        </div>
        <span class="text-blue-500 font-medium">13 </span>
        <span class="text-500">unaccounted</span>
      </div>
    </div>

    <div class="col-12 xl:col-6">
      <div class="card">
        <h5>Recent Installations</h5>
        <DataTable
          :value="products"
          :rows="5"
          :paginator="true"
          responsiveLayout="scroll"
        >
          <!-- <Column style="width:15%">
					<template #header>
						Image
					</template>
					<template #body="slotProps">
						<img :src="'images/product/' + slotProps.data.image" :alt="slotProps.data.image" width="50" class="shadow-2" />
					</template>
				</Column> -->
          <Column
            field="location"
            header="Location"
            :sortable="true"
            style="width: 35%"
          ></Column>
          <Column
            field="date"
            header="Date"
            :sortable="true"
            style="width: 35%"
          ></Column>
          <!-- <Column field="date" header="Date" :sortable="true" style="width:35%">
					<template #body="slotProps">
						{{formatCurrency(slotProps.data.price)}}
					</template>
				</Column> -->
          <Column style="width: 15%">
            <template #header> View </template>
            <template #body>
              <Button
                icon="pi pi-search"
                type="button"
                class="p-button-text"
              ></Button>
            </template>
          </Column>
        </DataTable>
      </div>
      <div class="card">
        <div class="flex justify-content-between align-items-center mb-5">
          <h5>Device Mix</h5>
          <!-- <div>
					<Button icon="pi pi-ellipsis-v" class="p-button-text p-button-plain p-button-rounded" @click="$refs.menu2.toggle($event)"></Button>
					<Menu ref="menu2" :popup="true" :model="items"></Menu>
				</div> -->
        </div>
        <ul class="list-none p-0 m-0">
          <li
            class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4"
          >
            <div>
              <span class="text-900 font-medium mr-2 mb-1 md:mb-0">iOS</span>
              <div class="mt-1 text-600">Apple</div>
            </div>
            <div class="mt-2 md:mt-0 flex align-items-center">
              <div
                class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
                style="height: 8px"
              >
                <div class="bg-orange-500 h-full" style="width: 50%"></div>
              </div>
              <span class="text-orange-500 ml-3 font-medium">50%</span>
            </div>
          </li>
          <li
            class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4"
          >
            <div>
              <span class="text-900 font-medium mr-2 mb-1 md:mb-0"
                >Android</span
              >
              <div class="mt-1 text-600">Huawei</div>
            </div>
            <div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
              <div
                class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
                style="height: 8px"
              >
                <div class="bg-cyan-500 h-full" style="width: 16%"></div>
              </div>
              <span class="text-cyan-500 ml-3 font-medium">16%</span>
            </div>
          </li>
          <li
            class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4"
          >
            <div>
              <span class="text-900 font-medium mr-2 mb-1 md:mb-0"
                >Android</span
              >
              <div class="mt-1 text-600">LG</div>
            </div>
            <div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
              <div
                class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
                style="height: 8px"
              >
                <div class="bg-pink-500 h-full" style="width: 67%"></div>
              </div>
              <span class="text-pink-500 ml-3 font-medium">67%</span>
            </div>
          </li>
          <li
            class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4"
          >
            <div>
              <span class="text-900 font-medium mr-2 mb-1 md:mb-0"
                >Android</span
              >
              <div class="mt-1 text-600">Samsung</div>
            </div>
            <div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
              <div
                class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
                style="height: 8px"
              >
                <div class="bg-green-500 h-full" style="width: 35%"></div>
              </div>
              <span class="text-green-500 ml-3 font-medium">35%</span>
            </div>
          </li>
          <li
            class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4"
          >
            <div>
              <span class="text-900 font-medium mr-2 mb-1 md:mb-0"
                >Charging Method</span
              >
              <div class="mt-1 text-600">USB-C cord</div>
            </div>
            <div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
              <div
                class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
                style="height: 8px"
              >
                <div class="bg-purple-500 h-full" style="width: 75%"></div>
              </div>
              <span class="text-purple-500 ml-3 font-medium">75%</span>
            </div>
          </li>
          <li
            class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4"
          >
            <div>
              <span class="text-900 font-medium mr-2 mb-1 md:mb-0"
                >Charging Method</span
              >
              <div class="mt-1 text-600">Lightning cord</div>
            </div>
            <div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
              <div
                class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
                style="height: 8px"
              >
                <div class="bg-teal-500 h-full" style="width: 40%"></div>
              </div>
              <span class="text-teal-500 ml-3 font-medium">40%</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-12 xl:col-6">
      <div class="card">
        <h5>Deployment Overview</h5>
        <Chart type="line" :data="lineData" />
      </div>
      <div class="card">
        <div class="flex align-items-center justify-content-between mb-4">
          <h5>Activity Feed</h5>
          <!-- <div>
					<Button icon="pi pi-ellipsis-v" class="p-button-text p-button-plain p-button-rounded" @click="$refs.menu1.toggle($event)"></Button>
					<Menu ref="menu1" :popup="true" :model="items"></Menu>
				</div> -->
        </div>

        <span class="block text-600 font-medium mb-3">TODAY</span>
        <ul class="p-0 mx-0 mt-0 mb-4 list-none">
          <li
            class="flex align-items-center py-2 border-bottom-1 surface-border"
          >
            <div
              class="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0"
            >
              <i class="pi pi-lock-open text-xl text-blue-500"></i>
            </div>
            <span class="text-700 line-height-3">Chamber 1 on <a href="/#/units/1002">Unit 1002</a> was brought back online</span>
          </li>
          <li class="flex align-items-center py-2">
            <div
              class="w-3rem h-3rem flex align-items-center justify-content-center bg-orange-100 border-circle mr-3 flex-shrink-0"
            >
              <i class="pi pi-sun text-xl text-orange-500"></i>
            </div>
            <span class="text-700 line-height-3">Device in Chamber 2 on <a href="/#/units/1004">Unit 1004</a> has completed charging</span>
          </li>
        </ul>

        <span class="block text-600 font-medium mb-3">YESTERDAY</span>
        <ul class="p-0 m-0 list-none">
          <li
            class="flex align-items-center py-2 border-bottom-1 surface-border"
          >
            <div
              class="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0"
            >
              <i class="pi pi-clock text-xl text-blue-500"></i>
            </div>
            <span class="text-700 line-height-3">Chamber 4 on <a href="/#/units/1029">Unit 1029</a> has been occupied for over 1 week</span>
          </li>
          <li
            class="flex align-items-center py-2 border-bottom-1 surface-border"
          >
            <div
              class="w-3rem h-3rem flex align-items-center justify-content-center bg-pink-100 border-circle mr-3 flex-shrink-0"
            >
              <i class="pi pi-lock text-xl text-pink-500"></i>
            </div>
            <span class="text-700 line-height-3">Chamber 1 on <a href="/#/units/1020">Unit 1020</a> was taken offline</span>
          </li>
        </ul>
      </div>

      <div class="card">
        <div class="flex justify-content-between align-items-center mb-5">
          <h5>Leaderboard</h5>
          <!-- <div>
					<Button icon="pi pi-ellipsis-v" class="p-button-text p-button-plain p-button-rounded" @click="$refs.menu2.toggle($event)"></Button>
					<Menu ref="menu2" :popup="true" :model="items"></Menu>
				</div> -->
        </div>
        <ul class="list-none p-0 m-0">
          <li
            class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4"
          >
            <div>
              <span class="text-900 font-medium mr-2 mb-1 md:mb-0"
                >Unit 1008</span
              >
              <div class="mt-1 text-600">72 devices charged today</div>
            </div>
            <div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
              <div
                class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
                style="height: 8px"
              >
                <div class="bg-purple-500 h-full" style="width: 75%"></div>
              </div>
              <span class="text-purple-500 ml-3 font-medium">52%</span>
            </div>
          </li>
          <li
            class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4"
          >
            <div>
              <span class="text-900 font-medium mr-2 mb-1 md:mb-0">Unit 1012</span>
              <div class="mt-1 text-600">67 devices charged today</div>
            </div>
            <div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
              <div
                class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
                style="height: 8px"
              >
                <div class="bg-pink-500 h-full" style="width: 67%"></div>
              </div>
              <span class="text-pink-500 ml-3 font-medium">48%</span>
            </div>
          </li>
          <li
            class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4"
          >
            <div>
              <span class="text-900 font-medium mr-2 mb-1 md:mb-0"
                >Unit 1001</span
              >
              <div class="mt-1 text-600">60 devices charged today</div>
            </div>
            <div class="mt-2 md:mt-0 flex align-items-center">
              <div
                class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
                style="height: 8px"
              >
                <div class="bg-orange-500 h-full" style="width: 50%"></div>
              </div>
              <span class="text-orange-500 ml-3 font-medium">30%</span>
            </div>
          </li>
        </ul>
      </div>
      <!-- <div class="px-4 py-5 shadow-2 flex flex-column md:flex-row md:align-items-center justify-content-between mb-3" 
			style="border-radius: 1rem; background: linear-gradient(0deg, rgba(0, 123, 255, 0.5), rgba(0, 123, 255, 0.5)), linear-gradient(92.54deg, #1C80CF 47.88%, #FFFFFF 100.01%)">
			<div>
				<div class="text-blue-100 font-medium text-xl mt-2 mb-3">TAKE THE NEXT STEP</div>
				<div class="text-white font-medium text-5xl">Try PrimeBlocks</div>
			</div>
			<div class="mt-4 mr-auto md:mt-0 md:mr-0">
				<a href="https://www.primefaces.org/primeblocks-vue" class="p-button font-bold px-5 py-3 p-button-warning p-button-rounded p-button-raised">
					Get Started
				</a>
			</div>
		</div> -->
    </div>
  </div>
</template>

<script>
import ProductService from "../service/ProductService";

export default {
  data() {
    return {
      products: null,
      lineData: {
        labels: [
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
        ],
        datasets: [
          {
            label: "Active Units",
            data: [50, 57, 72, 93, 124, 153, 313],
            fill: false,
            backgroundColor: "#2196f3",
            borderColor: "#2196f3",
            tension: 0.4,
          },
          {
            label: "Interactions",
            data: [638, 741, 870, 920, 970, 1060, 1300],
            fill: false,
            backgroundColor: "#2f4860",
            borderColor: "#2f4860",
            tension: 0.4,
          },
          {
            label: "Uses",
            data: [504, 640, 752, 810, 820, 960, 1210],
            fill: false,
            backgroundColor: "#00bb7e",
            borderColor: "#00bb7e",
            tension: 0.4,
          },
        ],
      },
      items: [
        { label: "Add New", icon: "pi pi-fw pi-plus" },
        { label: "Remove", icon: "pi pi-fw pi-minus" },
      ],
    };
  },
  productService: null,
  created() {
    this.productService = new ProductService();
  },
  mounted() {
    this.productService
      .getProductsSmall()
      .then((data) => (this.products = data));
  },
  methods: {
    formatCurrency(value) {
      return value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    },
  },
};
</script>
