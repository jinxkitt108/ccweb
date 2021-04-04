<template>
  <q-page class="bg_head">
    <div class="row q-pa-lg home-banner" style="background-image: url(app_images/Page-Turner.svg); background-size: cover; background-repeat: no-repeat; height: 500px">
      <div class="col-sm-12 col-md-6 column items-center q-pa-lg">
        <div>
          <q-img
            class="wobble-hor-bottom"
            width="160px"
            src="app_icons/logo.png"
          />
        </div>
        <div class="text-h5 q-mt-md text-white text-center" style="max-width: 400px">
          Shaping your digital world, businesses and lifestyle in an innovative
          way.
        </div>
        <q-btn
          to="/about-developer"
          label="The Developer"
          class="q-mt-lg"
          size="md"
          no-caps
          rounded
          icon-right="arrow_forward"
          color="indigo"
        />
      </div>
      <div class="col-sm-12 col-md-6 q-mt-xl self-center">
        <q-img style="min-width: 300px" src="app_images/undraw_mobile_prototyping_grmd.svg" />
      </div>
    </div>

    <div class="row q-pa-lg bg-grey-1 justify-center" style="margin-top: 150px">
      <q-img
        src="app_images/undraw_programming_2svr.svg"
        style="max-width: 500px; min-width: 300px"
      />
    </div>

    <div class="text-h4 text-center" style="margin-top: 100px">
      You may want
    </div>

    <!-- Contents List -->
    <div class="row q-gutter-xl q-pa-lg justify-center">
      <q-card
        v-for="(content, index) in contents"
        :key="index"
        class="my-card col-sm-12 col-md-3"
        style="width: 250px"
      >
        <q-card-section>
          <div class="text-body1 text-center">
            <q-img :src="content.icon" width="80px" class="q-mr-sm" />
            <q-item>
              <q-item-section>
                <q-item-label class="text-bold q-mb-sm">{{
                  content.name
                }}</q-item-label>
                <q-item-label
                  v-for="(item, i) in content.category"
                  :key="i"
                  class="text-subtitle1"
                  >{{ item }}</q-item-label
                >
              </q-item-section>
            </q-item>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div class="row q-pa-lg" style="margin-top: 100px">
      <div class="col-sm-12 col-md-6 text-center">
        <q-img width="300px" src="app_images/undraw_personal_text_vkd8.svg" />
      </div>
      <div class="col-sm-12 col-md-4 q-mt-lg">
        <div class="text-h5 q-mb-sm">Want to know more?</div>
        <q-card class="my-card q-pa-sm">
          <q-card-section>
            <div class="text-subtitle1">
              Make a living with an Internet home business. Know more about affordable Internet business ideas you can use to start working online.
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div
      class="q-pa-md bg-grey-9 text-white message-area"
      style="margin-top: 120px; margin-bottom: 100px"
    >
      <div class="text-h6 text-center q-pa-md">Send a Message</div>
      <q-form @submit="sendMessage" class="q-mx-auto" style="max-width: 600px">
        <div class="column q-gutter-md">
          <div class="col">
            <q-input
              v-model="message_form.name"
              dark
              class="full-width"
              label="Name"
              outlined
            />
          </div>
          <div class="col">
            <q-input v-model="message_form.email" dark label="Email" outlined />
          </div>
          <div class="col">
            <q-input
              v-model="message_form.body"
              dark
              type="textarea"
              outlined
              placeholder="Write Message.."
            />
          </div>
        </div>
        <div class="q-py-md">
          <q-btn
            type="submit"
            label="Submit"
            color="indigo"
            class="full-width"
          />
        </div>
      </q-form>
    </div>

    <div class="row bg-grey-10 text-white q-px-xl q-py-md">
      <div class="col-sm-4">
        <h1 class="text-subtitle2">PROGRAMMING</h1>
        <div class="row q-gutter-xl">
          <div class="text-caption">
            <li style="list-style: none">PHP</li>
            <li style="list-style: none">Javascript</li>
            <li style="list-style: none">MySQL</li>
            <li style="list-style: none">HTML</li>
            <li style="list-style: none">CSS</li>
          </div>
          <div class="text-caption">
            <li style="list-style: none">Laravel</li>
            <li style="list-style: none">Firebase</li>
            <li style="list-style: none">Vuejs</li>
            <li style="list-style: none">Quasar</li>
            <li style="list-style: none">Vuetifyjs</li>
          </div>
        </div>
      </div>

      <div class="col-sm-12 col-md-4">
        <h1 class="text-subtitle2">CONTENT</h1>
        <div class="text-caption">
          Icons made by
          <a
            href="https://www.flaticon.com/authors/pixel-perfect"
            title="Pixel perfect"
            class="text-white"
            >Pixel perfect</a
          >
          from
          <a
            href="https://www.flaticon.com/"
            title="Flaticon"
            class="text-white"
          >
            www.flaticon.com</a
          >
        </div>
        <div class="text-caption">
          <a
            href="/privacy-policy"
            class="text-white"
            style="text-decoration: none"
            >Privacy Policy</a
          >
        </div>
      </div>
    </div>
    <div class="bg-grey-10 text-white q-px-xl q-pt-md">
      <div class="text-caption">This website contains any form of ads.</div>
      <div>©Copyright ccwebgroup</div>
    </div>
  </q-page>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      message_form: new Form({
        name: "",
        email: "",
        body: ""
      }),
      contents: [
        {
          name: "BLOGS",
          category: ["Education", "Bussiness", "Technology", "Lifestyle"],
          icon: "app_icons/svg/009-light-bulb.svg"
        },
        {
          name: "COURSES",
          category: ["Programming", "Multimedia", "Networking"],
          icon: "app_icons/svg/005-screen.svg"
        },
        {
          name: "JOBS",
          category: ["Freelancing", "Marketing", "Graphic Arts"],
          icon: "app_icons/svg/007-browser-3.svg"
        }
      ]
    };
  },

  methods: {
    ...mapActions("messages", ["addNewMessage"]),

    sendMessage() {
      this.addNewMessage(this.message_form);
      this.message_form.reset();
    }
  }
};
</script>

