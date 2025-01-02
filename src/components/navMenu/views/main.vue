<template>
  <div>
    <v-ons-list>
      <v-ons-list-item tappable>
        <div class="left">
          <v-ons-icon
            v-if="am_i_admin"
            icon="fa-crown"
            class="list-item__icon icon-admin"
          ></v-ons-icon>
          <v-ons-icon
            v-else
            icon="fa-car"
            class="list-item__icon icon-width"
          ></v-ons-icon>
        </div>
        <div class="center" @click="mainMenu('Profile')">
          <span class="list-item__title">{{ name }}</span>
          <span v-if="am_i_prey" class="list-item__subtitle">Угонщик</span>
          <span v-else class="list-item__subtitle">Охотник</span>
        </div>
      </v-ons-list-item>
    </v-ons-list>

    <div id="mainMenuView">
      <v-ons-list v-if="am_i_admin">
        <v-ons-list-item
          @click="mainMenu(item.title)"
          v-for="(item, index) in admin_menu"
          :key="index"
          modifier="longdivider"
          tappable
        >
          <div class="left">
            <v-ons-icon
              :icon="item.icon"
              class="list-item__icon icon-width"
            ></v-ons-icon>
          </div>
          <div class="center">
            {{ item.title }}
          </div>
        </v-ons-list-item>
      </v-ons-list>
      <v-ons-list v-else>
        <v-ons-list-item
          @click="mainMenu(item.title)"
          v-for="(item, index) in user_menu"
          :key="index"
          modifier="longdivider"
          tappable
        >
          <div class="left">
            <v-ons-icon
              :icon="item.icon"
              class="list-item__icon icon-width"
            ></v-ons-icon>
          </div>
          <div class="center">
            {{ item.title }}
          </div>
        </v-ons-list-item>
      </v-ons-list>
    </div>
  </div>
</template>

<script>
export default {
  name: "menu-main-view",
  props: {
    am_i_admin: {
      type: Boolean,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    am_i_prey: {
      type: Boolean,
      required: true,
    },
    mainMenu: {
      type: Function,
      required: true,
    },
  },

  data() {
    return {
      admin_menu: [
        { title: "Profile", icon: "user" },
        { title: "Users", icon: "users" },
        { title: "Game settings", icon: "cog" },
      ],
      user_menu: [
        { title: "Profile", icon: "user" },
        { title: "Users", icon: "users" },
      ],
    };
  },
};
</script>
