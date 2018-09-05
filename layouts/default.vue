<template>
  <div>
    <!-- <NavBar /> -->
    <nuxt/>
  </div>
</template>

<script>
import NavBar from '../components/NavBar'
export default {
  components: {
    NavBar
  }
}
</script>


<style>
html {
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  -webkit-box-shadow: inset 0px 0px 300px 0px rgba(216,215,220,1);
  -moz-box-shadow: inset 0px 0px 300px 0px rgba(216,215,220,1);
  box-shadow: inset 0px 0px 300px 0px rgba(216,215,220,1);
  margin:0;
  height: 100%;
  width: 100%;
  position: absolute;
  background: rgba(216,215,220,0.5);
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
