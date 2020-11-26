<template>
  <div class="category">
    <a href="">
      <div class="category-item border d-flex justify-content-center my-1 p-2">
        <img src="../assets/icon/gift.png" alt="">
        <span class ="align-self-center">所有商品</span>
      </div>
    </a>    <a href="">
      <div class="category-item border d-flex justify-content-center my-1 p-2">
        <img src="../assets/icon/clothes.png" alt="">
        <span class ="align-self-center">衣服</span>
      </div>
    </a>
    <a href="">
      <div class="category-item border d-flex justify-content-center my-1 p-2">
        <img src="../assets/icon/pants.png" alt="" width="64" height="64">
        <span class ="align-self-center">褲子</span>
      </div>
    </a>
        <a href="">
      <div class="category-item border d-flex justify-content-center my-1 p-2">
        <img src="../assets/icon/shoes.png" alt="">
        <span class ="align-self-center">鞋子</span>
      </div>
    </a>
    <a href="">
      <div class="category-item border d-flex justify-content-center my-1 p-2">
        <img src="../assets/icon/cap.png" alt="">
        <span class ="align-self-center">帽子</span>
      </div>
    </a>
  </div>
</template>
<style scoped>
.category{
  width: 100%;
  display: flex;
  columns: col;
  flex-wrap: wrap;
}
a {
  width: 100%;
}
.category-item {
  display: flex;
  justify-content: center;
}
.category-item span{
  align-self: center;
  font-size: 20px;
}
</style>
