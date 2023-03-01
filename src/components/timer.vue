<!-- our template -->
<template>
  <div name="timer">
    <section class="hero is-info is-fullheight is-bold">
      <div class="hero-body">
        <div class="container has-text-centered">
          <!-- <h2 class="title is-6">{{title}}</h2> -->

          <!--  <slot name="set_time">
				  	<v-subheader>Minutes</v-subheader> 
              <input type="number" v-model="game_time" name="time_m" id="min" min="0" max="59"  @change="setTime">
				  </slot>
				   -->

          <div id="timer_on">
            <span id="minutes">{{ minutes }}</span>
            <span id="middle">:</span>
            <span id="seconds">{{ seconds }}</span>
          </div>

          <!--   <div id="buttons"> -->
          <!--     Start TImer -->
          <!-- <button 
				      id="start" 
				      class="button is-dark is-large" 
				      v-if="!timer"
				      @click="startTimer">
				        <i class="far fa-play-circle"></i> -->
          <!--   </button> -->
          <!--     Pause Timer -->
          <!-- <button 
				      id="stop" 
				      class="button is-dark is-large" 
				      v-if="timer"
				      @click="stopTimer">
				        <i class="far fa-pause-circle"></i> -->
          <!-- </button> -->
          <!--     Restart Timer -->
          <!--  <button 
				      id="reset" 
				      class="button is-dark is-large" 
				      v-if="resetButton"
				      @click="resetTimer">
				        <i class="fas fa-undo"></i> -->
          <!--  </button> -->
          <!--   </div> -->
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "timer",
  data() {
    return {
      timer: null,
      totalTime: 0,
      resetButton: false,
      title: "Game timer",
    };
  },
  methods: {
    setTime: function (time) {
      this.totalTime = time;
    },
    startTimer: function () {
      this.timer = setInterval(() => this.countdown(), 1000);
      this.resetButton = true;
      this.title = "Game in process";
    },
    stopTimer: function () {
      clearInterval(this.timer);
      this.timer = null;
      this.resetButton = true;
      this.title = "Game stopped";
    },
    resetTimer: function (time) {
      this.totalTime = time;
      clearInterval(this.timer);
      this.timer = null;
      this.resetButton = false;
      this.title = "Start a new game";
    },
    padTime: function (time) {
      return (time < 10 ? "0" : "") + time;
    },
    countdown: function () {
      if (this.totalTime >= 1) {
        this.totalTime--;
      } else {
        this.totalTime = 0;
        // this.resetTimer()
      }
    },
  },
  // ========================
  computed: {
    minutes: function () {
      const minutes = Math.floor(this.totalTime / 60);
      return this.padTime(minutes);
    },
    seconds: function () {
      const seconds = this.totalTime - this.minutes * 60;
      return this.padTime(seconds);
    },
  },
};
</script>

<style>
#message {
  color: #ddd;
  font-size: 50px;
  margin-bottom: 20px;
}

#timer {
  position: fixed;
  z-index: 2;
  left: 40%;
}

#timer_on {
  font-size: 40px;
  line-height: 1;
  margin-bottom: 40px;
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.8);
}

@media only screen and (max-width: 700px) {
  #timer_on {
    font-size: 30px;
  }
}

#buttons {
  font-size: 30px;
}

input[type="number"] {
  padding: 10px;
  font-size: inherit;
  width: 100%;
  text-align: center;
  border: solid #dddddd 1px;
}
</style>
