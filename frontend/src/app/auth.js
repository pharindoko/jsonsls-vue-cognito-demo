/* eslint-disable */
import { CognitoAuth, StorageHelper } from "amazon-cognito-auth-js";
import IndexRouter from "../router/index";
import UserInfoApi from "./user-info-api";
import jsonslsApi from "./jsonsls-api";
import store from "../store/store";

const CLIENT_ID = process.env.VUE_APP_COGNITO_CLIENT_ID;
const APP_DOMAIN = process.env.VUE_APP_COGNITO_APP_DOMAIN;
const REDIRECT_URI = process.env.VUE_APP_COGNITO_REDIRECT_URI;
const USERPOOL_ID = process.env.VUE_APP_COGNITO_USERPOOL_ID;
const REDIRECT_URI_SIGNOUT = process.env.VUE_APP_COGNITO_REDIRECT_URI_SIGNOUT;
const APP_URL = process.env.VUE_APP_APP_URL;

var authData = {
  ClientId: CLIENT_ID, // Your client id here
  AppWebDomain: APP_DOMAIN,
  TokenScopesArray: ["openid", "email"],
  RedirectUriSignIn: REDIRECT_URI,
  RedirectUriSignOut: REDIRECT_URI_SIGNOUT,
  UserPoolId: USERPOOL_ID,
};

var auth = new CognitoAuth(authData);
auth.userhandler = {
  onSuccess: async function(result) {
    console.log("On Success result", result);
    store.commit("setLoggedIn", true);
    store.commit("setPostInfo", await jsonslsApi.getPosts());
    UserInfoApi.getUserInfo().then((response) => {
      IndexRouter.push("/");
    });
  },
  onFailure: function(err) {
    store.commit("setLoggedOut");
    IndexRouter.go({
      path: "/error",
      query: { message: "Login failed due to " + err },
    });
  },
};

function getUserInfoStorageKey() {
  var keyPrefix = "CognitoIdentityServiceProvider." + auth.getClientId();
  var tokenUserName = auth.signInUserSession.getAccessToken().getUsername();
  var userInfoKey = keyPrefix + "." + tokenUserName + ".userInfo";
  return userInfoKey;
}

var storageHelper = new StorageHelper();
var storage = storageHelper.getStorage();
export default {
  auth: auth,
  login() {
    auth.getSession();
  },
  logout() {
    if (auth.isUserSignedIn()) {
      var userInfoKey = this.getUserInfoStorageKey();
      auth.signOut();
      storage.removeItem(userInfoKey);
    }
  },
  getUserInfoStorageKey,
};
