<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { isEmpty } from "./common/utils.js";
import jwt_decode from "jwt-decode";
export default {
  name: "App",
  methods: {
    saveInfo() {
      let token = localStorage.getItem("userToken");
      if (token) {
        let decoded = jwt_decode(token);
        this.$store.dispatch("setIsAutnenticated", !isEmpty(decoded));
        this.$store.dispatch("setUser", decoded);
      }
    }
  },
  created() {
    // this.saveInfo();
  }
};
</script>

<style>
@import "./assets/css/base.css";
</style>
