<template>
<div class="pong">
  <div id="pongWrapper"></div>
</div>
</template>

<script>
// var Pong = require('~/assets/Pong.js')
// import pong from '~/components/pong'

export default {
  data() {
    return {
      pong: ''
    }
  },
  mounted() {
    var vm = this
    // setTimeout(function() {
      var pong = new Pong(document.getElementById('pongWrapper'));

      pong.BG_COLOR = '0x224444'
      pong.BALL_SPEED = 1

      // Add keyboard controls for player A
      pong.players.a.addControls({
        'up': 'w',
        'down': 's',
      });

      pong.players.b.addControls({
        'up': 'up',
        'down': 'down',
      });
      pong.players.a.speed = 120
      pong.players.b.speed = 120
      pong.players.a.width = 3
      pong.players.b.width = 3
      pong.players.a.setY(3)
      pong.players.b.setY(3)


      pong.setTextStyle({
        font: '0px Helvetica, Arial, sans-serif',
        fill: '#000000',
        align: 'center'
      })
      //
      // // Add behaviour for player B
      // pong.on('update', function() {
      //
      //   if (pong.players.b.y < pong.balls[0].y) {
      //     pong.players.b.move(1);
      //   } else if (pong.players.b.y > pong.balls[0].y) {
      //     pong.players.b.move(-1);
      //   }
      //
      // });

      // Use a custom image for the ball
      // pong.setBallImage('./assets/ball.png');

      // Use a background color
      // pong.setBackgroundColor('#00FFFFFF');

      pong.resize()
      pong.setBallSize(3)
      pong.players.a.setHeight(12)
      pong.players.b.setHeight(12)
      pong.start()

      pong.players.b.on('point', function() {
        vm.$emit('score', 'yaayay')
        // alert('score')
      })
      pong.players.a.on('point', function() {
        vm.$emit('score', 'yaayay')
        // alert('score')

      })

    // }, 1000)



  }
}
</script>

<style lang="scss">
#pongWrapper {
    // background: green;
    display: block;
    position: absolute;
    bottom: 0;
    height: 90%;
    width: 100%;
    // height: 800px;
}

canvas {
    image-rendering: optimizeSpeed;
    /* Older versions of FF          */
    image-rendering: -moz-crisp-edges;
    /* FF 6.0+                       */
    image-rendering: -webkit-optimize-contrast;
    /* Safari                        */
    image-rendering: -o-crisp-edges;
    /* OS X & Windows Opera (12.02+) */
    image-rendering: pixelated;
    /* Awesome future-browsers       */
    -ms-interpolation-mode: nearest-neighbor;
    /* IE                            */
}
</style>
