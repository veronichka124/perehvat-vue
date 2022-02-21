<template>
  <div id="app">
    <div v-if="isMapVisible"><main-map /></div>
  </div>
</template>

<script>
import { server_url } from "./constants/server";
export default {
  name: "app",
  data() {
    return {
      isMapVisible: true,
      server_url: server_url
    };
  },
  mounted: function() {
    this.getMapSettings();
  },
  methods: {
    getMapSettings: function() {
      this.axios
        .get(this.server_url + "settings.php")
        .then(res => {
          const { map_visible } = res.data;
          this.isMapVisible = !!map_visible;
        })
        .catch(err => console.log(err));
    }
  }
};
</script>
