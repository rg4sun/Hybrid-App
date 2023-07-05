<template>
  <div class="page-container" v-if="scannerStopped">
    <h3>Test page</h3>

    <div class="location-txt">
      Back
      <router-link to="/">Home</router-link>

      <hr />

      <!-- <q-btn label="Take Photo" @click="takePhoto" /> -->
      <q-btn label="Scan" @click="askUser" />
    </div>
  </div>
</template>

<script>
import { StatusBar } from "@capacitor/status-bar";
import { Toast } from "@capacitor/toast";
import { Camera, CameraResultType } from "@capacitor/camera";
import { Quagga } from "quagga";
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";

export default {
  name: "TestPlugin",
  data() {
    return {
      imgSrc: null,
      scanResult: null,
      scannerStopped: true,
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
    scan_unwork() {
      const qConfig = {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: this.$refs.scannerVideo,
        },
        decoder: {
          readers: ["qrcode_reader"],
        },
      };

      Quagga.init(qConfig, (err) => {
        if (err) {
          console.error("初始化 Quagga 失败：", err);
          return;
        }
        console.log("Quagga 初始化成功");

        Quagga.onDetected(function (result) {
          const code = result.codeResult.code;
          this.result = code;
        });

        Quagga.start();
      });
    },
    async scan() {
      // Check camera permission
      // This is just a simple example, check out the better checks below
      await BarcodeScanner.checkPermission({ force: true });

      // make background of WebView transparent
      // note: if you are using ionic this might not be enough, check below
      BarcodeScanner.hideBackground();

      const result = await BarcodeScanner.startScan(); // start scanning and wait for a result

      // if the result has content
      if (result.hasContent) {
        console.log(result.content); // log the raw scanned content
      }
    },
    async startScan() {
      console.log("In startScan");
      this.scannerStopped = false;
      BarcodeScanner.hideBackground();

      const result = await BarcodeScanner.startScan();
      if (result.hasContent) {
        console.log(result.content);
        this.scannerStopped = true;
      }
    },
    stopScan() {
      BarcodeScanner.showBackground();
      BarcodeScanner.stopScan();
    },
    askUser() {
      BarcodeScanner.prepare();

      const c = confirm("Do you want to scan a barcode?");

      if (c) {
        console.log("Ans: ", c);
        this.startScan();
      } else {
        this.stopScan();
      }
    },
  },
  mounted() {
    StatusBar.hide();
  },
};
</script>

<style lang="scss" scoped></style>
