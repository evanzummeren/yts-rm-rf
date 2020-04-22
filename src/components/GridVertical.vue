<template>
  <div class="grid__verticalcontainer">
    <div v-for="index in 30" :key="index" class="grid__vertical">
    </div>
  </div>
</template>

<script>

  export default {
    name: "GridVertical"
  }
</script>

<style lang="scss" scoped>
@import '../styles/config';

.grid__verticalcontainer {
  display: flex;
  justify-content: flex-start;
  grid-template-columns: 3rem;
  position: fixed;
  margin-top: -3rem;
}

.grid__vertical {
  justify-self: start;
  width: 3rem;
  height: 100vh;
  // background: orange;
  border-right: 1px dotted $lines-off;
  animation: fadein 1.5s;
}

.grid__vertical:nth-child(3n) {
  border-right: 1px solid $lines;
  animation: none;
}

@keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}
</style>
