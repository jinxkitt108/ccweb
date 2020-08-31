<template>
  <!-- Log in dialog -->
  <q-dialog ref="dialog" :value="value" @input="$emit('input')">
    <q-card class="q-pa-md" style="width: 400px">
      <div class="text-center q-my-md">
        <q-img src="~assets/app_images/logo.png" width="80px" />
      </div>
      <q-card-section>
        <q-form @submit="signIn('standard')" class="q-gutter-md">
          <q-input
            v-model="login_form.email"
            label="Email"
            rounded
            outlined
            dense
          />
          <q-input
            v-model="login_form.password"
            label="Password"
            :type="isPwd ? 'password' : 'text'"
            rounded
            outlined
            dense
          >
            <template v-slot:append>
              <q-icon
                @click="isPwd = !isPwd"
                :name="isPwd ? 'visibility' : 'visibility_off'"
              />
            </template>
          </q-input>
          <div class="q-px-sm">
            <q-btn
              :loading="loading"
              type="submit"
              label="Log in"
              class="full-width"
              color="indigo"
              rounded
            />
          </div>
          <div v-if="error" class="text-center text-caption text-red-5">
            {{ error.message }}
          </div>
        </q-form>
      </q-card-section>
      <q-card-section class="row q-gutter-none">
        <div class="col-4"><hr /></div>
        <div class="col-4 text-center">OR</div>
        <div class="col-4"><hr /></div>
      </q-card-section>
      <q-card-section class="q-gutter-sm">
        <q-btn
          @click="signIn('facebook')"
          class="full-width"
          no-caps
          color="blue-8"
        >
          <q-avatar size="42px" class="q-mr-sm">
            <img src="/social_media_icons/svg/facebook.svg" />
          </q-avatar>
          Sign In with Facebook
        </q-btn>
        <q-btn
          @click="signIn('google')"
          class="full-width"
          no-caps
          color="red-5"
        >
          <q-avatar size="42px" class="q-mr-sm">
            <img src="/social_media_icons/svg/google-plus.svg" />
          </q-avatar>
          Sign In with Google
        </q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  props: ["value"],
  data() {
    return {
      isPwd: true,
      loading: false,
      login_form: new Form({
        method: "",
        email: "",
        password: ""
      })
    };
  },

  computed: {
    ...mapState("auth", ["error"])
  },

  methods: {
    ...mapActions("auth", ["loginUser"]),
    signIn(method) {
      // this.loading = true;
      this.login_form.method = method;
      this.loginUser(this.login_form).then(res => {
        if (!this.error) {
          this.closeDialog();
        } else {
          this.loading = false;
        }
      });
    },
    closeDialog() {
      this.loading = false;
      this.$refs.dialog.hide();
      this.login_form.reset();
    }
  }
};
</script>
