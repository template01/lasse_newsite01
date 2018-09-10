<template>
<div class="chatwrapper " :class=" $mq != 'lg' ? 'mobile':''" :style="setZindex ? {'z-index':'10'}:{'z-index':'-1'}">

  <chatcomp class="" :class=" $mq != 'lg' ? 'p-20':'p-10'" id="chatcomp" v-if="chatOpenComputed"></chatcomp>
  <div class="gradientfade">
  </div>
  <div>

  </div>
  <div class="closeChat">
    <div :class=" $mq != 'lg' ? 'p-20':'p-10'">

      <div class=" " @click="$store.commit('SET_CHAT_STATE', false)">
        <div class="endSlideshow is-pulled-left">
          <div class="endSlideshowInner">
            <span></span><span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import chatcomp from '~/components/chatcomp'
import {
  mapGetters
} from 'vuex'

export default {
  components: {
    chatcomp
  },
  computed: {
    ...mapGetters({
      chatOpenComputed: 'GET_CHAT_STATE'
    })
  },
  data() {
    return {
      setZindex: false
    }
  },
  watch: {
    chatOpenComputed: function(toggle) {
      var vm = this
      if (toggle) {
        setTimeout(function() {
          vm.setZindex = true
        }, 250)
      } else {
        setTimeout(function() {
          vm.setZindex = false
        }, 0)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.endSlideshow {
    // transform: scale(0.65);
    cursor: pointer;

    position: relative;
    .endSlideshowInner {
        width: 40px;
        height: 30px;
        transform: translateX(4px) translateY(6px);

    }
    span {
        width: 5px;
        background: white;
        height: 100%;
        position: absolute;
        transform-origin: center;
        left: 8px;
        top: -6px;
    }
    span:nth-of-type(1) {
        transform: rotate(45deg);
    }
    span:nth-of-type(2) {
        transform: rotate(-45deg);
    }

}

.chatwrapper {


    .closeChat {
        position: absolute;
        height: 60px;
        width: 100%;
        top: 0;
        // background: red;

    }
    .gradientfade {
        background: red;
        position: absolute;
        top: 0;
        height: 35vh;
        width: 100%;
        background: linear-gradient(to bottom, rgba(59,58,250,0.95) 0%,rgba(125,185,232,0) 100%);
    }
    transition: transform 0.25s ease-in-out;
    position: absolute;
    right: 0;
    top: 0;
    width: 500px;
    height: 100%;
    background: #3B3AFA;
    overflow: hidden;
    #chatcomp {
        position: absolute;
        bottom: 0;
        width: 100%;
    }
    &.mobile{
      width: 100%;
    }
}
</style>
