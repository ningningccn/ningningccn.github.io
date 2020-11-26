<template>
  <div class="cart">
    <table class="table mt-4">
      <thead>
        <tr>
          <td width='80'></td>
          <td>商品名稱</td>
          <td width="200">數量</td>
          <td width="200">單價</td>
        </tr>
      </thead>
      <tbody v-for="item in cartProductSD.carts " :key="item.id">
        <tr>
          <td> <!--刪除按鈕-->
            <button class="btn btn-outline-danger"
            @click.prevent="delCartItem(item.id)">
              <i class="fas fa-trash-alt"></i>
            </button>
          </td>
          <td> <!--商品名稱-->
            {{item.product.title}}
            <div class="text-success" v-if="item.coupon">已套用優惠卷</div>
          </td>
          <td> <!--數量-->
            {{item.qty}} {{item.product.unit}}
          </td>
          <td class="text-right">
            {{item.product.price}}
            <div class="text-success" v-if="item.final_total !== item.total" >
              {{item.final_total}}
            </div>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td width='80'></td>
          <td></td>
          <td width="200">總計</td>
          <td width="200" class="text-right"> {{cartProductSD.total}}</td>
        </tr>
        <tr v-if=" cartProductSD.total !== cartProductSD.final_total">
          <td width='80'></td>
          <td></td>
          <td width="200">折扣價</td>
          <td width="200" class="text-right text-success">{{cartProductSD.final_total}}</td>
        </tr>
      </tfoot>
    </table>
    <div class="input-group mb-3 input-group-sm">
      <input type="text" class="form-control"
        v-model="coupon_code"
        placeholder="請輸入優惠碼">
      <div class="input-group-append">
        <button class="btn btn-outline-secondary" type="button"
          @click.prevent="addCouponCode" >
          套用優惠碼
        </button>
      </div>
    </div>
    <!-- <table class="table mt-4">
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
    </div> -->
  </div>
</template>
<script>
export default {
  props: ['cartProductSD'],
  data() {
    return {
      coupon_code: '',
    };
  },
  methods: {
    delCartItem(id) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      this.$http.delete(api).then((response) => {
        if (response.data.success) {
          console.log(response.data.message);
          this.$emit('reflash');
        } else {
          console.log(response.data.message);
        }
      });
    },
    addCouponCode() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      const vm = this;
      const coupon = {
        code: vm.coupon_code,
      };
      this.$http.post(api, { data: coupon }).then((response) => {
        if (response.data.success) {
          console.log(response.data.message);
          this.$emit('reflash');
        } else {
          console.log(response.data.message);
        }
      });
    },
  },
};

</script>
