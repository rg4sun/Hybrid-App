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
      setTimeout(() => {
        SplashScreen.hide().then(() => {
          console.log("persist launching for 3s...");
        });
      }, 3000);
    })();
  },
});
</script>
