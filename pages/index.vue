<template>
<div>
  <section>
    <div :id="section.id" v-for="(section,index) in sections" :key="'key'+section.id">


      <div :class="[section.fullHeight?'fullHeight':'', section.background.type === 'solid' ? section.background.class:'']" class="sectionWrapper" :style=" [index===0 ? ($store.state.chatOpen ? {'transform':'translateX(-500px)'}:{}):{},section.background.type === 'image' ? { 'background-position' : section.background.align, 'background-image': 'url(' + section.background.source + ')' }:{}]">
        <div :class="section.id!='contact'?'p-40':''" v-for="(item,index) in section.content" :key="index">
          <div class="columns">
            <div v-if="item.header" :class="item.classes">
              <p class="is-size-2-desktop is-size-4-touch" v-if="item.tagline" v-html="item.tagline"></p>
              <p class="is-size-1-desktop is-size-2-touch" v-html="item.header"></p>
            </div>
            <div v-if="item.component === 'workSlides' && scaleOutComputer">
              <workSlides></workSlides>
            </div>
            <div v-if="item.component === 'cvBegin'">
              <cvBegin></cvBegin>
            </div>
            <div v-if="item.component === 'cv'" :class="item.classes">
              <cv></cv>
            </div>

            <div v-if="item.component === 'pongWrapper' && $mq === 'lg' && readyFirst">
              <div>
                <chatInit class="scaleOutComputerInit" :class="scaleOutComputer?'scaleOutComputer':''"></chatInit>
                <!-- <pongWrapper class="scaleOutComputerInit" :class="scaleOutComputer?'scaleOutComputer':''"></pongWrapper> -->
              </div>
            </div>

          </div>
        </div>
      </div>
      <div v-if="index===0 && readyFirst" >
          <chatwrapper></chatwrapper>
      </div>
    </div>
    <contact></contact>

  </section>
</div>
</template>

<script>
import sectionContent from '~/static/content/sectionContent.json'

import pongWrapper from '~/components/pongWrapper'
import chatInit from '~/components/chatInit'
import cvBegin from '~/components/cvBegin'
import cv from '~/components/cv'
import contact from '~/components/contact'
import workSlides from '~/components/workSlides'
import chatwrapper from '~/components/chatwrapper'
export default {
  components: {
    cvBegin,
    cv,
    contact,
    pongWrapper,
    chatInit,
    workSlides,
    chatwrapper
  },
  data: function() {
    return {
      scrollPosTop: 0,
      readyFirst: false,
      scaleOutComputer: false,
      sections: sectionContent
    }
  },
  methods: {
    handleScroll: function() {
      this.scrollPosTop = window.scrollY;
      this.$store.commit('SET_SCROLLPOSTOP',this.scrollPosTop)
      if (this.scrollPosTop != 0) {
        this.scaleOutComputer = true
      } else {
        this.scaleOutComputer = false
      }
    },
    startComputer: function() {
      var vm = this
      var objImg = new Image();
      objImg.src = sectionContent[0].background.source;

      objImg.onload = function() {
        /// do some work;
        vm.readyFirst = true
      }

    }
  },
  mounted() {
    console.log(`
 _______  __   __  _______  __
|   _   ||  | |  ||   _   ||  |
|  |_|  ||  |_|  ||  |_|  ||  |
|       ||       ||       ||  |
|       ||       ||       ||__|
|   _   ||   _   ||   _   | __
|__| |__||__| |__||__| |__||__|
 __   __  _______  __   __
|  | |  ||       ||  | |  |
|  |_|  ||   _   ||  | |  |
|       ||  | |  ||  |_|  |
|_     _||  |_|  ||       |
  |   |  |       ||       |
  |___|  |_______||_______|
 _______  __    _  _______  _______  ___   _  __   __
|       ||  |  | ||       ||   _   ||   | | ||  | |  |
|  _____||   |_| ||    ___||  |_|  ||   |_| ||  |_|  |
| |_____ |       ||   |___ |       ||      _||       |
|_____  ||  _    ||    ___||       ||     |_ |_     _|
 _____| || | |   ||   |___ |   _   ||    _  |  |   |
|_______||_|  |__||_______||__| |__||___| |_|  |___|
 _______  __   __  ___   __    _  _______  __
|       ||  | |  ||   | |  |  | ||       ||  |
|_     _||  |_|  ||   | |   |_| ||    ___||  |
  |   |  |       ||   | |       ||   | __ |  |
  |   |  |       ||   | |  _    ||   ||  ||__|
  |   |  |   _   ||   | | | |   ||   |_| | __
  |___|  |__| |__||___| |_|  |__||_______||__|
 _______  ___      _______  _______  _______  _______
|       ||   |    |       ||   _   ||       ||       |
|    _  ||   |    |    ___||  |_|  ||  _____||    ___|
|   |_| ||   |    |   |___ |       || |_____ |   |___
|    ___||   |___ |    ___||       ||_____  ||    ___|
|   |    |       ||   |___ |   _   | _____| ||   |___
|___|    |_______||_______||__| |__||_______||_______|
 _______  __    _      ___  _______  __   __
|       ||  |  | |    |   ||       ||  | |  |
|    ___||   |_| |    |   ||   _   ||  |_|  |
|   |___ |       |    |   ||  | |  ||       |
|    ___||  _    | ___|   ||  |_|  ||_     _| ___
|   |___ | | |   ||       ||       |  |   |  |   |
|_______||_|  |__||_______||_______|  |___|  |___|
`)
    this.startComputer()
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  }

}
</script>

<style lang="scss">
.sectionWrapper {
    position: relative;
    overflow: hidden;
    transition: transform 0.25s ease-in-out;
}
.playScreen {
    transform: scale(3) translateY(-31.5vh) translateX(-28vw);
}
.playScreen,
.playScreenInactive {
    transition: transform 0.35s ease-in-out;
}
.scaleOutComputer {
    transform: scale(0.0,0.0);
    opacity: 0;
}
.scaleOutComputerInit {
    transition: all 0.10s ease-in-out;
}
//
// // .fade-enter-active, .fade-leave-active {
// //   transition: transform 5s;
// // }
// // .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
// //   transform: scale(0.5,0.5)
// // }
// .slide-fade-enter-active {
//     transition: all 0.3s ease;
// }
// .slide-fade-leave-active {
//     transition: all 0.8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
// }
// /* .slide-fade-leave-active below version 2.1.8 */
// .slide-fade-enter,
// .slide-fade-leave-to {
//     transform: translateX(-100%) !important;
//
//     opacity: 0;
// }
</style>
