import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//added vue-modal-dialogs component
import * as ModalDialogs from 'vue-modal-dialogs';
Vue.use(ModalDialogs) ;

Vue.config.productionTip = false;

//Added filter for currency display
Vue.filter('currency', function (value) {
    return '$' + parseFloat(value).toFixed(2);
});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
