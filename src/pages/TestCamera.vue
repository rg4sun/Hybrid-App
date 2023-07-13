<template>
  <div class="page-container">
    <h3>Test Camera</h3>

    <div class="location-txt">
      <router-link to="/">Home</router-link>

      <hr />

      <q-btn label="Take Photo" @click="takePhoto" />

      <div style="text-align: center; margin-top: 20px">
        <img :src="imgSrc" :width="3 * 100" :height="4 * 100" />
      </div>
    </div>
  </div>
</template>

<script>
import { StatusBar } from "@capacitor/status-bar";
import { Toast } from "@capacitor/toast";
import { Camera, CameraResultType } from "@capacitor/camera";

export default {
  name: "TestCamera",
  data() {
    return {
      imgSrc: null,
    };
  },
  methods: {
    async showToast(msg) {
      await Toast.show({
        text: msg,
        duration: "long",
        position: "center",
      });
    },
    async takePhoto() {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        // resultType: CameraResultType.Uri,
        resultType: CameraResultType.DataUrl,
      });

      // this.imgSrc = image.webPath;
      this.imgSrc = image.dataUrl;
      console.log("Image:", image);
    },
  },
  mounted() {
    StatusBar.hide();
  },
};
</script>

<style lang="scss" scoped></style>
