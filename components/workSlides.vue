<template>
<div>

  <div :class="workSlideOpen ? 'workSlideOpen':''" class="workSlide" :style="$mq === 'lg' ? {'transform':'translate3d('+workslideLeft+'%, 0,0)'}:{}">
    <div class="workSlides" :class="[workSlideOpen ? 'workSlidesOpen':'', setBackgroundColor]" :style="$mq != 'lg' ?{'border-radius':'0'}:{}">

      <div @click="startSlide" class="" v-if="!hideStartButton && $mq === 'lg'">
        <div class="p-40">

          <div class="is-size-2-desktop is-size-4-touch">
            <div class="initSlideshow aligner ">
            <div class="initSlideshowInner">
              <span class="initSlideshowText pr-10">Have a look</span>
              <div class="nextSlide">
                <div class="nextSlideInner"><span></span><span></span><span></span></div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
      <slideShow @setColor="setBackgroundColor = $event" @endSlideshow="endSlideshow" v-if="hideStartButton && $mq === 'lg'"></slideShow>
      <slideShowMobile @setColor="setBackgroundColor = $event" @endSlideshow="endSlideshow" v-if="hideStartButton && $mq != 'lg'"></slideShowMobile>
    </div>

  </div>

  <!-- <div :class="workSlideOpen ? 'workSlideOpen':''" class="workSlide">
      <div class="workSlides" :class="[workSlideOpen ? 'workSlidesOpen':'', setBackgroundColor]" :style="$mq != 'lg' ?{'left':'15%'}:{}" >

        <slideShow @setColor="setBackgroundColor = $event" @endSlideshow="endSlideshow" v-if="hideStartButton && $mq === 'lg'"></slideShow>
        <slideShowMobile @setColor="setBackgroundColor = $event" @endSlideshow="endSlideshow" v-if="hideStartButton && $mq != 'lg'"></slideShowMobile>
      </div>
      <div @click="startSlide" class="startWrapper" v-if="!hideStartButton && $mq === 'lg'">
        <div class="start aligner" :class="setBackgroundColor">
        </div>
        <div class="bar-wrapper aligner">
          <div class="vl"></div>
          <div class="vl"></div>
          <div class="vl"></div>
        </div>
      </div>

    </div> -->
  <div @click="startSlide" class="startWrapperMobile" v-if="$mq != 'lg'">
    <div class="startMobile aligner uppercase has-text-info is-size-4" :class="setBackgroundColor">
      Have a look
      <div class="nextSlide">
        <div class="nextSlideInner small"><span></span><span></span><span></span></div>
      </div>
    </div>

  </div>
</div>
</template>

<script>
import slideShowMobile from '~/components/slideShowMobile'
import slideShow from '~/components/slideShow'
import slideContentJson from '~/static/content/slideshowContent.json'
import {
  mapGetters
} from 'vuex'

export default {
  components: {
    slideShow,
    slideShowMobile
  },
  data() {
    return {
      hideStartButton: false,
      workSlideOpen: false,
      setBackgroundColor: slideContentJson[0].color,
      slideContent: slideContentJson
    }
  },
  computed: {
    ...mapGetters({
      getScrollPosTop: 'GET_SCROLLPOSTOP'
    }),
    workslideLeft: function(){
      var left = 0
      if(100 - (this.getScrollPosTop/35) > 75){
        left = 100 - (this.getScrollPosTop/35)
      }else{
        left = 75
      }
      return left
    }
  },
  watch:{
    getScrollPosTop:function(getScrollPosTop){
      if(getScrollPosTop>400){
        this.preloadSlides()
      }
    }
  },
  methods: {
    preloadSlides:function(){
      var objImg = new Image();
      objImg.src = this.slideContent[0].slides[0].content[0].source;
      var objImg = new Image();
      objImg.src = this.slideContent[0].slides[0].content[1].source;
    },
    toggleScroll: function(toggle) {
      if (toggle) {
        document.documentElement.style.overflowY = "hidden";
      } else {
        document.documentElement.style.overflowY = "initial";

      }
    },
    startSlide: function() {
      document.querySelector('#work').scrollIntoView({
        behavior: 'smooth'
      });
      this.toggleScroll(true)
      this.workSlideOpen = true
      var vm = this
      setTimeout(function() {
        vm.hideStartButton = true
      }, 150)
    },
    endSlideshow: function() {
      this.toggleScroll(false)
      this.workSlideOpen = false
      var vm = this
      setTimeout(function() {
        vm.hideStartButton = false
      }, 150)
    }
  }
}
</script>

<style lang="scss" scoped>
.workSlideOpen {
    transform: translateX(0%) !important;

}
.workSlide {
    position: absolute;
    height: 100%;
    right: 0;
    top: 0;
    z-index: 1;
    width: 100%;
    // transform: translateX(85%);
    transform: translate3d(100%, 0,0);
    transition: all 0.25s ease-in-out;

    .workSlidesOpen {
        left: 0 !important;
        border-radius: 0% !important;
    }
    .workSlides {
        border-radius: 100vh 0vh 0vh 100vh;
        transition: all 0.25s ease-in-out;
        width: 100%;
        position: absolute;
        height: 100%;
        // left: 10%;
        top: 0;

        .initSlideshow {
          cursor: pointer;
          position: absolute;
          width: 25vw;
          color: white;
          height: 100%;
          top:0;
          left: 0;
          .initSlideshowInner{
            width: 100%;
            text-align: center;
          }
            .initSlideshowText {
            }

        }

    }

    .startWrapper {
        position: absolute;
        left: 0;
        height: 100%;
    }
    .start {
        cursor: pointer;
        position: absolute;
        top: 0;
        left: 0;
        height: 120%;
        width: 15vw;
        border-radius: 100%;
        transform: translateX(5vw) translateY(-10vh);
        transition: all 0.25s ease-in-out;
        transform-origin: center;
        &:hover {
            transform: translateX(4vw) translateY(-10vh);

        }

    }
    .bar-wrapper {
        user-select: none;
        pointer-events: none;
        position: absolute;
        top: 0;
        left: 0;
        height: 120%;
        width: 15vw;
        border-radius: 100%;
        transform: translateX(5vw) translateY(-10vh);
        transition: all 0.25s ease-in-out;
        transform-origin: center;

        .vl {
            border-left: 10px solid white;
            height: 60px;
            float: left;
            display: inline-block;
            transform: translateX(-2.5vw);
            // width: 10px;
            margin-left: 10px;
            min-height: 60px;
        }
    }

}

.nextSlide {
    cursor: pointer;
    position: relative;
    display: inline-block;

    .nextSlideInner {
        width: 40px;
        height: 30px;
        transform: translateX(-16px) translateY(12px);

    }

    .small{
      transform: scale(0.75,0.75)  translateX(-16px) translateY(12px);;


    }
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

.startWrapperMobile {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 25%;
    width: 100%;
}
.startMobile {
    cursor: pointer;
    position: absolute;
    left: 0;
    height: 100%;
    width: 100%;
}
.bar-wrapper {
    user-select: none;
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    height: 120%;
    width: 15vw;
    border-radius: 100%;
    transform: translateX(5vw) translateY(-10vh);
    transition: all 0.25s ease-in-out;
    transform-origin: center;

    .vl {
        border-left: 10px solid white;
        height: 60px;
        float: left;
        display: inline-block;
        transform: translateX(-2.5vw);
        // width: 10px;
        margin-left: 10px;
        min-height: 60px;
    }
}
</style>
