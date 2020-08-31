import Login from "components/Login.vue";
import Register from "components/Register.vue";

// leave the export, even if you don't use it
export default async ({ Vue }) => {
  Vue.component("Login", Login);
  Vue.component("Register", Register);
};
