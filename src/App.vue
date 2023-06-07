<template>
  <div id="app">
    <div v-if="isMapVisible"><Routes /></div>
    <div v-else><offline-map /></div>
  </div>
</template>

<script>
import { server_url } from "./constants/server";
import Routes from "./Routes";

export default {
  name: "app",
  components: {
    Routes,
  },
  data() {
    return {
      isMapVisible: false,
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
          this.isMapVisible = !!Number(map_visible);
        })
        .catch(err => console.log(err));
    }
  }
};
</script>
