export default ({ Vue }) => {
    const token = localStorage.getItem("user-token");
    if (token) {
      Vue.prototype.$axios.defaults.headers.common["Authorization"] = token;
    }
};
