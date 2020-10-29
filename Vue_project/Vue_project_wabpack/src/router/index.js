import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/components/pages/Login";
import Dashboard from "@/components/Dashboard"
import Products from "@/components/pages/Products"
import Orderlist from "@/components/pages/Orderlist"
import Discount from "@/components/pages/Discount"
import CustomerOrder from "@/components/pages/CustomerOrder"
import CustomerCheckout from "@/components/pages/CustomerCheckout"


Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path:"*",
      redirect: 'login'
    },
    {
      path:'/login',
      name:'Login',
      component:Login,
    },
    {
      path:'/admin',
      name:'dashboard',
      component:Dashboard,
      children:[
        {
          path:'products',
          name:'Products',
          component:Products,
          meta: { requiresAuth : true},
        },
        {
          path:'orderlist',
          name:'Orderlist',
          component:Orderlist,
          meta: { requiresAuth : true},
        },
        {
          path:'discount',
          name:'Discount',
          component:Discount,
          meta: { requiresAuth : true},
        },
      ]
    },
    {
      path:'/',
      name:'dashboard',
      component:Dashboard,
      children:[
        {
          path:'customer_order',
          name:'CustomerOrder',
          component:CustomerOrder,
        },
        {
          path:'customer_checkout/:orderId',
          name:'CustomerCheckout',
          component:CustomerCheckout,
        },
      ]
    }

  ]
});
