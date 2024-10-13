<template>
  <div class="leading-normal tracking-normal" id="main-body">
    <div class="flex flex-wrap">
      <div class="w-full bg-gray-800 pl-0  min-h-screen"  id="main-content">
        <Navbar />
        <div class="p-6 bg-gray-800 mb-20">
          <router-view />
        </div>
        <Footer />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import Navbar from './layout/Navbar.vue';
import Footer from './layout/Footer.vue';

const name = 'Dashboard';


defineComponent({
  name,
  components: {
    Navbar,
    Footer
  }
});
</script>
