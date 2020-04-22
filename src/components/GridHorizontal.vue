<template>
  <div class="grid__horizontalcontainer">
    <div v-for="index in clock" :key="index" class="grid__horizontal">
      <span>{{  index }}</span>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash';

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

      this.clock = _.reverse(array)
    console.log(this.clock);
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
}

.grid__horizontal:nth-child(3n) {
  border-bottom: 1px solid $lines;
}

.grid__horizontal span {
  font-family: 'Flaco-mono';
  font-size: .75rem;
  width: 3rem;
  text-align: right;
  display: block;
  padding-right: .3rem;
  padding-top: 2rem;
  color: $lines;
}

.grid__horizontal:nth-child(3n) span {
  color: $text-gray;
}


</style>