<template>
  <div>
    <Navbar/>
    <Alert/>
    <main role="main" class="container p-4 border mt-5 shadow" >
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Navbar from '@/views/Admin_Navbar.vue';
import Alert from '@/components/AlertMessage.vue';

export default {
  components: {
    Navbar,
    Alert,
  },
};
</script>
