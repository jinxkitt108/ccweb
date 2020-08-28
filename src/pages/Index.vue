<style lang="scss" scoped>
.hero-panel {
  background: rgb(29, 7, 35);
  background: linear-gradient(
    176deg,
    rgba(28, 7, 35, 1) 27%,
    rgba(60, 1, 80, 1) 57%,
    rgba(55, 6, 85, 1) 100%
  );
}
.hero-title {
  font-size: 80px;
  font-weight: 900;
  margin: 0px !important;
  padding: 0px !important;
}
.hero-subtitle {
  font-size: 50px;
  font-weight: bold;
  margin: 0px !important;
  padding: 0px !important;
}
.hero-greetings {
  font-size: 30px;
  font-style: normal;
  font-variant: normal;
  font-weight: 700;
  line-height: 26.4px;
  margin: 0px !important;
  padding: 0px !important;
}
.bg-index {
  background-color: rgba(55, 6, 85, 1);
}
</style>
<template>
  <q-page class="text-white bg-index">
    <!-- Header Section -->
    <div class="row q-pa-lg hero-panel">
      <div class="col-12 col-md-6 self-center text-center">
        <div class="hero-greetings">Hi, I'm Clint.</div>
        <q-list>
          <q-item>
            <q-item-section>
              <q-item-label class="hero-title">
                <span class="text-indigo-10">W</span>
                <span class="text-orange-10">E</span>
                <span class="text-lime-10">B</span>
              </q-item-label>
              <q-item-label class="hero-subtitle text-white" caption
                >DEVELOPER</q-item-label
              >
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div class="col-12 col-md-6 self-center q-pa-md">
        <q-img
          style="max-width: 400px"
          src="~assets/app_images/developer.png"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-md-4">
        <q-img src="~assets/app_images/about_me.png" />
      </div>
      <div class="col-md-4 self-center">
        <q-card class="my-card bg-transparent" flat>
          <q-card-section>
            <div class="text-h5">About Me</div>
            <p class="text-subtitle1">
              I am a graduate of Bachelor of Science in Information Technology.
              I am a web and software developer, graphic artist, and a
              technology enthusiast. Currently a freelancer who develops
              different applications and computer systems.
            </p>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-md-4 self-center">
        <q-card class="my-card bg-transparent q-px-xl" flat>
          <q-card-section>
            <div class="text-h6 q-mb-md">Email me at</div>
            <q-input
              @click="copyContent(my_email)"
              v-model="my_email"
              id="my_email"
              style="max-width: 300px"
              dark
              dense
              outlined
              readonly
            >
              <template v-slot:append>
                <q-icon name="content_copy" @click="copyContent(my_email)" />
                <q-tooltip>
                  Copy
                </q-tooltip>
              </template>
            </q-input>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Project Section -->
    <div class="row q-px-md bg-deep-grey-11" style="margin-top: 100px">
      <div class="col-sm-12 col-md-8">
        <div class="text-h5 text-center">PROJECTS</div>
        <div class="row flex flex-center q-pa-lg">
          <q-card
            v-for="project in projects"
            :key="project.id"
            class="my-card col-sm-12 col-md-3 bg-transparent"
            dark
            flat
          >
            <q-card-section>
              <div class="text-subtitle1">
                <q-icon name="shop" size="lg" color="deep-purple-2" />
                {{ project.name }}
              </div>
              <div class="text-caption">
                Date Started:
                <span class="q-ml-sm">{{ project.date_started }}</span>
              </div>
              <div class="text-caption q-mb-sm">
                Status:
                <q-chip icon="construction" color="blue" text-color="white" dense>{{project.status}}</q-chip>
              </div>
              <q-btn
                @click="openLink(project.url)"
                text-color="white"
                flat
                no-caps
                >View Website</q-btn
              >
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="col-sm-12 col-md-4 q-pt-lg">
        <q-img
          src="~assets/app_images/svg/shared_goals.svg"
          style="max-width: 300px"
        />
      </div>
    </div>

    <!-- What do I Do? -->
    <div class="what-i-do q-pa-lg" style="margin-top: 150px">
      <div class="q-my-md text-h4 text-center">What I do?</div>
      <div class="row justify-center q-px-sm q-gutter-xl">
        <q-card class="my-card col-sm-12 col-md-3 bg-dark" bordered>
          <q-intersection once transition="scale">
            <q-card-section class="text-center">
              <q-avatar
                size="80px"
                icon="science"
                color="white"
                text-color="green"
                class="shadow-3  q-mb-md"
              />
              <div class="text-h6">
                UX/UI Design
              </div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              <p>
                I am working on cross-platform applications using different
                Javascript frameworks. Using a single code-base I can design an
                application for mobile and desktop devices in any platform IOS,
                Android, Windows or Mac that provides a smooth user experience
                and friendly interface.
              </p>
            </q-card-section>
          </q-intersection>
        </q-card>

        <q-card class="my-card col-sm-12 col-md-3 bg-dark" bordered>
          <q-intersection once transition="scale">
            <q-card-section class="text-center">
              <q-avatar
                size="80px"
                icon="developer_mode"
                color="white"
                text-color="blue"
                class="shadow-3  q-mb-md"
              />
              <div class="text-h6">
                Backend Developer
              </div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              <p>
                As a full-stack developer, I know how to handle API's using
                backend languages. Specifically PHP and Javascript API's.
                Providing an effective structure of an application and a speed
                up performance.
              </p>
            </q-card-section>
          </q-intersection>
        </q-card>

        <q-card class="my-card col-sm-12 col-md-3 bg-dark" bordered>
          <q-intersection once transition="scale">
            <q-card-section class="text-center">
              <q-avatar
                size="80px"
                icon="storage"
                color="white"
                text-color="red"
                class="shadow-3  q-mb-md"
              />
              <div class="text-h6">
                Database Management
              </div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              <p>
                Experience in structured query language for relational database
                like MariaDb. I have also used NoSQL database like Firebase in
                some of my Quasar application. I can also manage SQLite
                databases in applications with database added locally.
              </p>
            </q-card-section>
          </q-intersection>
        </q-card>
      </div>
    </div>

    <div class="row justify-center">
      <q-img
        src="~assets/app_images/svg/product_iteration.svg"
        style="max-width: 300px"
      />
    </div>

    <!-- Contacts Section -->
    <div
      class="contacts-section q-pa-sm text-center bg-dark"
      style="margin-top: 50px"
    >
      <div class="q-pa-md q-gutter-lg">
        <q-img
          @click="openLink(site.url)"
          v-for="site in social"
          :key="site.url"
          :src="'/social_media_icons/svg/' + site.icon"
          width="50px"
        />
      </div>
    </div>

    <!-- Bottom Links -->
    <div class="row bg-grey-10 text-white q-px-xl q-py-md">
      <div class="col-sm-4">
        <h1 class="text-subtitle2">SITES</h1>
        <q-list dense style="max-width: 150px">
          <q-item
            @click="openLink(site.url)"
            clickable
            v-ripple
            v-for="(site, index) in sites"
            :key="index"
          >
            <q-item-section>
              <q-item-label class="text-capitalize">{{
                site.name
              }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>

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

      <div class="col-sm-4">
        <h1 class="text-subtitle2">CREDITS</h1>
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
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      my_email: "clint.stupra@gmail.com",
      sites: [
        { url: "https://github.com/jinxkitt108", name: "github" },
        {
          url: "https://stackoverflow.com/users/11942003/macobex108",
          name: "stack overflow"
        },
        { url: "https://laracasts.com/@jinxkitt", name: "laracast" },
        {
          url: "https://forum.quasar-framework.org/user/jinxkitt108",
          name: "quasar forum"
        }
      ],

      social: [
        {
          url: "https://www.facebook.com/clint.clarido.5/",
          name: "facebook",
          icon: "facebook.svg"
        },
        {
          url: "https://twitter.com/kuyzclint",
          name: "twitter",
          icon: "twitter.svg"
        },
        {
          url: "https://www.instagram.com/kuyzclint/?hl=en",
          name: "instagram",
          icon: "instagram.svg"
        },
        {
          url: "https://www.linkedin.com/in/clint-clarido-891b36103/",
          name: "linkedIn",
          icon: "linkedin.svg"
        }
      ]
    };
  },

  computed: {
    ...mapState("projects", ["projects"])
  },

  methods: {
    copyContent(content) {
      copyToClipboard(content)
        .then(() => {
          this.$q.notify({
            message: "Copied!",
            position: "right",
            icon: "thumb_up"
          });
        })
        .catch(() => {
          // fail
        });
    },

    openLink(url) {
      openURL(url);
    }
  }
};
</script>
