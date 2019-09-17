<template>
<div class="chatInitCanvas" :class="mobile ? 'mobile':''">
  <div class="chatInitCanvasInner">
    <div class="chatInitButton aligner" @click="!$store.state.chatOpen ? $store.commit('SET_CHAT_STATE', true): $store.commit('SET_CHAT_STATE', false)" :style="!$store.state.chatOpen ?{'background':'#3B3AFA'}:{'background':'#FB4244'}">
      <p class="is-size-5 uppercase" v-if="!mobile">
        <span v-if="!$store.state.chatOpen">chat</span>
        <span v-else>exit</span>
      </p>
    </div>
  </div>
  <computerLoader v-if="!mobile" class="loaderCustom"></computerLoader>
</div>
</template>

<script>
import computerLoader from '~/components/computerLoader'
export default {
  components: {
    computerLoader
  },
  data: function() {
    return {}
  },
  props: ['mobile'],
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
        transition: 0.10s ease-in-out;
    }
    &:hover {

        .loaderCustom {
            // opacity: 0;
            transform: scale(0.0,0.0);
            overflow: hidden;
        }
        .cmd {}
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
        left: 0;
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
    &.mobile {

        outline: none;

        .loaderCustom {
            height: 100%;
            width: 100%;
            border-radius: 100%;

            transition: 0.10s ease-in-out;
        }
        &:hover {

            .loaderCustom {
                // opacity: 0;
                transform: scale(0.0,0.0);
                overflow: hidden;
            }
            .cmd {}
        }
        position: fixed;
        width: 10vw;
        height: 10vw;
        right: 20vw;
        opacity: 0.95;
        left: initial;
        bottom: 20vw;
        border-radius: 100%;

        // opacity: 0.9;
        line-height: 1 !important;
        .chatInitButton {
            transition: background 0.25s;
            border-radius: 100%;
            // background: ;
            height: 100%;
            width: 100%;
            cursor: pointer;
            left: 0;
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

        animation: mymove 3s;
        animation-iteration-count: infinite ;
        animation-direction: alternate;
        box-shadow: 0px 10px 32px -9px rgba(0,0,0,0.8);

        @keyframes mymove {
            from {
                transform: translateY(0);
            }
            to {
                transform: translateY(10px);
            }
        }

    }
}

.chatInitCanvasInner {}
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
