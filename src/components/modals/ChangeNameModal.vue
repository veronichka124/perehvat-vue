<template>
    <modal
      id="changeNameScreen"
      v-if="show"
      @close="$emit('handleClose')"
    >
      <h3 slot="header">Enter name</h3>
      <div slot="body" class="text-xs-center">
        <v-flex xs12 sm6>
          <v-text-field
            v-model="newName"
            id="changeName"
            label="Your name"
            single-line
            autocomplete="off"
          />
        </v-flex>
        <v-btn 
            round 
            color="primary" 
            :disabled="!newName" 
            dark 
            @click="$emit('handleChangeName', newName)">
                Save
            </v-btn>
      </div>
    </modal>
</template>

<script>
export default {
  name: "ChangeNameModal",
  props: {
    show: Boolean,
    initialName: String,
    handleChangeName: Function,
    handleClose: Function,
  },
  data() {
    return {
        newName: localStorage.name,
    };
  },
};
</script>
