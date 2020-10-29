<template>
  <div>
    <loading :active.sync="isLoading"></loading> 
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="opendDiscountModal(true)" >建立新的優惠卷</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width ="150">名稱</th>
          <th width ="100" >折扣百分比</th>
          <th width ="100">到期日</th>
          <th width ="80">是否啟用</th>
          <th width ="80">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in discounts" :key="item.id">
          <td>{{item.title}}</td>
          <td>{{item.percent}}</td>
          <td>{{item.due_date}}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm" @click="opendDiscountModal(false,item)">編輯</button>
              <button class="btn btn-outline-danger btn-sm" @click="openDel_discountModal(item)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

      <!-- 切換頁 -->
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" :class="{'disabled':!pagination.has_pre}">
          <a class="page-link" href="#" aria-label="Previous" @click.prevent="getDiscounts(pagination.current_page -1)">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item" v-for="page in pagination.total_pages" :key="page"
        :class="{'active':pagination.current_page === page}">
          <a class="page-link" href="#" @click.prevent="getDiscounts(page)">{{page}}</a>
        </li>
        <li class="page-item" :class="{'disabled':!pagination.has_next}">
          <a class="page-link" href="#" aria-label="Next" @click.prevent="getDiscounts(pagination.current_page +1)">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
      <!-- Modal -->
      <div class="modal fade" id="DiscountModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增優惠卷 </span>
            </h5>
            <!-- 右上角關閉 -->
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <!-- modal-body -->
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">名稱:</label>
                <input type="text" class="form-control" id="title" v-model="tempDiscounts.title">
              </div>
              <div class="form-group">
                <label for="message-text" class="col-form-label">優惠碼:</label>
                <input class="form-control " id="code" v-model="tempDiscounts.code">
              </div>
              <div class="form-group">
                <label for="message-text" class="col-form-label">到期日:</label>
                <input type="date" class="form-control" id="due_date" v-model="tempDiscounts.due_date">
              </div>
              <div class="form-group">
                <label for="message-text" class="col-form-label">百份比:</label>
                <input class="form-control" id="percent" v-model="tempDiscounts.percent">
              </div>
              <div class="form-group">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="is_enabled"
                    v-model="tempDiscounts.is_enabled"
                    :true-value="1"
                    :false-value="0">
                  <label class="form-check-label" for="is_enabled">
                    是否啟用
                  </label>
                </div>
              </div>
            </form>
          </div> 
          <!-- modal-body -->

          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateCoupons" >確認</button>
          </div>
        </div>
      </div>
    </div>

    <!-- delModal -->
    <div class="modal"  id="openDeldiscountModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">刪除優惠</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>優惠名稱:{{tempDiscounts.title}}</p>
          </div>
          
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="delDiscount">確定刪掉</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import $ from "jquery";

export default {
  data() {
    return {
      discounts:[],
      tempDiscounts:{},
      pagination:{},
      isNew: false,
      isLoading: false,

    } 
  },
  methods: {
    getDiscounts(page=1) {
      const api =`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons?page=${page}`
      const vm =this;
      vm.isLoading =true;
      this.$http.get(api).then((response)=>{
        console.log(response.data);
        vm.isLoading=false;
        vm.discounts = response.data.coupons
        vm.pagination = response.data.pagination;
      });
    },
    opendDiscountModal(isNew, item) {
      if(isNew) {
        this.tempDiscounts={};
        this.isNew=true;
      }else {
        this.tempDiscounts = Object.assign({},item);
        this.isNew = false ;
      }
      $('#DiscountModal').modal('show');
    },
    updateCoupons() {
      let api =`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`;
      let httpMethod = 'post';
      const vm =this;
      vm.isLoading =true;
      if(!this.isNew) {
        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${this.tempDiscounts.id}`;
        httpMethod = 'put' ; 
      }
      console.log(vm.tempDiscounts);
      this.$http[httpMethod](api,{data:vm.tempDiscounts}).then((response)=>{
        console.log(response.data);
        if(response.data.success){
          $('#DiscountModal').modal('hide');
          vm.getDiscounts();
          vm.isLoading =false;
        }else {
          $('#DiscountModal').modal('hide');
          console.log('增新或修改失敗');
          vm.isLoading =false
        }
        
      });
    },
    openDel_discountModal(item) {
      const vm = this;
      vm.tempDiscounts = Object.assign({},item);
      $('#openDeldiscountModal').modal('show');
    },
    delDiscount() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempDiscounts.id}`;
      this.$http.delete(api).then((response)=>{
        if(response.data.success){
          console.log('已經成功刪掉');
          this.getDiscounts();
          $('#openDeldiscountModal').modal('hide');
          vm.tempDiscounts={}; //重置tempDiscounts 內容
        }
      });
    },

  },
  created(){
    this.getDiscounts();
  },
}
</script>