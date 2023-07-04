<template>
  <router-view />
</template>

<script>
import { defineComponent } from "vue";
import { SplashScreen } from "@capacitor/splash-screen";

export default defineComponent({
  name: "App",
  beforeCreate() {
    (async () => {
      await SplashScreen.show({
        autoHide: false,
      });
    })();
  },
  created() {
    // SplashScreen.hide();
  },
  mounted() {
    (async () => {
      await SplashScreen.hide();
    })();
  },
});
</script>
