<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <h1>json serverless vue cognito demo</h1>
      </div>

      <v-spacer></v-spacer>
      <v-btn>
        <router-link to="/logout">Logout</router-link>
      </v-btn>
    </v-app-bar>

    <v-content>
      <Home />
    </v-content>
  </v-app>
</template>

<script>
import Home from "./components/Home";

export default {
  name: "App",

  components: {
    Home
  },

  data: () => ({
    //
  })
};
</script>
