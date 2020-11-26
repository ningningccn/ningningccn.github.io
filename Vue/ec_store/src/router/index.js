import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: '/', // 輸入沒有的路徑會被帶回首頁
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/coustomer_Product',
    name: 'Coustomer_Product',
    component: () => import('../views/Coustomer_Product.vue'),
    children: [
      {
        path: 'category',
        name: 'Category',
        component: () => import('../views/Category.vue'),
      },
    ],
  },
  {
    path: '/customer_checkout/:orderId',
    name: '/Coustomer_Checkout',
    component: () => import('../views/Coustomer_Checkout.vue'),
  },
  {
    path: '/customer_cart',
    name: '/Customer_Crder',
    component: () => import('../views/Customer_Cart.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/admin',
    name: 'dashboard',
    component: () => import('../views/Admin_Dashboard.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'product',
        name: 'Product',
        component: () => import('../views/Admin_Product.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'orderlist',
        name: 'OrderList',
        component: () => import('../views/Admin_OrderList.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'discount',
        name: 'Discount',
        component: () => import('../views/Admin_Discount.vue'),
        meta: { requiresAuth: true },
      },

    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
