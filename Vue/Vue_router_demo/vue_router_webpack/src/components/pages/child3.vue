<template>
  <div>
    <img src="" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">Card 3</h5>
      <p class="card-text">
        Some quick example text to build on the card title and make up thebulk
        of the card's content.
      </p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  created() {
    
    const vm = this;
    this.$http.get("https://randomuser.me/api/").then((response)=> {
      console.log(response);
      vm.user =response.data.results[0];
    })
  },
};
</script>
