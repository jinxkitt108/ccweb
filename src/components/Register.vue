<template>
  <q-dialog
    ref="dialogRegister"
    @hide="resetAll"
    :value="value"
    @input="$emit('input')"
  >
    <q-card class="q-pa-md" style="width: 580px">
      <!-- <div class="text-center q-my-md">
        <q-img src="~assets/app_images/logo.png" width="80px" />
      </div> -->
      <q-card-section>
        <q-stepper
          v-model="step"
          ref="stepper"
          color="primary"
          vertical
          animated
        >
          <q-step
            :name="1"
            title="Credentials"
            icon="admin_panel_settings"
            :done="done1"
          >
            <q-form @submit="register" class="q-gutter-md">
              <q-input
                v-model="register_form.email"
                :rules="[val => !!val || 'Email is required']"
                label="Email"
                rounded
                outlined
                dense
              />
              <q-input
                v-model="register_form.password"
                label="Password"
                :rules="[val => !!val || 'Password is required']"
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
              <div v-if="error" class="text-center text-caption text-red-5">
                {{ error.message }}
              </div>
              <q-stepper-navigation>
                <q-btn :loading="loading" type="submit" color="primary" label="Sign up" />
              </q-stepper-navigation>
            </q-form>
          </q-step>
          <q-step
            :name="2"
            title="Name and Avatar"
            icon="account_circle"
            :done="done2"
          >
            <q-form @submit="saveUser">
              <q-input
                v-model="user_form.name"
                :rules="[val => !!val || 'Name is required']"
                placeholder="Name"
                rounded
                outlined
                dense
              />
              <div class="q-my-sm">Choose Avatar</div>
              <div class="row q-gutter-sm">
                <q-btn @click="chooseAvatar(avatar.path)" :class="{'shadow-1' : user_form.photoUrl == avatar.path}" v-for="avatar in avatars" :key="avatar.path" flat dense>
                  <q-avatar>
                    <q-img :src="avatar.path" />
                  </q-avatar>
                </q-btn>
              </div>
              <q-stepper-navigation>
                <q-btn :loading="loading" type="submit" color="primary" label="Save" />
              </q-stepper-navigation>
            </q-form>
          </q-step>
        </q-stepper>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapState } from "vuex";
import { auth, db } from "boot/firebase";
export default {
  props: ["value"],
  data() {
    return {
      avatars: [
        { name: "burglar", path: "avatars/001-burglar.svg" },
        { name: "hacker", path: "avatars/002-hacker.svg" },
        { name: "japanese", path: "avatars/003-japanese.svg" },
        { name: "artisan", path: "avatars/004-artisan.svg" },
        { name: "arabian", path: "avatars/005-arabian.svg" },
        { name: "man", path: "avatars/006-man.svg" },
        { name: "man-1", path: "avatars/007-man-1.svg" },
        { name: "boy", path: "avatars/008-boy.svg" },
        { name: "man-2", path: "avatars/009-man-2.svg" },
        { name: "american", path: "avatars/010-american.svg" },
        { name: "woman", path: "avatars/011-woman.svg" },
        { name: "punk", path: "avatars/012-punk.svg" },
        { name: "peruvian", path: "avatars/013-peruvian.svg" },
        { name: "lady", path: "avatars/014-lady.svg" },
        { name: "teacher", path: "avatars/015-teacher.svg" },
        { name: "yoga", path: "avatars/016-yoga-pose.svg" },
        { name: "spy", path: "avatars/017-spy.svg" },
        { name: "hacker-1", path: "avatars/018-hacker-1.svg" },
        { name: "designer", path: "avatars/019-designer.svg" },
        { name: "manager", path: "avatars/020-manager.svg" },
        { name: "call-center", path: "avatars/021-call-center-agent.svg" },
        { name: "profile", path: "avatars/022-profile.svg" }
      ],
      error: null,
      step: 1,
      done1: false,
      done2: false,
      loading: false,
      isPwd: true,
      register_form: new Form({
        email: "",
        password: ""
      }),
      user_form: new Form({
        user_id: "",
        name: "",
        photoUrl: "avatars/001-burglar.svg"
      })
    };
  },

  computed: {
      ...mapState('auth', ['currentUser'])
  },

  methods: {
  async saveUser() {
      try {
        this.loading = true
        const userRef = db.collection('users').doc(this.currentUser.id)
        const res = await userRef.update({
          name: this.user_form.name,
          photoUrl: this.user_form.photoUrl,
        })
        this.loading = false
        this.closeDialog()
      } catch(e) {
        console.log(e)
      }
    },

    chooseAvatar(url){
      this.user_form.photoUrl = url;
    },

    resetAll() {
      this.register_form.reset();
      this.user_form.reset();
      this.step = 1;
      this.done1 = false;
      this.done2 = false;
    },

  async register() {
      try {
        this.loading = true;
        const res = await auth.createUserWithEmailAndPassword(this.register_form.email, this.register_form.password)
         this.loading = false;
         this.step = 2;
         this.done1 = true;
      } catch(e) {
        this.loading = false;
        this.error = e
      }
  },

    closeDialog() {
      this.$refs.dialogRegister.hide();
      this.resetAll();
    }
  }
};
</script>
