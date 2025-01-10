<template>
  <!-- PROFILE MENU VIEW -->
  <div id="nameMenuView">
    <v-ons-list>
      <v-ons-list-header>Game and team name</v-ons-list-header>
      <v-ons-list-item
        modifier="chevron longdivider"
        @click="$emit('handleNameClick')"
        tappable
      >
        <div class="left">Name</div>
        <div class="right">{{ name }}</div>
      </v-ons-list-item>

      <v-ons-list-item
        @click="$emit('handleGameClick')"
        modifier="chevron longdivider"
        tappable
      >
        <div class="left">Game</div>
        <div class="right">{{ game }}</div>
      </v-ons-list-item>

      <v-ons-list-header>Marker color</v-ons-list-header>
      <v-ons-list-item>
        <div class="center">
          <v-ons-select
            style="width: 100%"
            v-model="markerColor"
            @change="changeMarkerColor"
          >
            <option
              :key="index"
              v-for="(color, index) in colorOptions"
              :value="index"
            >
              {{ color.name }}
            </option>
          </v-ons-select>
        </div>
      </v-ons-list-item>
    </v-ons-list>
  </div>
</template>

<script>
import { colors } from "../../../constants/CarColors";

export default {
  name: "menu-profile-view",
  props: {
    name: {
      type: String,
      required: true,
    },
    game: {
      type: String,
      required: true,
    },
    handleNameClick: Function,
    handleGameClick: Function,
  },

  data() {
    return {
      markerColor: 0,
      colorOptions: colors,
    };
  },
  mounted: function () {
    if (!isNaN(localStorage.color)) {
      this.markerColor = localStorage.color;
    }
  },
  methods: {
    changeMarkerColor(event) {
      this.markerColor = event.target.value;
      localStorage.color = this.markerColor;
    },
  },
};
</script>
