<template>
  <div id="app">
    <div v-if="isMapVisible"><main-map /></div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      isMapVisible: true
    };
  },
  methods: {
    getMapSettings: function() {
      this.axios.get(this.server_url + "settings.php").then(res => {
        this.isMapVisible = res.data;
      });
    }
  }
};
</script>
