<template>
  <!-- USERS MENU VIEW -->
  <div id="usersMenuView">
    <v-ons-list-header>
      Game users ({{ Object.keys(users).length }})
    </v-ons-list-header>

    <v-ons-list :class="{ notAdmin: !am_i_admin }">
      <v-ons-list-item
        v-for="(marker, index) in users"
        :key="index"
        v-bind:class="{
          isPrey: marker.is_prey == 1,
          notActive: isNotActive(marker),
        }"
        tappable
        modifier="chevron longdivider"
        @click="userSettings(marker)"
      >
        <div class="listItemContent">
          {{ marker.user_name }} (id: {{ marker.id.substr(0, 4) }})
          <span
            v-if="!marker.is_prey"
            v-bind:class="{
              userActivityInfo: true,
              notActive: isNotActive(marker),
              speed: !isNotActive(marker),
            }"
            >{{ showSpeed(marker.id) }}</span
          >
        </div>
      </v-ons-list-item>
    </v-ons-list>

    <div v-if="am_i_admin">
      <v-ons-list-header>
        Unconfirmed users in this game ({{ blocked_users_count }})
      </v-ons-list-header>
      <v-ons-list>
        <v-ons-list-item
          tappable
          modifier="chevron"
          @click="mainMenu('Blocked users')"
        >
          <div class="left">Unconfirmed users</div>
        </v-ons-list-item>
      </v-ons-list>
    </div>
  </div>
</template>

<script>
import { helpers } from "../../../mixins/helpers";
export default {
  name: "menu-users-view",
  mixins: [helpers],
  props: {
    users: {
      type: Object | Array,
      required: true,
    },
    markers: {
      type: Object | Array,
      required: true,
    },
    am_i_admin: {
      type: Boolean,
      required: true,
    },
    blocked_users_count: {
      type: Number,
      required: true,
    },
    mainMenu: Function,
    userSettings: Function,
  },
  methods: {
    getUserMarker(user_id) {
      const key = Object.keys(this.markers).find(
        (key) => this.markers[key].id === user_id
      );
      return this.markers[key];
    },
    showSpeed(user_id) {
      const user = this.getUserMarker(user_id);
      if (user) {
        if (user.last_activity > 6) {
          const markerAge = this.parseMarkerAge(user.last_activity);
          return `${markerAge} ago`;
        }

        const speed = Number(user.speed).toFixed(0);
        return `${speed} km/h`;
      }
      return "";
    },
    isNotActive(user) {
      const userLastActivity = this.getUserMarker(user.id)?.last_activity;
      return userLastActivity > 6 && !user.is_prey;
    },
  },
};
</script>

<style scoped>
.isPrey {
  background-color: #f89c96;
}
.userActivityInfo {
  padding-left: 4px;
}
.notActive {
  color: #9d9d9d;
}
.speed {
  color: #940075;
}
.listItemContent {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-right: 30px;
}
.notAdmin > .list-item--chevron:before {
  display: none;
}

.notAdmin .listItemContent {
  padding-right: 15px;
}
</style>
