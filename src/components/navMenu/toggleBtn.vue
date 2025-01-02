<template>
  <v-container>
    <v-layout>
      <v-btn color="teal lighten-1" fab dark @click.stop="toggleMenuDrawer">
        <v-icon dark>list</v-icon>
      </v-btn>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "menu-toggle-button",
  props: {
    toggleMenuDrawer: Function,
  },
  data() {
    return {};
  },
};
</script>
