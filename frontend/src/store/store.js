import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    cognitoInfo: {},
    loggedIn: false,
    loadingState: true,
    errorLoadingState: false,
    postInfo: [],
    tokenInfo: "",
  },
  mutations: {
    setLoggedIn(state, newValue) {
      state.loggedIn = newValue;
    },
    setLoggedOut(state) {
      state.loggedIn = false;
      state.cognitoInfo = {};
      state.postInfo = [];
      state.tokenInfo = "";
    },
    setCognitoInfo(state, newValue) {
      state.cognitoInfo = newValue;
    },
    setTokenInfo(state, newValue) {
      state.tokenInfo = newValue;
    },
    setPostInfo(state, newValue) {
      state.postInfo = newValue;
    },
  },
  getters: {
    loggedIn: (state) => state.loggedIn,
    cognitoInfo: (state) => state.cognitoInfo,
    postInfo: (state) => state.postInfo,
    tokenInfo: (state) => state.tokenInfo,
  },
});
export default store;
