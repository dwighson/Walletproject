import Vue from "vue";
import App from "./App.vue";
import Loyaltycard from "@/components/Loyaltycard";
import Login from "@/components/Login";
import Landing from "@/components/Landing";
import Scanner from "@/components/Scanner";
import VueRouter from "vue-router";
import VueConfetti from "vue-confetti";

Vue.use(VueConfetti);
Vue.use(VueRouter);

Vue.config.productionTip = false;

const routes = [
  { path: "/", component: Landing },
  { path: "/login", component: Login },
  { path: "/scanner", component: Scanner },
  { path: "/loyaltycard", component: Loyaltycard }
]

const router = new VueRouter({
  mode: 'history',
  // mode: "abstract",
  routes // short for `routes: routes`
});

// router.replace('/')

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
