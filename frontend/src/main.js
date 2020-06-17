import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import vuetify from "./plugins/vuetify";
import "@babel/polyfill";

Vue.config.productionTip = false;
new Vue({
  render: (h) => h(App),
  vuetify,
  store,
  router,
}).$mount("#app");
