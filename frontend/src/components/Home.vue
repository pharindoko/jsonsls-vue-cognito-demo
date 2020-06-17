<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h3>Welcome,</h3>
        <div>this demo should provide you an example on how to use jsonsls in an frontend/backend app.</div>

        <h4>userinfo:</h4>
        <div class="alert alert-info" style="white-space: normal;">{{$store.getters.cognitoInfo}}</div>
        <h4>idtoken:</h4>
        <div class="alert alert-info" style="white-space: normal;">{{$store.getters.tokenInfo}}</div>
      </div>
    </div>

    <v-card color="green darken-4" dark>
      <v-card-title class="headline green darken-3">Search for American movies</v-card-title>
      <v-card-text>
        <v-autocomplete
          v-model="model"
          :items="$store.getters.postInfo"
          color="white"
          hide-no-data
          hide-selected
          item-text="title"
          item-value="title"
          label="Public Dataset"
          placeholder="Start typing to Search"
          prepend-icon="mdi-database-search"
          return-object
        ></v-autocomplete>
      </v-card-text>
      <v-divider></v-divider>
      <v-expand-transition></v-expand-transition>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-list color="green darken-4">
          <v-list-item v-for="(value, propertyName, index) in model" v-bind:key="index">
            <v-list-item-content>
              <v-list-item-title style="white-space: normal;">{{propertyName}}</v-list-item-title>
              <v-list-item-subtitle style="white-space: normal;">{{value}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-btn :disabled="!model" color="grey darken-4" @click="model = null">
          Clear
          <v-icon right>mdi-close-circle</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "Home",
  data: function() {
    return {
      model: ""
    };
  }
});
</script>

<style>
</style>
