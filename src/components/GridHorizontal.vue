<template>
  <div class="grid__horizontalcontainer">
    <div v-for="index in clock" :key="generateID() + index" class="grid__horizontal">
      <span ref="timenumber" :class="{ 'time' : index === '0:00'}" :data-step="index">{{ index }}</span>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash';
  import anime from 'animejs';
  import uuidv4 from 'uuid/v4';

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

      this.clock = this.clock.concat(this.addDay());
      this.clock = this.clock.concat(this.addDay());
      this.mountedAnimation();
      console.log(this.clock);
    },
    methods: {
      generateID() {
        return uuidv4()
      },
      addDay() {
        let array = [];
        [...Array(24).keys()].forEach((i) => {
          array.push(`${i}:00`);
        })

        return _.reverse(array);
      },
      reachBottomAddDays() {
        console.log('trigger reach bottom add days')
        this.clock = this.clock.concat(this.addDay());
        let timeLabels = this.$refs.timenumber;

        this.$nextTick(() => {
          console.log(timeLabels.length);
          let newLabels = []

          for (let i = 0; i < timeLabels.length - 24; i++) {
            timeLabels[i].style.opacity = 1;
          }

          for (let i = timeLabels.length - 24; i < timeLabels.length; i++) {
            newLabels.push(timeLabels[i]);
          }

          anime({
            targets: newLabels,
            opacity: 1,
            duration: 1000,
            delay: anime.stagger(20, {direction: 'reverse'}),
            easing: 'easeInOutCubic'
          });
        })
      },
      mountedAnimation() {
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
  scroll-snap-align: start;
  // border-top: 1px solid orange;
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