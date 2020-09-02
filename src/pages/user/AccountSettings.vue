<template>
  <q-page padding>
    <q-card style="width: 900px; max-width: 100vw" class="q-mx-auto" flat>
      <q-card-section>
        <q-form ref="userForm" @submit="saveSettings" class="q-gutter-md">
          <div class="row justify-center">
            <q-avatar color="primary" text-color="white" size="130px">
              <q-img v-if="user_form.photoUrl" :src="user_form.photoUrl" />
              <span v-else>{{ currentUser.name.charAt(0) }}</span>
            </q-avatar>
          </div>
          <div class="text-subtitle2">Account Settings</div>
          <div class="q-mx-auto q-px-sm" style="max-width: 400px">
            <q-input @input="editMode" :rules="[val => !!val || 'Field is required']" v-model="user_form.name" label="Name" outlined dense />
            <q-input ref="email" @input="editMode" :rules="[val => !!val || 'Email is missing', isValidEmail]" v-model="user_form.email" label="Email" :readonly="!email_change" borderless="" dense>
              <!-- <template v-slot:append>
                  <q-btn @click="changingEmail" icon="edit" flat round dense />
              </template> -->
            </q-input>
            <div class="row">
              <q-btn v-if="!currentUser.email_verified" @click="verifyEmail" label="Verify Email" color="indigo" no-caps />
              <span v-if="currentUser.email_verified && currentUser.email == user_form.email" class="text-caption text-green text-italic text-bold"><q-icon name="check" class="q-mr-sm" />Email Verified</span>
            </div>
          </div>
          <div class="text-subtitle2">Choose Avatar</div>
          <div class="row q-gutter-sm">
            <q-btn @click="chooseAvatar(avatar.path)" :class="{'shadow-1' : user_form.photoUrl == avatar.path}" v-for="avatar in avatars" :key="avatar.path" flat dense>
              <q-avatar>
                <q-img :src="avatar.path" />
              </q-avatar>
            </q-btn>
          </div>
          <div class="row justify-end">
            <q-btn type="submit" :disable="!edit_mode" label="Update" color="indigo" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      edit_mode: false,
      email_change: false,
      user_form: new Form({
        id: "",
        email: "",
        name: "",
        photoUrl: null
      }),
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
      ]
    };
  },

  computed: {
    ...mapState("auth", ["currentUser"])
  },

  methods: {
    ...mapActions('auth', ['updateAccount', 'verifyUserEmail']),

    verifyEmail() {
      this.verifyUserEmail()
    },

    changingEmail() {
      this.email_change = true;
      this.$refs.email.focus()
    },

    isValidEmail (val) {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val) || 'Invalid email';
    },
    editMode() {
      this.edit_mode = true;
    },

    populateDetails() {
      this.user_form.fill(this.currentUser);
    },

    saveSettings() {
      this.updateAccount(this.user_form)
    },

    chooseAvatar(url){
      this.edit_mode = true
      this.user_form.photoUrl = url;
    }
  },

  created() {
    this.populateDetails();
  }
};
</script>
