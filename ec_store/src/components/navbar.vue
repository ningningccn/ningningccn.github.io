<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light">
      <!-- <a class="logo" href="#">
        <img src="../assets/logo.png" alt="" />
      </a> -->
      <router-link to="/">
        <img src="../assets/logo.png" alt="" />
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse"
      id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto justify-content-end">
          <li class="nav-item ">
            <!-- <a class="nav-link" href="#">首頁 -->
              <!-- <span class="sr-only">(current)</span> -->
            <!-- </a> -->
            <router-link to="/" class="nav-link"> 首頁</router-link>
          </li>
          <li class="nav-item ">
            <!-- <a class="nav-link" href="#"> 所有商品</a> -->
            <router-link to="/coustomer_Product/category" class="nav-link">所有商品</router-link>
          </li>
          <li class="nav-item">
            <!-- <a class="nav-link" href="#"> 購物車</a> -->
            <router-link to="/customer_cart" class="nav-link">購物車</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"> 關於作者</a>
          </li>
          <li class="nav-item">
            <router-link to="/login" class="nav-link">
              登入
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.logo img{
  width: 100%;
}
</style>
