<template>
<div class="playCanvas">

  <!-- <button v-if="!playBegun" @click="startGame()">start</button> -->
  <!-- <button v-else @click="endGame()">x</button> -->
  <div class="playCanvasInner">

    <div class="cmd" :class="$store.state.initGameState ? 'gameRunningCmdPos':''">
      <p :class="$store.state.initGameState ? 'gameRunningFontSize':''" v-if="!ready">

        <span v-if="!showGuide" @click="showGuide = true; initGame()">$ start 2-player pong<span class="blink">▊</span></span>
        <span v-else @click="ready = true">$ Player 1 use W and S. Player 2 use UP and DOWN<span class="blink">▊</span></span>

      </p>
      <p :class="$store.state.initGameState ? 'gameRunningFontSize':''" v-else>
        <span v-if="!playBegun" @click="startGame()">$ start<span class="blink">▊</span> {{score}}</span>
        <span v-else @click="endGame()">$ exit<span class="blink">▊</span> {{score}}</span>
      </p>
    </div>
    <pong @score="setScore" v-if="playBegun"></pong>
  </div>

  <computerLoader v-if="!ready && !showGuide" class="loaderCustom"></computerLoader>
</div>
</template>

<script>
import pong from '~/components/pong'
import computerLoader from '~/components/computerLoader'
export default {
  components: {
    pong,
    computerLoader
  },
  data: function() {
    return {
      test: 'tesat',
      playBegun: false,
      score: 0,
      ready: false,
      showGuide: false,

    }
  },
  methods: {
    setScore: function(scoreContent) {
      this.score = this.score + 1
    },
    toggleScroll: function(toggle) {
      if (toggle) {
        document.documentElement.style.overflowY = "hidden";
      } else {
        document.documentElement.style.overflowY = "initial";

      }
    },
    initGame: function() {
      this.toggleScroll(true)
      window.scrollTo(0, 0)
      this.$store.commit('SET_GAME_STATE', true)
    },
    startGame: function() {
      this.playBegun = true
    },
    endGame: function() {
      this.toggleScroll(false)
      this.$store.commit('SET_GAME_STATE', false)
      this.playBegun = false;
      this.score = 0;
      this.ready = false;
      this.showGuide = false;
    }
  },
}
</script>

<style lang="scss">
.playCanvas {

    .loaderCustom {
        background: red;
        height: 100%;
        width: 100%;
        border-radius: 8px;
        transition:  0.10s ease-in-out;
    }
    &:hover {

        .loaderCustom {
            // opacity: 0;
            transform:scale(0.0,0.0);
             overflow: hidden;
        }
        .cmd {
        }
    }
    position: absolute;
    width: 7.4%;
    height: 5.5vw;
    left: 74.7%;
    bottom: 9vw;
    opacity: 0.9;
    line-height: 1 !important;
    .cmd {
        z-index: -1;
        top: 0;
        position: absolute;
        p {
            font-size: 16px;
            font-family: monospace;
            color: white;
            line-height: 1 !important;

            // line-height: 0;
            // display: flex;
            cursor: pointer;
        }
        &.gameRunningCmdPos {
            top: -1px;
        }
        .gameRunningFontSize {
            font-size: 8px;

        }
    }
    .blink {
        animation: blink-animation 1.5s steps(2, start) infinite;
    }
    @keyframes blink-animation {
        to {
            visibility: hidden;
        }
    }
    @-webkit-keyframes blink-animation {
        to {
            visibility: hidden;
        }
    }

}

.playCanvasInner{
  opacity: 0.5;
}
// .playSlide {
//     background: url("https://rocktumbler.com/450/tumbled-stone-varieties.jpg") no-repeat center bottom fixed;
//     -webkit-background-size: 100% auto;
//     -moz-background-size: 100% auto;
//     -o-background-size: 100% auto;
//     background-size: 100% auto;
//     width: 100%;
//     height: 100vh;
//     position: relative;
//     /* resize: both; */
// }
</style>