<style lang="scss" scoped>
.home-banner {
    padding-bottom: 2rem;
    // background-image: linear-gradient(131deg,#8a047f 1%,#4a044d 67%);
}

ul {
  list-style: none;
}

.roll-in-top {
  -webkit-animation: roll-in-top 0.6s ease-out both;
  animation: roll-in-top 0.6s ease-out both;
}
@-webkit-keyframes roll-in-top {
  0% {
    -webkit-transform: translateY(-800px) rotate(-540deg);
    transform: translateY(-800px) rotate(-540deg);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0) rotate(0deg);
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
}

@keyframes roll-in-top {
  0% {
    -webkit-transform: translateY(-800px) rotate(-540deg);
    transform: translateY(-800px) rotate(-540deg);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0) rotate(0deg);
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
}

.wobble-hor-bottom {
  -webkit-animation: wobble-hor-bottom 2s infinite both;
  animation: wobble-hor-bottom 2s infinite both;
}
/* ----------------------------------------------
 * Generated by Animista on 2020-9-11 23:21:21
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info.
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation wobble-hor-bottom
 * ----------------------------------------
 */
@-webkit-keyframes wobble-hor-bottom {
  0%,
  100% {
    -webkit-transform: translateX(0%);
    transform: translateX(0%);
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
  }
  15% {
    -webkit-transform: translateX(-30px) rotate(-6deg);
    transform: translateX(-30px) rotate(-6deg);
  }
  30% {
    -webkit-transform: translateX(15px) rotate(6deg);
    transform: translateX(15px) rotate(6deg);
  }
  45% {
    -webkit-transform: translateX(-15px) rotate(-3.6deg);
    transform: translateX(-15px) rotate(-3.6deg);
  }
  60% {
    -webkit-transform: translateX(9px) rotate(2.4deg);
    transform: translateX(9px) rotate(2.4deg);
  }
  75% {
    -webkit-transform: translateX(-6px) rotate(-1.2deg);
    transform: translateX(-6px) rotate(-1.2deg);
  }
}
@keyframes wobble-hor-bottom {
  0%,
  100% {
    -webkit-transform: translateX(0%);
    transform: translateX(0%);
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
  }
  15% {
    -webkit-transform: translateX(-30px) rotate(-6deg);
    transform: translateX(-30px) rotate(-6deg);
  }
  30% {
    -webkit-transform: translateX(15px) rotate(6deg);
    transform: translateX(15px) rotate(6deg);
  }
  45% {
    -webkit-transform: translateX(-15px) rotate(-3.6deg);
    transform: translateX(-15px) rotate(-3.6deg);
  }
  60% {
    -webkit-transform: translateX(9px) rotate(2.4deg);
    transform: translateX(9px) rotate(2.4deg);
  }
  75% {
    -webkit-transform: translateX(-6px) rotate(-1.2deg);
    transform: translateX(-6px) rotate(-1.2deg);
  }
}

// .bg_head {
//   background: rgb(255, 255, 255);
//   background: linear-gradient(
//     95deg,
//     rgba(255, 255, 255, 1) 0%,
//     rgba(255, 255, 255, 0.6026785714285714) 23%,
//     rgba(147, 62, 212, 0.308) 100%
//   );
// }
</style>
