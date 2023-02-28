<template>
    <modal
      id="joinGameScreen"
      v-if="show"
      @close="$emit('handleClose')"
    >
      <h3 slot="header">Join Game</h3>
      <div slot="body" class="text-xs-center">
        <v-flex xs12 sm6>
          <v-text-field
            v-model="gameName"
            id="joinGameName"
            label="Game name"
            single-line
          ></v-text-field>
        </v-flex>
        <v-alert :value="gameExists" color="red" icon="warning" outline>
          Game does not exist
        </v-alert>
        <!-- on click change game to new game name -->
        <v-btn round color="primary" dark @click="$emit('handleJoinGame', gameName)">
            Join game
        </v-btn>
      </div>
    </modal>
</template>

<script>
export default {
  name: "JoinGameModal",
  props: {
    show: Boolean,
    gameExists: Boolean,
    handleJoinGame: Function,
    handleClose: Function,
  },
  data() {
    return {
      gameName: "",
    };
  },
};
</script>
