<template>
  <div id="app">
    <router-view></router-view>
    
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  created() {
    // const api = 'https://vue-course-api.hexschool.io/api/ningningccn/products'
    // const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`;
    // // console.log(api)
    // this.$http.get(api).then((response) => {
    //   console.log(response.data) 
    // });
  },
  components: {
    HelloWorld
  }
}
</script>

<style lang="scss">
@import "./assets/all"; 
// @import "~bootstrap/scss/bootstrap";
 //導入
</style>
