<template>
  <div class="">
    <!-- Navigation -->
    <div class="mt-16 py-4">
      <div class="container mx-auto text-center">
        <h1 class="text-3xl font-bold text-black">Welcome to</h1>
        <h1 class="text-4xl mt-4 mb-4 font-bold text-black">Bill-Buddy</h1>
        <h2 class="text-lg font-bold mb-4 text-black">"In Money We Trust, In Split We Prosper!"</h2>
        <router-link to=""
          class="cursor-pointer rounded-[4px] bg-primary px-3 py-[6px] text-center font-semibold text-white">
          Get Started
        </router-link>
      </div>
    </div>
    <div class="flex justify-center mt-4 space-x-4 animate-bounce">
      <img class="image-with-shadow" src="../assets/expense.png" />
      <img class="image-with-shadow" src="../assets/group.png" />
      <img class="image-with-shadow" src="../assets/home.png" />
      <img class="image-with-shadow" src="../assets/trips.png" />
      <img class="image-with-shadow" src="../assets/food.png" />
      <img class="image-with-shadow" src="../assets/cart.png" />
    </div>

    <!-- Content -->
    <div class="container mx-auto py-8 px-4">
      <p class="text-base font-semibold text-gray-700 leading-7">
        A platform where financial harmony and shared prosperity go hand in hand. We believe in trust, fairness, and smart
        money management. Join us in your journey towards a brighter financial future.
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Add shadow to the images with a bounce effect */
.image-with-shadow {
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.5));
}

</style>
