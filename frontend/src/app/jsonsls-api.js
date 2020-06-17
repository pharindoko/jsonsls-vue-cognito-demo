import axios from "axios";
import auth from "./auth";

export default {
  async getPosts() {
    var jwtToken = auth.auth.getSignInUserSession().getIdToken().jwtToken;
    const USERINFO_URL = process.env.VUE_APP_JSONSLS_ENDPOINT + "/api/dataset";
    var requestData = {
      headers: {
        Authorization: jwtToken,
      },
    };
    const response = await axios.get(USERINFO_URL, requestData);
    return response.data;
  },
};
