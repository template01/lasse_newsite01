<template>
<div class="has-text-info contact is-size-4  is-size-5-touch">
  <div>
    <div class=" contactItemBg  purple-background p-40 ">
    </div>
    <div class=" contactItemBg  darkblue-background p-40">
    </div>
  </div>
  <div>
    <a href="mailto:lasse@parkedthis.space" class="aligner contactItem  purple-background p-40 uppercase has-text-centered">
    </a>
    <a href="tel:+31657772891"  class="aligner contactItem darkblue-background p-40 uppercase has-text-centered">
    </a>
  </div>

</div>
</template>

<script>
import showdown from 'showdown'
export default {
  props: ['details'],
  data() {
    return {
      result1: '',
      result2: ''
    }
  },
  mounted() {}
}
</script>

<style lang="scss">
.contact {
    a{
      border-bottom: 0 !important;
    }
    height: 120px;

    // height: 200px;
    // overflow: visible;
    position: relative;
}
// .contactAbsolute{
//   position: absolute;
//   bottom:0;
//   width:100%;
// }
.contactItemBg {
    width: 50%;
    position: absolute;
    height: 120px;
    bottom: 0;
    cursor: pointer;
    &:nth-of-type(2) {
        left: 50%;
    }
}
.contactItem {
    width: 50%;
    position: absolute;
    height: 120px;
    bottom: 0;
    cursor: pointer;
    &:nth-of-type(1) {
        &::after {
            content: "Write Me";
        }
    }
    &:nth-of-type(2) {
        left: 50%;
        &::after {
            content: "Call Me";
        }
    }
    transition: all 400ms cubic-bezier(0.785, -0.165, 0.265, 1.385);
    &:hover {
        height: 40vh;
        &:nth-of-type(1) {
            &::after {
                content: "Pleeaaaseee...";
            }
        }
        &:nth-of-type(2) {
            left: 50%;
            &::after {
                content: "You could try it!";
            }
        }
    }
}
</style>
