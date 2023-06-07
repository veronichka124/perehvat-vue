<template>
  <div id="poker-map">
    <!-- <GpsErrorModal  v-bind:geolocation_error="geolocation_error"/> -->
    <!-- DISTANCE BOX -->
    <v-ons-page>
      <PointsDistance
        v-bind:position="my_position"
        @handleVisitedPoint="markVisited"
      />
    </v-ons-page>
  </div>
</template>

<script>
import { server_url } from "../../constants/server";
import GpsErrorModal from "../modals/GpsErrorModal";
import PointsDistance from "./PointsDistance";

export default {
  name: "poker-map",
  components: {
    GpsErrorModal,
    PointsDistance
  },
  data() {
    return {
      key: 0,
      name: "Me",
      server_url: server_url,
      my_position: undefined,
      geolocation_error: false
    };
  },

  computed: {
    my_id: function() {
      return localStorage.key_id;
    }
  },
  mounted: function() {
    if (localStorage.key_id) {
      this.key = localStorage.key_id;
    } else {
      localStorage.key_id = this.uuidv4();
      localStorage.password = this.uuidv4();
      this.key = localStorage.key_id;
    }

    if (localStorage.name) {
      this.name = localStorage.name;
    } else {
      localStorage.name = "new poker player";
      this.name = localStorage.name;
    }

    if (!localStorage.visited_points) {
      localStorage.visited_points = JSON.stringify([]);
    }

    //WATCH position
    var id, options;
    options = {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 5000
    };
    id = navigator.geolocation.watchPosition(
      this.geo_update,
      this.geo_error,
      options
    );

    // pre render
    document.dispatchEvent(new Event("render-event"));
  },
  methods: {
    uuidv4: function() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
        c
      ) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    },
    geo_update: function(pos) {
      this.geolocation_error = false;
      this.my_position = pos;
    },
    geo_error: function(err) {
      this.geolocation_error = true;
    },
    markVisited: function(id) {
      const visited_points = JSON.parse(localStorage.visited_points);
      if (visited_points.includes(id)) {
        localStorage.visited_points = JSON.stringify(
          visited_points.filter(el => el != id)
        );
      } else {
        localStorage.visited_points = JSON.stringify([...visited_points, id]);
      }
    }
  }
};
</script>
