<template>
  <q-page class="flex flex-center">
    <!-- <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    /> -->
    <div>
      <router-link to="/map">Location/map Test</router-link> |
      <router-link to="/camera">Camera Test</router-link> |
      <router-link to="/scanner">Scanner Test</router-link>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
});
</script>
