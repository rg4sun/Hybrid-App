<template>
  <div class="page-container">
    <h3>Test page</h3>

    <div>
      GPS position: <strong>{{ position }}</strong>
      <router-link to="/">Home</router-link>
    </div>

    <div id="map" ref="{mapContainerRef}"></div>
  </div>
</template>

<script>
import { Geolocation } from "@capacitor/geolocation";
// import { StatusBar } from "@capacitor/geolocation";
import { Toast } from "@capacitor/toast";
import mapboxgl from "../utils/MapboxConfig.js";

export default {
  name: "TestPlugin",
  data() {
    return {
      position: null,
      map: null,
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
    async reqLocationPermisstion() {
      const locPermiStatus = await Geolocation.requestPermissions();
      console.log("Location Permisstion Status obj:", locPermiStatus);

      if (locPermiStatus.location === "granted") {
        // TODO:
        this.showToast("Location has been enabled!");
      } else {
        console.log("Location Permission is not granted!");
        this.showToast("Location Permission is not granted!");
      }
    },
    initMap() {
      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v12",
        center: [-1.4001991, 50.9434623], // Glen Eyre
        // center: [lng, lat], // Glen Eyre
        zoom: 12,
      });
    },
    async printCurrentPosition() {
      const coordinates = await Geolocation.getCurrentPosition();

      console.log("Current position:", coordinates);
      this.position = coordinates;
    },
    drawCircle(map, longitude, latitude, radius = 1) {
      // const radius = 1 // 单位为千米
      const options = {
        steps: 64, // 圆形边缘的分段数
        units: "kilometers",
      };
      const circle = turf.circle([longitude, latitude], radius, options);

      map.addSource("circle", {
        type: "geojson",
        data: circle,
      });

      map.addLayer({
        id: "circle",
        type: "line",
        source: "circle",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#3388FF",
          "line-opacity": 0.8,
          "line-width": 2,
          "line-dasharray": [2, 2], // 值为一个长度为2的数组，其中第一个值表示实线的长度，第二个值表示空白的长度
        },
      });
    },
    drawMapLocate(radius = 1) {
      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v12",
        center: [-1.4001991, 50.9434623], // Glen Eyre
        // center: [lng, lat], // Glen Eyre
        zoom: 12,
      });

      // Add geolocate control to the map.
      const geolocateCtrl = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true,
      });

      map.addControl(geolocateCtrl);

      // map.on("load", () => {
      //   // trgger loate
      //   geolocateCtrl.trigger();

      //   geolocateCtrl.on("geolocate", (position) => {
      //     const { longitude, latitude } = position.coords;

      //     drawCircle(map, longitude, latitude, radius);
      //     map.setZoom(13);
      //   });
      // });
    },
  },
  mounted() {
    // StatusBar.hide();

    this.reqLocationPermisstion();

    // const map = new mapboxgl.Map({
    //   container: "map",
    //   style: "mapbox://styles/mapbox/streets-v12",
    //   center: [-1.4001991, 50.9434623], // Glen Eyre
    //   zoom: 12,
    // });

    this.drawMapLocate(1);
  },
};
</script>

<style lang="scss" scoped>
#map {
  width: 100vw;
  height: 100vh;
}
</style>
