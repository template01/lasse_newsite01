<template>
<div class="chatInitCanvas">
  <div class="chatInitCanvasInner">
        <div class="chatInitButton aligner" @click="!$store.state.chatOpen ? $store.commit('SET_CHAT_STATE', true): $store.commit('SET_CHAT_STATE', false)" :style="!$store.state.chatOpen ?{'background':'#3B3AFA'}:{'background':'#FB4244'}" >
          <p class="is-size-5 uppercase" >
            <span  v-if="!$store.state.chatOpen">chat</span>
            <span  v-else>exit</span>
          </p>
        </div>
  </div>
  <computerLoader class="loaderCustom"></computerLoader>
</div>
</template>

<script>
import computerLoader from '~/components/computerLoader'
export default {
  components: {
    computerLoader
  },
  data: function() {
    return {
    }
  },
  methods: {

    toggleScroll: function(toggle) {
      if (toggle) {
        document.documentElement.style.overflowY = "hidden";
      } else {
        document.documentElement.style.overflowY = "initial";

      }
    },

  },
}
</script>

<style lang="scss">
.chatInitCanvas {

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
    // opacity: 0.9;
    line-height: 1 !important;
    .chatInitButton {
      transition: background 0.25s;
      border-radius: 8px;
      // background: ;
      height: 100%;
      width: 100%;
      cursor: pointer;
      left:0;
        // z-index: -1;
        top: 0;
        position: absolute;
        p {
            color: white;
            line-height: 1 !important;

            // line-height: 0;
            // dischatInit: flex;

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

.chatInitCanvasInner{
}
// .chatInitSlide {
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
