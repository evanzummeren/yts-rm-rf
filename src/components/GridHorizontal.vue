<template>
  <div class="grid__horizontalcontainer">
    <div v-for="index in clock" :key="index" class="grid__horizontal">
      <span ref="timenumber">{{ index }}</span>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash';
  import anime from 'animejs';

  export default {
    name: "GridHorizontal",
    data() {
      return {
        clock: []
      }
    },
    mounted () {
      let currentDateTime = new Date();
      let formattedHour = currentDateTime.getHours()
      let array = []

      for(let i = 0; i <= formattedHour; i++) {
        array.push(`${i}:00`)
      }

      this.clock = _.reverse(array);
      this.mountedAnimation();
      console.log(this.clock);
    },
    methods: {
      mountedAnimation() {
        console.log('hmm')

console.log(this);
        this.$nextTick(() => {
          anime({
            targets: this.$refs.timenumber,
            opacity: 1,
            duration: 1000,
     delay: anime.stagger(20, {direction: 'reverse'}),
            easing: 'easeInOutCubic'
          });
        })

      }
    },
  }
</script>

<style lang="scss" scoped>
@import '../styles/config';

.grid__horizontalcontainer {
  justify-content: flex-start;
  margin-left: -3rem;
}

.grid__horizontal {
  justify-self: start;
  width: 100vw;
  height: 3rem;
  // background: orange;
  border-bottom: 1px dotted $lines-off;
  animation: fadein 3s;
}

.grid__horizontal:nth-child(3n) {
  border-bottom: 1px solid $lines;
  animation: none;
}

.grid__horizontal span {
  font-family: 'Flaco-mono';
  font-size: .75rem;
  width: 3rem;
  text-align: right;
  display: block;
  padding-right: .3rem;
  margin-top: 1.8rem;
  color: $lines;
  left: .9rem;
  background: #131521;
  position: absolute;
  height: 17px;
  padding-top: 3px;
  opacity: 0;
}

.grid__horizontal:nth-child(3n) span {
  color: $text-gray;
}

@keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

</style>