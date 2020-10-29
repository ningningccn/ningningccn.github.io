<template>
  <div>
    <loading :active.sync="isLoading"></loading> 
    <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="#">Company name</a>
      <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-toggle="collapse" data-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search">
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" href="#" @click.prevent="signout">Sign out</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
    data() {
      return {
        isLoading: false,
      }
    },
    methods: {
    signout() {
      const api = `${process.env.APIPATH}/logout`;
      const vm =this;
      vm.isLoading = true;
      this.$http.post(api).then((response)=>{
        console.log(response.data);
        console.log("已成功登出了了了了了了了了了");
        if (response.data.success){
          vm.isLoading = false;
          vm.$router.push('/login')
        }
      });
    }
  }
}
</script>