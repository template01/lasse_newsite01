<template>
  <div>
    <section>
      <div :id="section.id" :class="[index===0 ? ($store.state.initGameState ? 'playSlide playScreen':'playSlide playScreenInactive'):'', section.fullHeight?'fullHeight':'', section.background.type === 'solid' ? section.background.class:'']" class="sectionWrapper"
      v-for="(section,index) in sections" :key="'key'+section.id" :style=" [section.background.type === 'image' ? { 'background-position' : section.background.align, 'background-image': 'url(' + section.background.source + ')' }:{},$store.state.initGameState && index===0?{'position':'absolute','z-index':1}:{}]">
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
              <pongWrapper class="scaleOutComputerInit" :class="scaleOutComputer?'scaleOutComputer':''"></pongWrapper>
            </div>
          </div>

        </div>
      </div>
    </div>
    <contact></contact>

  </section>
  </div>
</template>

<script>
import sectionContent from '~/static/content/sectionContent.json'

import pongWrapper from '~/components/pongWrapper'
import cvBegin from '~/components/cvBegin'
import cv from '~/components/cv'
import contact from '~/components/contact'
import workSlides from '~/components/workSlides'
export default {
  components: {
    cvBegin,
    cv,
    contact,
    pongWrapper,
    workSlides
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
    handleScroll: function(){
      this.scrollPosTop = window.scrollY;
      if (this.scrollPosTop != 0) {
        this.scaleOutComputer = true
      } else {
        this.scaleOutComputer = false
      }
    },
    startComputer: function(){
      var vm = this
      var objImg = new Image();
      objImg.src =  sectionContent[0].background.source;

      objImg.onload = function() {
                                 /// do some work;
                                 vm.readyFirst = true
                              }

    }
  },
  mounted() {
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
