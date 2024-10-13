<template>
  <div class="w-full px-8 py-6 flex justify-end">
    <div class="flex items-center">
      <span class="mr-2 ml-2 text-sm font-semibold text-gray-200">Copyright PUT Rocketlab © {{ date }}</span>
      <img class="h-7 max-w-xs filter" src="../../assets/svg/Logo_Rocketlab.svg" alt="">
    </div>
  </div>
</template>

<script setup lang="ts">
const date = new Date().getFullYear();
</script>