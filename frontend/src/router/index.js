/* eslint-disable */
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/components/Home";
import auth from "../app/auth";
import LogoutSuccess from "@/components/LogoutSuccess";
import UserInfoApi from "../app/user-info-api";
import ErrorComponent from "@/components/Error";
import jsonslsApi from "../app/jsonsls-api";
import store from "../store/store";

Vue.use(VueRouter);

async function requireAuth(to, from, next) {
  if (!auth.auth.isUserSignedIn()) {
    store.commit("setLoggedIn", false);
    next({
      path: "/login",
      query: { redirect: to.fullPath },
    });
  } else {
    UserInfoApi.getUserInfo().then((response) => {
      store.commit("setLoggedIn", true);
      store.commit("setCognitoInfo", response);
      store.commit("setTokenInfo", UserInfoApi.getToken());

      next();
    });
    store.commit("setPostInfo", await jsonslsApi.getPosts());
  }
}

export default new VueRouter({
  mode: "history",
  base: "/",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      beforeEnter: requireAuth,
    },
    {
      path: "/login",
      beforeEnter(to, from, next) {
        auth.auth.getSession();
      },
    },
    {
      path: "/login/oauth2/code/cognito",
      beforeEnter(to, from, next) {
        var currUrl = window.location.href;

        console.log(`Frank: ${currUrl}`);
        auth.auth.parseCognitoWebResponse(currUrl);
        //next();
      },
    },
    {
      path: "/logout",
      component: LogoutSuccess,
      beforeEnter(to, from, next) {
        auth.logout();
        next();
      },
    },
    {
      path: "/error",
      component: ErrorComponent,
    },
  ],
});
