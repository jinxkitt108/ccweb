<template>
  <q-page padding>
    <div class="row q-gutter-md">
      <!-- Projects Card -->
      <q-card bordered class="my-card" style="width: 200px">
        <q-card-section>
          <q-list dense>
            <q-item>
              <q-item-section avatar>
                <q-icon color="indigo" size="50px" name="shop" />
              </q-item-section>
              <q-item-section class="text-bold text-h5">
                {{projects.length}}
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section class="text-h6">
                Projects
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("projects", ["projects"])
  }
};
</script>
