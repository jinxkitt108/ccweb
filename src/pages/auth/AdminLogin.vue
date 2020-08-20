<template>
  <q-page class="column q-mx-auto q-mt-md" style="width: 250px">
    <div class="q-mx-auto q-my-lg">
      <q-img src="~assets/app_images/logo.png" width="150px" />
    </div>
    <q-form @submit="login" text>
      <q-input
        v-model="formData.email"
        class="q-mb-md"
        label="Username"
        dense
        rounded
        outlined
        dark
      />
      <q-input
        v-model="formData.password"
        label="Password"
        dense
        rounded
        outlined
        dark
        :type="is_show ? 'text' : 'password'"
      >
        <template v-slot:append>
          <q-icon
            :name="is_show ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="is_show = !is_show"
          />
        </template>
      </q-input>
      <div class="row q-my-md q-pa-sm">
        <q-btn type="submit" label="Log In" class="full-width" color="indigo" />
      </div>
      <div class="text-red-4 text-caption text-center text-bold">
        {{ error.message }}
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      is_show: false,
      formData: {
        email: "",
        password: ""
      }
    };
  },

  computed: {
    ...mapState("auth", ["error"])
  },

  methods: {
    ...mapActions("auth", ["loginUser", "registerUser"]),
    login() {
      this.loginUser(this.formData);
    },
    register() {
      this.registerUser(this.formData);
    }
  }

  /*   created() {
    this.register();
  } */
};
</script>

<style lang="scss" scoped></style>
