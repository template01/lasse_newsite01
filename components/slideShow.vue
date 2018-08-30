<template>
<div class="slideShow p-40">
  <div class="slideShowWrapper">

    <div class="columns " style="margin-bottom:0 !important">
      <div class="column">
        <div class="endSlideshow" @click="endSlideshow"><span></span><span></span></div>
      </div>
      <div class="column">
        <div class="nextSlide is-pulled-right" @click="nextSlide"><span></span><span></span><span></span></div>
      </div>
    </div>

    <div class="columns">
      <div class="column is-3 aligner">
        <div class="desc aligner-item--bottom">
          <p class="is-size-4 has-text-info">{{slideContent[activeParent].title}}</p>
          <p class="is-size-4 has-text-info">{{slideContent[activeParent].type}}</p>
          <p class="is-size-4 has-text-info">{{slideContent[activeParent].desc}}</p>

        </div>
      </div>

      <div class="column is-9">

        <div class="swiperWrapperOuter">
          <swiper :options="swiperOption" ref="mySwiper">
            <template v-for="(slide,parentIndex) in slideContent">
              <swiper-slide :data-parent="parentIndex" :key="slideContent.id+parentIndex" v-for="(slideContent) in slide.slides" :data-length="slide.slides.length">
                <div class="slideWrapperInner">
                  <div v-for="(item,index) in slideContent.content" :key="index+'inner'" class="single p-20" :class="[item.classes,item.type]">
                  <div v-if="item.type === 'desktop'">
                      <div class="browser-mockup">
                        <img :src="item.source" />
                      </div>

                    </div>
                    <div v-if="item.type === 'mobile'" :class="item.classes">
                      <div class="browser-mockup-mobile">
                        <img :src="item.source" />
                      </div>
                    </div>
                    <div v-if="item.type === 'photo'" :class="item.classes">
                      <img :src="item.source" />
                    </div>
                  </div>

                </div>
              </swiper-slide>
            </template>

          </swiper>
        </div>
      </div>
    </div>
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
        speed: 0,
      },
      activeIndex: 0,
      activeParent: 0,
      ready: false,
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
      if (this.swiper.activeIndex === this.$el.querySelectorAll(".swiper-slide").length - 1) {
        this.endSlideshow()
      } else {
        this.swiper.slideNext()
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
    width: 40px;
    height: 30px;
    transform: translateX(-10px);

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
    cursor: pointer;
    width: 40px;
    height: 30px;
    position: relative;
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
.swiperWrapperOuter {
    width: 100%;
    // min-height: calc(100vh - 80px - 54px);

}

.swiper-container {}
.swiper-slide-active {
    .single {
        transform: translateY(0px) !important;
        opacity: 1 !important;
    }
}
.slideWrapperInner {
    img {
        display: block;
    }
    position: relative;
    width: 100%;
    // height: 100%;
    height: calc(100vh - 80px - 46px);
    // position: absolute;
    .single {
        position: absolute;
        transform: translateY(40px);
        opacity: 0;
        transition: all 0.25s ease-in-out;
        // transition-delay: 0.25s;

    }
    @for $i from 1 through 16 {
        .single:nth-of-type(#{$i}) {
            transition-delay: #{$i*0.20+0.15}s;
        }
    }

    .south-east {
        bottom: 0;
        right: 0;
    }
    .south-west {
        bottom: 0;
        left: 0;
    }
    .north-east {
        top: 0;
        right: 0;
    }
    .north-west {
        top: 0;
        left: 0;
    }
    .desktop {
        width: 80%;
        max-width: 1024px;
        // max-height: 400px;
        max-height: calc(100vh - 80px - 146px);

        img {
            width: auto;
            // max-height: 400px;
            max-height: calc(100vh - 80px - 146px);

        }
        // // width: 80%;
        // // max-width: 1024px;
        // img{
        //   width: 15%;
        // }
    }
    .mobile {
        width: 30%;
        max-width: 400px;
        max-height: 400px;
        img {
            width: auto;
            max-height: 400px;
        }

    }
    .photo {
        width: 60%;
        max-width: 800px;

    }

}
.desc {
    width: 100%;
    div {
        display: inline-block;
    }
}
// .slide-up{
//
//   opacity: 0;
// }
</style>
