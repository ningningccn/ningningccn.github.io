<template>
  <div>
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
        <div class="card border-0 shadow-sm">
          <div style="height: 150px; background-size: cover; background-position: center"
            :style="{ backgroundImage: `url(${item.imageUrl})`}">
          </div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{ item.title }}</a>
            </h5>
            <p class="card-text">{{ item.content }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>
              <del class="h6" v-if="item.price">原價 {{ item.origin_price }} 元</del>
              <div class="h5" v-if="item.price">現在只要 {{ item.price }} 元</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button type="button" class="btn btn-outline-secondary btn-sm" @click.prevent="getOnceProduct(item.id)">
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
              查看更多
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click.prevent="addtoCart(item.id)">
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>

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
            
              <!-- <i class="fas fa-spinner fa-spin" v-if="OnceProduct.id === status.loadingItem"></i> -->
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 購物車 -->
    <table class="table mt-4">
      <thead>
        <tr>
          <td width='80'></td>
          <td>品名</td>
          <td width="200">數量</td>
          <td width="200">單價</td>
        </tr>
      </thead>
      <tbody v-for="item in cartProduct.carts" :key="item.id">
        <tr>
          <td>
            <button class="btn btn-outline-danger" @click.prevent="delCartProduct(item.id)">
              <i class="fas fa-trash-alt"></i>
            </button>
          </td>
          <td>{{item.product.title}}
            <div class="text-success" v-if="item.coupon">已使用優惠卷</div>
          </td>
          <td>{{item.qty}}</td>
          <td class="text-right">{{item.total}}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td width='80'></td>
          <td></td>
          <td width="200">總計</td>
          <td width="200" class="text-right">{{cartProduct.total}}</td>
        </tr>
        <tr v-if="cartProduct.final_total !== cartProduct.total">
          <td width='80'></td>
          <td></td>
          <td width="200">折扣價</td>
          <td width="200" class="text-right text-success">{{cartProduct.final_total}}</td>
        </tr>
      </tfoot>
    </table>
    <div class="input-group mb-3 input-group-sm">
      <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
      <div class="input-group-append">
        <button class="btn btn-outline-secondary" type="button" @click.prevent="addCouponCode">
          套用優惠碼
        </button>
      </div>
    </div>
    <!-- 訂單 -->
    <div class="my-5 row justify-content-center">
      <form class="col-md-6" @submit.prevent="createOrder">
        <div class="form-group">
          <label for="useremail">Email</label>
          <input type="email" class="form-control" name="email" id="useremail"
            v-validate ="'required|email'"
            v-model="form.user.email" placeholder="請輸入 Email" 
            :class="{'is-invalid':errors.has('email')}">
            <!-- required -->
          <span class="text-danger" v-if="errors.has('email')">
            {{ errors.first('email') }}
          </span>
        </div>
      
        <div class="form-group">
          <label for="username">收件人姓名</label>
          <input type="text" class="form-control" name="name" id="username"
            v-model="form.user.name" v-validate="'required'" placeholder="輸入姓名" 
            :class="{'is-invalid':errors.has('name')}">
          <span class="text-danger" v-if="errors.has('name')">姓名必須輸入</span>
        </div>
      
        <div class="form-group">
          <label for="usertel">收件人電話</label>
          <input type="tel" class="form-control" id="usertel" v-model="form.user.tel" placeholder="請輸入電話">
        </div>
      
        <div class="form-group">
          <label for="useraddress">收件人地址</label>
          <input type="text" class="form-control" name="address" id="useraddress" v-model="form.user.address" placeholder="請輸入地址"
            :class="{'is-invalid':errors.has('address')}">
          <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
        </div>
      
        <div class="form-group">
          <label for="comment">留言</label>
          <textarea name="" id="comment" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
        </div>
        <div class="text-right">
          <button class="btn btn-danger">送出訂單</button>
        </div>
      </form>
    </div>
    <!-- 訂單結束 -->
  </div>
</template>

<script>
import $ from "jquery";

export default {
  data() {
    return {
      products:[],
      tempproducts:{},
      OnceProduct:[],
      cartProduct:[],
      status :{
        loadingItem: '',
      },
      coupon_code:'',
      form: {
        user: {
          name: '',
          email:'',
          tel:'',
          address:'',
        },
        message:'',
      }
    }
  },
  methods: {
    getCustomerProduct() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`
      const vm =this ;
      this.$http.get(api).then((response)=>{
        vm.products = response.data.products;
      });
    },
    getOnceProduct(id) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`
      const vm =this ;
      vm.status.loadingItem = id;
      console.log('AAAAAAA')
      this.$http.get(api).then((response)=>{
        vm.OnceProduct = response.data.product;
        console.log(vm.OnceProduct);
        $('#productModal').modal('show');
        vm.status.loadingItem = '';
      });
    },
    addtoCart(id , qty =1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`
      const vm =this ;
      // vm.status.loadingItem = id;
      const cart= {
        product_id: id,
        qty,
      }
      this.$http.post(api,{ data:cart }).then((response)=>{
        vm.getCart();
        // $('#productModal').modal('show');
        // vm.status.loadingItem = '';
      });
    },
    getCart() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`
      const vm = this;
      this.$http.get(api).then((response)=>{
        console.log(response.data.data);
        vm.cartProduct = response.data.data;
      });
    },
    delCartProduct(id) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`
      const vm = this;
      this.$http.delete(api).then((response)=>{
        console.log(response);
        vm.getCart();
      });
    },
    addCouponCode() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`
      const vm = this;
      const coupon = {
        code: vm.coupon_code
      }
      this.$http.post(api ,{ data:coupon }).then((response)=>{
        console.log(response);
        vm.getCart();
      });
    },
    createOrder() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`
      const vm = this;
      const order = vm.form;

      this.$validator.validate().then((result)=>{
        if(result) {
          this.$http.post(api ,{ data:order }).then((response)=>{
          console.log('訂單已建立',response);
            if(response.data.success) {
              vm.$router.push(`/customer_checkout/${response.data.orderId}`)
            }
          });
        }else {
          console.log('欄位不完整');
        }
      });

    }
  },
  created() {
    this.getCustomerProduct();
    this.getCart();
  }

}
</script>