<template>
<div class="computerLoader">
  <div v-for="(element,index) in elements" :style="{'left': (index*25)-25+'%','top':'-200%','width':'80%','height':'400%','background':element.color}" :key="element.id" class="element">
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      elements: [{
        "id":"a",
        "color":"pink"
      }, {
        "id":"b",
        "color":"cyan"
      }, {
        "id":"c",
        "color":"blue"
      }, {
        "id":"d",
        "color":"pink"
      }, {
        "id":"e",
        "color":"blue"
      }]
    }
  },
  methods: {
    randomW(){
      return Math.floor(Math.random() * 160) + 80  +'%'
    },
    randomH(){
      return Math.floor(Math.random() * 260) + 160  +'%'
    },
    randomL(){
      return Math.floor(Math.random() * 100) + -20  +'%'
    },
    randomT(){
      return Math.floor(Math.random() * 40) + -80  +'%'
    }
  }
}
</script>

<style lang="scss" scoped>
.computerLoader{
  overflow: hidden;
  position: relative;

}
.element{
  position: absolute;
  background: pink;
  height: 100%;
  width: 100%;
  animation: rotate 4s ease-in-out infinite;
}

@for $i from 1 through 16 {
    .element:nth-of-type(#{$i}){
      opacity: #{$i*0.20+0.15};
      animation-delay:  #{$i*0.05}s;
    }
}

@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}

</style>
