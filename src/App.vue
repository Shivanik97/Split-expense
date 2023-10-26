<template>
  <header class="bg-gradient-to-r from-gray-500 via-purple-100 to-gray-500">
    <nav class="flex px-2 py-2 items-center justify-between ml-2 sticky top-0" aria-label="Global">
      <div class="flex lg:flex-1">
        <a href="/" class="text-lg font-bold leading-6 text-white">Bill-Buddy</a>
        <div v-if="isAuthenticated" class=" items-center">
          <router-link to="/ViewComponent" class="p-4 text-white font-bold transition duration-300">Home</router-link>
          <router-link to="/AddExpense" class="font-bold text-white transition duration-300">Add Expense</router-link>
        </div>
      </div>
      <div class=" lg:flex lg:flex-1 lg:justify-end">
        <div v-if="!isAuthenticated">
          <a href="#" class="text-lg  font-semibold leading-6 text-white" @click="login">LogIn <span
              aria-hidden="true"></span></a>
        </div>
        <div v-else>
          <button id="dropdownInformationButton" data-dropdown-toggle="dropdownInformation"
            class=" mr-3 text-sm rounded-full md:mr-0 focus:ring-2 focus:ring-gray-600 text-white  font-medium py-2.5 px-2.5   text-center flex items-center"
            type="button" @click="toggleDropdown">
            <img :src="user?.picture" class="h-6 rounded-xl" />
          </button>
        </div>
      </div>
    </nav>
  </header>
  <!-- Dropdown menu -->
  <div id="dropdownInformation"
    class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-max  absolute top-16 right-0 mt-2">
    <div class="px-4 py-3 text-sm text-gray-900">
      <div>{{ user?.given_name }}</div>
      <div class="font-medium truncate">{{ user?.email }}</div>
    </div>
    <div class="py-2">
      <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 " @click="logoutUser">LogOut</a>
    </div>
  </div>
  <!-- Main content -->
  <main></main>
  <!-- Footer -->
  <router-view />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { auth0 } from "./config/config";
// Other setup logic
const { loginWithRedirect, isAuthenticated, logout, user } = auth0;
const isDropdownVisible = ref(false);

const toggleDropdown = () => {
  isDropdownVisible.value = !isDropdownVisible.value;
  const dropdownMenu = document.getElementById('dropdownInformation');
  if (dropdownMenu) {
    dropdownMenu.classList.toggle('hidden');
  }
};

const login = () => {
  loginWithRedirect();
};

const logoutUser = () => {
  logout({ logoutParams: { returnTo: window.location.origin } });
};


</script>

<style scoped></style>
