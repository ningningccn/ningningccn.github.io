<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div class="container">
    </div>
    <Navbar/>
    <Banner/>
    <Category/>

  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
import Navbar from '@/components/navbar.vue';
import Banner from '@/components/banner.vue';
import Category from '@/components/category.vue';

export default {
  name: 'Home',
  components: {
    Navbar,
    Banner,
    Category,
  },
  created() {
    console.log(process.env.VUE_APP_API);
  },
};
</script>
