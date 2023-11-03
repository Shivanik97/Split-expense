<template>
  <body class="bg-tertiary">
    <header class="bg-primary">
      <nav class="flex px-2 py-2 items-center justify-between ml-2 sticky top-0" aria-label="Global">
        <div class="flex lg:flex-1">
          <router-link class="flex items-center" to="/">
            <svg class="w-10 h-auto" width="100" height="100" viewBox="0 0 100 100" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <rect width="100" height="100" rx="10" fill="white" />
              <path
                d="M37.656 68V31.6364H51.5764C54.2043 31.6364 56.3882 32.0507 58.1283 32.8793C59.8802 33.696 61.1882 34.8146 62.0523 36.2351C62.9282 37.6555 63.3662 39.2654 63.3662 41.0646C63.3662 42.5443 63.0821 43.8108 62.5139 44.8643C61.9458 45.906 61.1823 46.7524 60.2235 47.4034C59.2646 48.0544 58.1934 48.522 57.0097 48.8061V49.1612C58.2999 49.2322 59.5369 49.6288 60.7206 50.3509C61.9162 51.0611 62.8927 52.0672 63.6503 53.3693C64.4079 54.6714 64.7867 56.2457 64.7867 58.0923C64.7867 59.9744 64.3309 61.6671 63.4195 63.1705C62.508 64.6619 61.1349 65.8397 59.3002 66.7038C57.4654 67.5679 55.1572 68 52.3754 68H37.656ZM44.2433 62.4957H51.3279C53.719 62.4957 55.4413 62.04 56.4948 61.1286C57.5601 60.2053 58.0928 59.0215 58.0928 57.5774C58.0928 56.5002 57.8264 55.5296 57.2938 54.6655C56.7611 53.7895 56.0035 53.103 55.021 52.6058C54.0386 52.0968 52.8667 51.8423 51.5054 51.8423H44.2433V62.4957ZM44.2433 47.1016H50.7597C51.896 47.1016 52.92 46.8944 53.8314 46.4801C54.7429 46.054 55.459 45.4562 55.9798 44.6868C56.5125 43.9055 56.7789 42.9822 56.7789 41.9169C56.7789 40.5083 56.2817 39.3482 55.2874 38.4368C54.3049 37.5253 52.843 37.0696 50.9017 37.0696H44.2433V47.1016Z"
                fill="#336963" />
            </svg>
            <span class="ml-2 self-center text-2xl font-semibold whitespace-nowrap text-white">Bill-Buddy</span>
          </router-link>
        </div>
        <div class=" lg:flex lg:flex-1 lg:justify-end">
          <div v-if="!isAuthenticated">
            <a href="#" class="text-lg  font-semibold leading-6 text-white" @click="login">LogIn <span
                aria-hidden="true"></span></a>
          </div>
          <div v-else>
            <Menu as="div" class="relative ml-3">
              <div>
                <MenuButton
                  class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span class="absolute -inset-1.5" />
                  <span class="sr-only">Open user menu</span>
                  <img class="h-8 w-8 rounded-full" :src="user?.picture" referrerPolicy="no-referrer" alt="" />
                </MenuButton>
              </div>
              <transition enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95">
                <MenuItems
                  class="absolute w-max top-10 right-0 z-10 mt-2 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <MenuItem v-slot="{ active }" class="divide-gray-100 divide-y">
                  <div :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">
                    {{ user?.given_name }}</div>
                  </MenuItem>
                  <hr class="h-px bg-gray-200 border-0">
                  <MenuItem v-slot="{ active }">
                  <div :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">{{ user?.email
                  }}</div>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                  <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"
                    @click="logoutUser">Log out</a>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </nav>
    </header>
    <nav v-if="isAuthenticated" class="mt-2">
      <div class="max-w-screen-xl px-4 py-3">
        <div class="flex items-center">
          <ul class="flex flex-row font-medium mt-0 space-x-4 text-sm">
            <li>
              <router-link to="/" class="text-base p-2 rounded-md text-gray-900" active-class="bg-primary text-white"
                aria-current="page" :style="isActiveLink('/') ? activeLink : inactiveLink">
                Home
              </router-link>
            </li>
            <li>
              <router-link to="/ViewComponent" class="text-base p-2 rounded-md text-gray-900"
                active-class="bg-primary text-white" :style="isActiveLink('/ViewComponent') ? activeLink : inactiveLink">
                View Expenses
              </router-link>
            </li>
            <li>
              <router-link to="/AddExpense" class="text-base p-2 rounded-md text-gray-900"
                active-class="bg-primary text-white" :style="isActiveLink('/AddExpense') ? activeLink : inactiveLink">
                Add Expense
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- Main content -->
    <main></main>
    <!-- Footer -->
    <router-view />
  </body>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { auth0 } from "./config/config";
import router from "./router";
// Other setup logic
const { loginWithRedirect, isAuthenticated, logout, user } = auth0;


const login = () => {
  loginWithRedirect();
};

const logoutUser = () => {
  logout({ logoutParams: { returnTo: window.location.origin } });
};
const activeLink = {
  backgroundColor: 'primary',
  color: 'white',
};

const inactiveLink = {
  border: '1px solid #6a8a9d',
  color: 'black',
};
const isActiveLink = (to: string) => {
  return computed(() => router.currentRoute.value.path === to).value;
};
</script>

<style scoped>
body,
html {
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 100vh;
}
</style>