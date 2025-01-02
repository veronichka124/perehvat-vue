<template>
  <!-- USERS MENU VIEW -->
  <div id="usersMenuView">
    <v-ons-list-header>
      Game users ({{ Object.keys(users).length }})
    </v-ons-list-header>

    <v-ons-list v-for="(marker, index) in users" :key="index">
      <v-ons-list-item
        v-bind:class="{ red_list_item: marker.is_prey == 1 }"
        tappable
        modifier="chevron longdivider"
        @click="userSettings(marker)"
      >
        <div class="left">
          {{ marker.user_name }} (id: {{ marker.id.substr(0, 4) }})
          <span style="padding-left: 4px; color: #940075">{{
            showSpeed(marker.id)
          }}</span>
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
export default {
  name: "menu-users-view",
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
    showSpeed(user_id) {
      const userKey = Object.keys(this.markers).find(
        (key) => this.markers[key].id === user_id
      );
      if (userKey) {
        const user = this.markers[userKey];
        const speed = Number(user.speed).toFixed(0);
        return `${speed} km/h`;
      }
      return "";
    },
  },
};
</script>
