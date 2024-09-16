<template>
  <div id="app">
    <main-map v-if="isMapVisible" />
    <offline-map v-else />
  </div>
</template>

<script>
import { MapSettingsMixin } from "./mixins/MapSettingsMixin";

export default {
  name: "app",
  mixins: [MapSettingsMixin],
  data() {
    return {
      isMapVisible: false,
    };
  },
  created() {
    this.getMapSettings();
  },
};
</script>
