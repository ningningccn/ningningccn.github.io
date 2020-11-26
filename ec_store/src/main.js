import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
// 載入loading 效果
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';

import VeeValidate from 'vee-validate';
import VueI18n from 'vue-i18n';
import zhTW from '../node_modules/vee-validate/dist/locale/zh_TW';

// Vue本身
import App from './App.vue';
import router from './router';
import './bus';
import currencyFilter from './filters/currency';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(VueI18n);

// Loading全域宣告
Vue.component('Loading', Loading);

Vue.filter('currency', currencyFilter);
axios.defaults.withCredentials = true;

const i18n = new VueI18n({
  locale: 'zhTW',
});
Vue.use(VeeValidate, {
  // 點擊後 驗證 馬上彈出
  events: 'input|blur',
  i18n,
  dictionary: {
    zhTW,
  },
});

router.beforeEach((to, from, next) => {
  console.log('to', to, 'from', from, 'next', next);
  if (to.meta.requiresAuth) {
    console.log('這裡需要驗證');
    const api = `${process.env.VUE_APP_API}/api/user/check`;
    axios.post(api).then((response) => {
      console.log(response.data);
      if (response.data.success) {
        next();
      } else {
        next({
          path: '/login',
        });
      }
    });
  } else {
    next();
  }
});
/* eslint-disable no-new */
new Vue({
  router,
  // store,
  render: (h) => h(App),
}).$mount('#app');
