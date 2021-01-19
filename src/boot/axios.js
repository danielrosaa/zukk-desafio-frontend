import Vue from 'vue'
import axios from "axios";

const Axios = axios.create({
  baseURL: "https://strapi-api-danielrosa.herokuapp.com"
});

Vue.prototype.$axios = Axios;

export { Axios }