<template>
  <div>
    <!-- <loading :active.sync="isLoading"></loading>  -->
    <table class="table mt-4">
      <thead>
        <tr>
          <th width ="80">購買時間</th>
          <th width ="120" >Email</th>
          <th width ="150">購買款項</th>
          <th width ="50">應付金額</th>
          <th width ="50">是否付款</th>
        </tr>
      </thead>

      <tbody v-for="item in orderlist" :key="item.id">
        <tr>
          <td>{{item.create_at}}</td>
          <td>{{item.user.email}}</td>
          <td>
            <ul class="list-unstyled">
              <li v-for="product in item.products" :key="product.id">
                {{product.product.title}} : {{product.product.num}}
              </li>
            </ul>
          </td>
          <td class="text-right"> {{item.total}}</td>
          <td>
            <span v-if="item.is_paid" class="text-success" >已付款</span>
            <span v-else class="text-danger">尚未付款</span>
            <!-- <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span> -->
          </td>
        </tr>

      </tbody>
    </table>
  
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderlist : {}
    }
  },
  methods: {
    getOrderList(page =1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/orders?page=${page}`
      const vm =this ;
      this.$http.get(api).then((response)=> {
        console.log(response)
        vm.orderlist = response.data.orders;
      });
    }
  },
  created() {
    this.getOrderList();

  }
}
</script>