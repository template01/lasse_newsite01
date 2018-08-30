<template>
<section class="">
  <div :id="section.id" :class="[index===0 ? ($store.state.initGameState ? 'playSlide playScreen':'playSlide playScreenInactive'):'', section.fullHeight?'fullHeight':'', section.background.type === 'solid' ? section.background.class:'']" class="sectionWrapper"
    v-for="(section,index) in sections" :key="'key'+section.id" :style=" [section.background.type === 'image' ? { 'background-position' : section.background.align, 'background-image': 'url(' + section.background.source + ')' }:{},$store.state.initGameState && index===0?{'position':'absolute','z-index':1}:{}]">
    <div class="p-40">
      <div class="columns" v-for="(item,index) in section.content" :key="index">
        <div v-if="item.header" :class="item.classes">
          <p class="is-size-2" v-if="item.tagline" v-html="item.tagline"></p>
          <p class="is-size-1" v-html="item.header">
          </p>
        </div>
        <div v-if="item.component === 'workSlides'">
          <workSlides></workSlides>
        </div>
        <div v-if="item.component === 'cvBegin'">
          <cvBegin></cvBegin>
        </div>
        <div v-if="item.component === 'cv'" :class="item.classes">
          <cv></cv>
        </div>
        <div v-if="item.component === 'pongWrapper'">

          <div>
            <!-- <startWorkSlide></startWorkSlide> -->
            <pongWrapper class="scaleOutComputerInit" :class="scaleOutComputer?'scaleOutComputer':''"></pongWrapper>
          </div>
        </div>

      </div>
    </div>
  </div>

</section>
</template>

<script>
import sectionContent from '~/static/content/sectionContent.json'

import pongWrapper from '~/components/pongWrapper'
import cvBegin from '~/components/cvBegin'
import cv from '~/components/cv'
import workSlides from '~/components/workSlides'
export default {
  components: {
    cvBegin,
    cv,
    pongWrapper,
    workSlides
  },
  data: function() {
    return {
      scrollPosTop: 0,
      scaleOutComputer: false,
      sections: sectionContent
    }
  },
  methods: {
    handleScroll() {
      this.scrollPosTop = window.scrollY;
      if (this.scrollPosTop != 0) {
        this.scaleOutComputer = true
      } else {
        this.scaleOutComputer = false
      }
    }
  },
  mounted() {
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
