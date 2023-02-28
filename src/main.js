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
import "./style.css";

Vue.use(VueGeolocation);
Vue.use(VueOnsen); 
Vue.use(Vuetify);
Vue.use(VueAxios, axios);
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDNT2Wv0k6wG9_KdMmfsnfiqeFo6DKb8M4",
    libraries: "geometry" // This is required if you use the Autocomplete plugin
  }
});
Vue.component("modal", modal);
Vue.component("button-counter", ButtonCounter);
Vue.component("timer", timer);
Vue.component("main-map", MainMap);

new Vue({
  el: "#app",
  render: h => h(App)
});
