<template>
  <div>
      <!-- <div class="col-md-4 mb-4"> -->
    <div class="card border-0 shadow-sm "
      >
      <div style="height: 150px; background-size: cover; background-position: center"
      :style="{backgroundImage: `url(${item.imageUrl})`}">
      </div>
      <!-- 內容 -->
      <div class="card-body">
        <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
        <h5 class="card-title">
          <a href="#" class="text-dark">{{item.title}}</a>
        </h5>
        <p class="card-text">{{item.content}}</p>
        <div>
          <div class="h5" v-if="!item.origin_price"> {{item.price}} 元</div>
          <del class="h6" v-if="item.price && item.origin_price">原價 {{ item.origin_price }} 元</del>
          <div class="h5" v-if="item.price && item.origin_price">現在只要 {{ item.price }} 元</div>
        </div>
      </div>
      <div class="card-footer d-flex">
        <button type="button" class="btn btn-outline-secondary btn-sm"
        @click.prevent="getOnceProduct(item.id)">
          <i class="fas fa-spinner fa-spin"></i>
          查看更多
        </button>
        <button type="button" class="btn btn-outline-danger btn-sm ml-auto"
          @click="addCart(item.id)">
          <i class="fas fa-spinner fa-spin"></i>
          加到購物車
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item'],
  methods: {
    getOnceProduct(id) {
      // onceid = Products.vue 中的 @event
      // @onceid 在 Products.vue 指向 getProducts
      this.$emit('onceid', id);
      console.log(id);
    },
    addCart(id, qty = 1) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      // const vm = this;
      const cart = {
        product_id: id,
        qty,
      };
      this.$http.post(api, { data: cart }).then((response) => {
        // vm.status.loadingItem = '';
        console.log(response.data);
      });
    },
  },
};
</script>
