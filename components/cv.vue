<template>
<div class="columns cv is-size-4">
  <div class="column is-5" v-html="result1">
  </div>
  <div class="column is-5 is-offset-1" v-html="result2">
  </div>
</div>
</template>

<script>

import showdown from 'showdown'
export default {
  data() {
    return {
      result1: '',
      result2: ''
    }
  },
  mounted() {
    var vm = this
    var converter = new showdown.Converter()
    fetch('/content/cvCol01.md').then(function(response) {
    return response.text().then(function(text) {
      console.log(text)
        var html = converter.makeHtml(text);
        vm.result1 = html;
    });
  })
  fetch('/content/cvCol02.md').then(function(response) {
  return response.text().then(function(text) {
    console.log(text)
      var html = converter.makeHtml(text);
      vm.result2 = html;
  });
})


  }
}
</script>

<style lang="scss">
.cv{
  line-height: 1.25;
  h1{
    text-indent: 40px;
    margin-top: 20px;
    margin-bottom: 3px;
    border-bottom: 3px solid white;
  }
  h1:first-of-type{
    margin-top: 0px;
  }
}
</style>
