<template>
  <modal
    id="startScreen"
    v-if="showStartScreen && !geolocation_error"
    @close="$emit('handleClose')"
  >
    <h3 slot="header">Welcome!</h3>
    <div slot="body" class="text-xs-center">
      <!-- on click showCreateGameScreen=true -->
      <v-btn
        round
        color="primary"
        dark
        @click="$emit('handleShowCreateGameScreen')"
        >Create new game</v-btn
      >
      <!-- on click show join game modal -->
      <v-btn
        round
        color="secondary"
        dark
        @click="$emit('handleShowJoinGameScreen')"
        >Join game</v-btn
      >
    </div>
  </modal>
</template>

<script>
const startModal = {
  name: "StartModal",
  props: {
    showStartScreen: Boolean,
    geolocation_error: Boolean,
    handleShowCreateGameScreen: Function,
    handleShowJoinGameScreen: Function,
    handleClose: Function,
  },
  data() {
    return {};
  },
};
export default startModal;
</script>
