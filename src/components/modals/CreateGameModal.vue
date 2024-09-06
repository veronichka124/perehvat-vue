<template>
    <modal
      id="createGameScreen"
      v-if="show"
      @close="$emit('handleClose')"
    >
      <h3 slot="header">Create New Game</h3>
      <div slot="body" class="text-xs-center">
        <v-flex xs12 sm6>
          <v-text-field
            v-model="gameName"
            id="newGameName"
            label="Game name"
            single-line
            autocomplete="off"
          ></v-text-field>
        </v-flex>
        <v-alert :value="gameExists" color="red" icon="warning" outline>
          Game already exists
        </v-alert>
        <!-- on click create new game -->
        <v-btn round color="primary" dark @click="$emit('handleCreateGame', gameName)">
            Create game
        </v-btn>
      </div>
    </modal>
  </template>
  
  <script>
  export default {
    name: "CreateGameModal",
    props: {
      show: Boolean,
      gameExists: Boolean,
      handleCreateGame: Function,
      handleClose: Function,
    },
    data() {
      return {
        gameName: "",
      };
    },
  };
  </script>
  