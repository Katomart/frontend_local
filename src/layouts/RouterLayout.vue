<template>
    <div>
      <navbar />
      <router-view/>
    </div>
  </template>
  
  <script>
  import Navbar from '@/components/nav/NavBar.vue';
  
  export default {
    components: {
      Navbar
    }
  }
  </script>
  