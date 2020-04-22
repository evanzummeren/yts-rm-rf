<template>
  <div id="app">
      <SingleVideo/>
    <div class="app__box--left"></div>
    <div class="app__box--right"></div>
    <GridVertical/>
    <GridHorizontal/>
  </div>
</template>

<script>
import GridVertical from './components/GridVertical.vue';
import GridHorizontal from './components/GridHorizontal.vue';
import SingleVideo from './components/SingleVideo.vue';

export default {
  name: 'App',
  components: {
    GridVertical, GridHorizontal, SingleVideo
  }
}
</script>

<style lang="scss">
@import 'styles/reset';
@import 'styles/config';

body {
  font-size: 16px;
  background: $bg-color;
}

@font-face {
  font-family: 'Flaco-Mono';
  src: url('./assets/fonts/fl-mono.woff') format('woff'); /* Pretty Modern Browsers */
}

// @font-face {
//   font-family: 'DIN-Regular';
//   src: url('./assets/fonts/DINNextLTPro-Regular.woff') format('woff'); /* Pretty Modern Browsers */
// }

// @font-face {
//   font-family: 'DIN-Medium';
//   src: url('./assets/fonts/DINNextLTPro-Medium.woff') format('woff'); /* Pretty Modern Browsers */
// }

* {
  box-sizing: border-box;
}

#app {
  margin: 3rem;
  display: block;
  // background: #333;
  border: 1px solid $steunkleur;
  // transform: rotateX(60deg) rotateY(0deg) rotateZ(-45deg);
}

.app__box--left, .app__box--right {
  width: 3rem;
  height: 3rem;
  position: absolute;
  margin-left: -3rem;
  margin-top: -3rem;
  border-bottom: 1px solid $steunkleur;
  border-right: 1px solid $steunkleur;
}

.app__box--right {
  right: 0rem;
  border-left: 1px solid $steunkleur;
  border-right: none;
}

.chart__dots {
  position: absolute;
  z-index: 10;
  margin-left: -101px;
}

circle {
  filter: drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7));
}
</style>
