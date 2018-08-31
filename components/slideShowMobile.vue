<template>
<div>

  <div class="slideShow p-70">
    <div class="slideShowWrapper">

      <div class="columns " style="margin-bottom:0 !important">
        <div class="column is-paddingless">
          <div class="endSlideshow is-pulled-left" @click="endSlideshow">
            <div class="endSlideshowInner">
              <span></span><span></span>
            </div>
          </div>
        </div>
        <div class="column is-paddingless">
          <div class="nextSlide is-pulled-right " @click="nextSlide; swiper.slideNext()">

            <div class="nextSlideInner"><span></span><span></span><span></span></div>
          </div>
        </div>
      </div>

      <div class="columns pt-100">
        <div class="column">

          <div class="">
            <swiper :options="swiperOption" ref="mySwiper" @transitionStart="nextSlide">
              <template v-for="(slide,parentIndex) in slideContent">
              <swiper-slide :data-parent="parentIndex"  class="p-40 mt-80" :key="'first'+parentIndex"  >
                <p class="is-size-4 has-text-info mb-40 descTitle">{{slide.title}}</p>
                <div class="mb-40">
                  <p class="is-size-5 has-text-info">Type: {{slide.type}}</p>
                  <p class="is-size-5 has-text-info">Year: {{slide.year}}</p>
                </div>
                <p class="is-size-5 has-text-info mb-40">{{slide.desc}}</p>
                <div class="aWrapper is-size-5 has-text-info">
                  Link: <a target="_blank" :href="slide.link">{{slide.link}}</a>
                </div>
              </swiper-slide>
              <template v-for="(slideContent,slideIndex) in slide.slides" >

                <template v-for="(item,singleIndex) in slideContent.content" >
                <swiper-slide :data-parent="parentIndex" class="p-20 mt-80" :key="'media'+parentIndex+slideIndex+singleIndex"  >
                  <div class="mobileImageWrapper aligner" v-if="item.type === 'desktop'">
                      <div class="browser-mockup-mobile">
                        <img :src="item.source" />
                      </div>

                    </div>
                    <div class="mobileImageWrapper aligner" v-if="item.type === 'mobile'">
                      <div class="browser-mockup-mobile">
                        <img :src="item.source" />
                      </div>
                    </div>
                    <div class="mobileImageWrapper aligner" v-if="item.type === 'photo' || item.type === 'photo-square'" >
                      <img :src="item.source" />
                    </div>

                </swiper-slide>
              </template>

              </template>

              </template>

            </swiper>
          </div>
        </div>
      </div>
    </div>

  </div>

  <div class="swipeStartWrapperMobile aligner is-size-4" v-if="!hideGuide">
    Swipe!
  </div>
</div>
</template>

<script>
// require styles
import 'swiper/dist/css/swiper.css'
import slideContentJson from '~/static/content/slideshowContent.json'

import {
  swiper,
  swiperSlide
} from 'vue-awesome-swiper'


export default {
  data() {
    return {
      swiperOption: {
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
        speed: 100,
      },
      activeIndex: 0,
      activeParent: 0,
      ready: false,
      hideGuide: false,

      slideContent: slideContentJson

    }
  },
  components: {
    swiper,
    swiperSlide
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    },

  },
  mounted() {
    this.ready = true
    this.hideGuide = false

  },
  methods: {
    setParent: function() {
      // console.log(this.$el.querySelector(".swiper-slide-active").getAttribute("data-parent"))
      this.activeParent = parseInt(this.$el.querySelector(".swiper-slide-active").getAttribute("data-parent"))
    },
    setColor: function(index) {
      // console.log(this.slideContent[index].color)
      this.$emit('setColor', this.slideContent[index].color)

    },
    endSlideshow: function() {
      this.activeParent = 0
      this.setColor(0)
      this.$emit('endSlideshow')
    },
    nextSlide: function() {
      this.hideGuide = true
      if (this.swiper.activeIndex === this.$el.querySelectorAll(".swiper-slide").length - 1) {
        this.endSlideshow()
      } else {
        // this.swiper.slideNext()
        this.setParent()
        this.setColor(this.activeParent)
      }
    }
  },
}
</script>

<style lang="scss" scoped>
* {
    color: white;
}
.slideShow {
    position: absolute;
    width: 100%;
    height: 100%;
}
.slideShowWrapper {
    position: relative;
}
.nextSlide {
    cursor: pointer;
    transform: scale(0.8);

    .nextSlideInner {
        width: 40px;
        height: 30px;
        transform: translateX(-16px) translateY(10px);

    }

    position: relative;
    span {
        width: 5px;
        background: white;
        height: 100%;
        position: absolute;
        transform-origin: center;
        left: 34px;
        top: -11px;
    }
    span:nth-of-type(1) {
        transform: rotate(45deg);
        height: 60%;
        left: 44px;
        top: 0;
    }
    span:nth-of-type(2) {
        transform: rotate(-45deg);
        height: 60%;
        left: 44px;
        top: -9px;
    }
    span:nth-of-type(3) {
        transform: rotate(90deg);
    }
}
.endSlideshow {
    // transform: scale(0.65);
    transform: scale(0.8);
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

.swipeStartWrapperMobile {
    pointer-events: none;
    position: absolute;
    left: 0;
    bottom: 0;
    height: 25%;
    width: 100%;
    background: rgba(255,255,255,0.1);
    z-index: 2;
}

.mobileImageWrapper{
  // div{
  //   margin: 0 auto;
  // }
}
img{
  max-height: 70vh;
  margin: 0 auto;
}
.desc {
    width: 100%;
    // position: absolute;
    // left: 0;
    // max-width: 360px;
    div {
        display: inline-block;
    }
    .descTitle {
        // border-bottom: 5px solid;
        text-transform: uppercase;
        // border-color: inherit;

    }

    .aWrapper {
        white-space: nowrap;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        a {
            display: inline-block;
        }
    }
}

</style>
