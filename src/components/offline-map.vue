<template>
  <div name="offline-map" id="offline">
    <div class="overlay" />
    <img class="map_screenshot" :src="mapImage" alt="map" />
    <div class="dialog">
      <h6>В данный момент игра не происходит</h6>
    </div>
  </div>
</template>

<script>
import mapImage from "../assets/map.png";

export default {
  name: "offline-map",
  data() {
    return {
      mapImage,
    };
  },
};
</script>
