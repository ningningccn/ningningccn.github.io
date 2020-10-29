<template>
  <div class="hello my-3" >
    <ul class="nav">
      <li class="nav-item">
        <router-link class="nav-link" to="/page/">卡片1</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/page/child2">卡片2</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/page/child3">卡片3</router-link>
      </li>
      <li class="nav-item">
        <a href="#" class="nav-link" @click.prevent="updatePath">切換到指定頁面</a>
      </li>
      <li class="nav-item">
        <a href="#" class="nav-link" @click.prevent="beforePath">切換上一頁</a>
      </li>

    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
    };
  },
  methods: {
    updatePath() {
      this.$router.push('/page/child2');
    },
    beforePath () {
      this.$router.back();
    },
  }
};
</script>
