<template>
  <div class="page-container">
    <div class="location-txt">
      <h3>Test Map</h3>

      GPS position: <strong class="position">{{ position }}</strong>

      <br />
      <router-link to="/">Home</router-link>

      <hr />
    </div>

    <div id="map" ref="{mapContainerRef}"></div>
  </div>
</template>

<script>
import { Geolocation } from "@capacitor/geolocation";
import { StatusBar } from "@capacitor/status-bar";
import { Toast } from "@capacitor/toast";
import mapboxgl from "../utils/MapboxConfig.js";
import * as turf from "@turf/turf";

export default {
  name: "TestMap",
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
        this.printCurrentPosition();
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
      this.position = coordinates.timestamp;
    },
    drawCircle(map, longitude, latitude, radius) {
      // const radius = 1 // km
      const options = {
        steps: 64, // Number of segments for rounded edges
        units: "kilometers",
      };
      const circle = turf.circle([longitude, latitude], radius, options);

      const sourceID = "circle";
      const layerID = "circle-layer";

      // Check if source already exists
      if (map.getSource(sourceID)) {
        map.removeLayer(layerID);
        map.removeSource(sourceID);
      }

      map.addSource(sourceID, {
        type: "geojson",
        data: circle,
      });

      map.addLayer({
        id: layerID,
        type: "line",
        source: sourceID,
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#3388FF",
          "line-opacity": 0.8,
          "line-width": 2,
          "line-dasharray": [2, 2],
        },
      });

      return {
        sourceID: sourceID,
        layerID: layerID,
      };
    },
    drawMapLocate_0(radius = 1) {
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
    drawMapLocate_(radius = 1) {
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

      map.on("load", () => {
        // trgger loate
        geolocateCtrl.trigger();

        // geolocateCtrl.on("geolocate", (position) => {
        //   const { longitude, latitude } = position.coords;

        //   drawCircle(map, longitude, latitude, radius);
        //   map.setZoom(13);
        // });
      });
    },
    drawMapLocate(radius = 1) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lng = position.coords.longitude;
          const lat = position.coords.latitude;
          const map = new mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/mapbox/streets-v12",
            // center: [-1.4001991, 50.9434623], // Glen Eyre
            center: [lng, lat], // Glen Eyre
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

          map.on("load", () => {
            // trgger loate
            geolocateCtrl.trigger();

            geolocateCtrl.on("geolocate", (position) => {
              const { longitude, latitude } = position.coords;

              // this.drawCircle(map, longitude, latitude, radius);
              map.setZoom(13);
            });
          });
        },
        (err) => {
          console.error("Please enable location service! Err: ", err);
        },
        {
          enableHighAccuracy: true,
        }
      );
    },
  },
  mounted() {
    StatusBar.hide();

    // this.reqLocationPermisstion();

    this.drawMapLocate_(1);
  },
};
</script>

<style lang="scss" scoped>
#map {
  width: 100vw;
  height: 100vh;
}

.position {
  font-size: 10px;
}

.location-txt {
  position: absolute;
  top: 60px;
  left: 30px;
  z-index: 99;
  background-color: salmon;
  line-height: 50px;
  font-size: 20px;
}
</style>
