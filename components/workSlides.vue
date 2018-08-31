<template>
  <div>

    <div :class="workSlideOpen ? 'workSlideOpen':''" class="workSlide">
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

    </div>
    <div @click="startSlide" class="startWrapperMobile" v-if="!hideStartButton && $mq != 'lg'">
      <div class="startMobile aligner uppercase has-text-info is-size-4" :class="setBackgroundColor">
        Have a look
      </div>

    </div>
  </div>
</template>

<script>
import slideShowMobile from '~/components/slideShowMobile'
import slideShow from '~/components/slideShow'
import slideContentJson from '~/static/content/slideshowContent.json'

export default {
  components:{
    slideShow,
    slideShowMobile
  },
  data() {
    return {
      hideStartButton: false,
      workSlideOpen: false,
      setBackgroundColor: slideContentJson[0].color
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
    startSlide: function() {
      document.querySelector('#work').scrollIntoView({ behavior: 'smooth' });
      this.toggleScroll(true)
      this.workSlideOpen = true
      var vm = this
      setTimeout(function(){
        vm.hideStartButton = true
      },150)
    },
    endSlideshow: function(){
      this.toggleScroll(false)
      this.workSlideOpen = false
      var vm = this
      setTimeout(function(){
        vm.hideStartButton = false
      },150)
    }
  }
}
</script>

<style lang="scss" scoped>
.workSlideOpen{
  transform: translateX(0vw) !important;

}
.workSlide {
    position: absolute;
    height: 100%;
    right: 0;
    top: 0;
    width: 100%;
    transform: translateX(85%);
    transition: all 0.25s ease-in-out;




    .workSlidesOpen{
      left:0 !important;
    }
    .workSlides {
      transition: all 0.25s ease-in-out;
      width: 100%;
      position: absolute;
      height: 100%;
      left: 10%;
      top: 0;
    }

    .startWrapper{
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
.startWrapperMobile{
  position: absolute;
left: 0;
bottom: 0;
height: 25%;
width:  100%;
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
