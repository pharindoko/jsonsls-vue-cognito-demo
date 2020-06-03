import axios from "axios";
import auth from "./auth";

export default {
  async getPosts() {
    var jwtToken = auth.auth.getSignInUserSession().getIdToken().jwtToken;
    const USERINFO_URL = "https://serverless.juliaundflo.de/api/dataset";
    var requestData = {
      headers: {
        Authorization: jwtToken,
      },
    };
    const response = await axios.get(USERINFO_URL, requestData);
    return response.data;
  },
};
