import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";
// Webpack CSS import
import "onsenui/css/onsenui.css";
import "onsenui/css/onsen-css-components.css";
// JS import
import VueOnsen from "vue-onsenui"; // This imports 'onsenui', so no need to import it separately
import VueGeolocation from "vue-browser-geolocation";
import axios from "axios";
import VueAxios from "vue-axios";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

import App from "./App.vue";
import modal from "./components/modal-template.vue";
import ButtonCounter from "./components/button-counter.vue";
import timer from "./components/timer.vue";
import MainMap from "./components/map.vue";
import OfflineMap from "./components/offline-map.vue";

import "./style.css";

Vue.use(VueGeolocation);
Vue.use(VueOnsen); // VueOnsen set here as plugin to VUE. Done automatically if a call to window.Vue exists in the startup code.
Vue.use(Vuetify);
Vue.use(VueAxios, axios);
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDNT2Wv0k6wG9_KdMmfsnfiqeFo6DKb8M4",
    libraries: "geometry" // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    //// If you want to set the version, you can do so:
    // v: '3.26',
  }

  //// If you intend to programmatically custom event listener code
  //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  //// you might need to turn this on.
  // autobindAllEvents: false,

  //// If you want to manually install components, e.g.
  //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  //// Vue.component('GmapMarker', GmapMarker)
  //// then disable the following:
  // installComponents: true,
});
Vue.component("modal", modal);
Vue.component("button-counter", ButtonCounter);
Vue.component("timer", timer);
Vue.component("main-map", MainMap);
Vue.component("offline-map", OfflineMap);

new Vue({
  el: "#app",
  render: h => h(App)
});
