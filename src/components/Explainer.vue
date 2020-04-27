<template>
  <div 
    class="explainer__container"
    :ref="id"
    v-bind:style="{ 
      marginTop: topPos + 'px',
      marginLeft: leftPos  + 'px',
      width: containerWidth + 'px'
    }"
    >
    <v-sprite 
      :id="'sprite'"
      :spritesheet="require('../assets/sprites/' + spriteName + '.png')"
      :json="require('../assets/sprites/' + spriteName + '.json')"
      :yoyo="false"
      :fps="10"
      ref="sprite"
    ></v-sprite>
  </div>
</template>

<script>
import anime from 'animejs';
import shortid from 'shortid';

  export default {
    name: 'Explainer',
    props: {
      topPos: {
        // type: Number,
        default: 0
      },
      leftPos: {
        // type: Number,
        default: 0
      },
      containerWidth: {
        // type: Number,
        default: 0
      },
      spriteName: {
        // type: String,
        default: ""
      }
    },
    data() {
      return {
        id: shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@')
      }
    },
    mounted () {
      anime({
          targets: this.$refs[this.id],
          opacity: 1,
          duration: 2000,
          translateY: [10, 0],
          easing: 'easeInOutCubic'
      });
    }
}
</script>

<style lang="scss" scoped>
.explainer__container {
  position: absolute;
  z-index: 1000000;
  opacity: 0;
}

</style>