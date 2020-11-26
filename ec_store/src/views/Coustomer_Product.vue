<template>
  <div>
    <Navbar/>
    <Banner/>
    <div class="container py-5">
      <div class="context d-flex">
        <div class="col-12 col-lg-3">
          <Allcategory></Allcategory>
        </div>
        <div class="col-12 col-lg-9">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import Navbar from '@/components/navbar.vue';
import Banner from '@/components/banner.vue';
import Allcategory from '@/components/All_category.vue';

export default {
  components: {
    Navbar,
    Banner,
    Allcategory,
  },

};
</script>
