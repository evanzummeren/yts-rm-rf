<template>
  <div>

    <transition 
      v-on:enter="enter">
    <Explainer 
      topPos=370
      leftPos=0
      containerWidth=230
      spriteName="yaxis"
      v-if="animation.yaxis" />
    </transition>

    <Explainer 
      topPos=200
      leftPos=400
      containerWidth=230
      spriteName="xaxis"
      v-if="animation.xaxis" />

  </div>
</template>

<script>
// import anime from 'animejs';
import Explainer from './components/Explainer.vue';

  export default {
    name: 'Tutorial',
    components: {
      Explainer,
    },
    data() {
      return {
        animation: {
          yaxis: false,
          xaxis: false
        }
      }
    },
    mounted () {
      let _this = this;
      setTimeout(() => {
        _this.animation.yaxis = true
      }, 500);
    },
    methods: {
      enter(el) {
        console.log(el);

      }
    },
  }
</script>

<style lang="scss" scoped>

</style>