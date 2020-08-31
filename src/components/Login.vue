<template>
  <div>
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
          <div
            @click="openRegister"
            class="text-caption text-indigo-9 q-mt-md text-bold cursor-pointer"
          >
            Create an account?
          </div>
        </q-card-section>
        <div class="row">
          <div class="col-4"><hr /></div>
          <div class="col-4 text-center">OR</div>
          <div class="col-4"><hr /></div>
        </div>
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

    <Register v-model="register_dialog" />
  </div>
</template>

<script>
import { auth, facebookProvider, googleProvider } from "boot/firebase";
export default {
  props: ["value"],
  data() {
    return {
      error: null,
      register_dialog: false,
      isPwd: true,
      loading: false,
      login_form: new Form({
        email: "",
        password: ""
      })
    };
  },

  methods: {
    async signIn(method) {
      try {
        this.loading = true;
        if (method == "facebook") {
          const res = await auth.signInWithPopup(facebookProvider);
        } else if (method == "google") {
          const res = await auth.signInWithPopup(googleProvider);
        } else if (method == "standard") {
          const res = await auth.signInWithEmailAndPassword(
            this.login_form.email,
            this.login_form.password
          );
        }
        this.closeDialog();
      } catch (e) {
        this.loading = false;
        this.error = e;
      }
    },

    openRegister() {
      this.closeDialog();
      this.register_dialog = true;
    },

    closeDialog() {
      this.loading = false;
      this.$refs.dialog.hide();
      this.login_form.reset();
    }
  }
};
</script>
