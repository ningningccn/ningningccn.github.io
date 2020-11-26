<template>
  <div>
    <h2>
      所有商品：
    </h2>
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="item in products" :key="item.id" >
        <div class="card border-0 shadow-sm "
          >
          <div style="height: 150px; background-size: cover; background-position: center"
          :style="{backgroundImage: `url(${item.imageUrl})`}">
          </div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{item.title}}</a>
            </h5>
            <p class="card-text">{{item.content}}</p>
            <!-- <div class="d-flex justify-content-between align-items-baseline"> -->
            <div>
              <div class="h5" v-if="!item.origin_price"> {{item.price}} 元</div>
              <del class="h6"
                v-if="item.price && item.origin_price">原價 {{ item.origin_price }} 元</del>
              <div class="h5"
                v-if="item.price && item.origin_price">現在只要 {{ item.price }} 元</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button type="button" class="btn btn-outline-secondary btn-sm"
              :disabled="item.is_enabled === 0"
              @click.prevent="getOnceProduct(item.id)">
              <i class="fas fa-spinner fa-spin"
                v-if="status.loadingItem === item.id">
              </i>
              查看更多
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto"
            :disabled="item.is_enabled === 0"
              @click.prevent="addToCart(item.id)">
              <i class="fas fa-spinner fa-spin"
                  v-if="status.loadingItem === item.id">
              </i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 指定Prouduct Modal -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ OnceProduct.title }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="OnceProduct.imageUrl" class="img-fluid" alt="">
            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{ OnceProduct.content }}</p>
              <footer class="blockquote-footer text-right">{{ OnceProduct.description }}</footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h4" v-if="!OnceProduct.price">{{ OnceProduct.origin_price }} 元</div>
              <del class="h6" v-if="OnceProduct.price">原價 {{ OnceProduct.origin_price }} 元</del>
              <div class="h4" v-if="OnceProduct.price">現在只要 {{ OnceProduct.price }} 元</div>
            </div>
            <select name="" class="form-control mt-3" v-model="OnceProduct.num">
              <option :value="num" v-for="num in 10" :key="num">
                選購 {{num}} {{OnceProduct.unit}}
              </option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計 <strong>{{ OnceProduct.num * OnceProduct.price }}</strong> 元
            </div>
            <button type="button" class="btn btn-primary"
              @click="addtoCart(OnceProduct.id, OnceProduct.num)">
              <!-- <i class="fas fa-spinner fa-spin" v-if="OnceProduct.id
              === status.loadingItem"></i> -->
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="row" >
        <Card :item="item" v-for="item in products" :key="item.id"
        class="col-md-4 mb-4"
        @onceid="getOnceProduct"></Card>
    </div> -->

    <Pagination :pagination="pagination" @event="getProduct"></Pagination>
  </div>
</template>

<script>
import $ from 'jquery';
import Pagination from '@/components/pagination.vue';
// import Card from '@/components/card.vue';

export default {
  data() {
    return {
      products: [],
      OnceProduct: {},
      pagination: {},
      status: {
        loadingItem: '',
      },
    };
  },
  components: {
    Pagination,
    // Card,
  },
  methods: {
    getProduct(page = 1) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`;
      const vm = this;
      this.$http.get(api).then((response) => {
        console.log(response.data);
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;
      });
    },
    getOnceProduct(id) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
      const vm = this;
      // vm.status.loadingItem = id;
      this.$http.get(api).then((response) => {
        if (response.data.success) {
          vm.OnceProduct = response.data.product;
          vm.OnceProduct.num = 1;
          $('#productModal').modal('show');
        } else {
          console.log(response.data.message);
        }
        // response.data.product.num = 1;
        // vm.OnceProduct.num = 1;
        // console.log(vm.OnceProduct);
      });
    },
    addToCart(id, qty = 1) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      // const vm = this;
      const cart = {
        product_id: id,
        qty,
      };
      this.$http.post(api, { data: cart }).then((response) => {
        // vm.status.loadingItem = '';
        if (response.data.success) {
          console.log(response.data.message);
        }
      });
    },
  },
  created() {
    this.getProduct();
  },
};
</script>
