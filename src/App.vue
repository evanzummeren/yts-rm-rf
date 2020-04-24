<template>
  <div id="app" ref="container" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="100">
  
    <SingleVideo/>
    <h2 class="date" ref="dateElem">{{day}}</h2> 
    <h2 class="month">{{month}}</h2> 
    <h2 class="year">{{year}}</h2>

    <div class="app__box--left"></div>
    <div class="app__box--right"></div>
    <GridVertical/>
    <GridHorizontal ref="horizontalGrid"/>
  </div>
</template>

<script>
import GridVertical from './components/GridVertical.vue';
import GridHorizontal from './components/GridHorizontal.vue';
import SingleVideo from './components/SingleVideo.vue';

/* Libs */
import moment from 'moment';
import anime from 'animejs';
import infiniteScroll from 'vue-infinite-scroll';
import scrollama from "scrollama";

export default {
  name: 'App',
  directives: {infiniteScroll},
  components: {
    GridVertical, GridHorizontal, SingleVideo
  },
  data() {
    return {
      day: 29,
      month: '',
      year: 2020,
      data: [],
      busy: false
    }
  },
  methods: {
    loadMore: function() {
      this.busy = true;


      setTimeout(() => {
        this.$refs.horizontalGrid.reachBottomAddDays();
        this.busy = false;
      }, 1000);
    },
    ordinal(d) {
      if (d > 3 && d < 21)  {
        this.day = `${d}th`;
      }
      switch (d % 10) {
        case 1:  return this.day = `${d}st`;
        case 2:  return this.day = `${d}nd`;
        case 3:  return this.day = `${d}rd`;
        default: return this.day = `${d}th`;
      }
    },
    monthString(d) {
      const month = d.toLocaleString('en', { month: 'long' });
      this.month = month;
    },
    setDates(d) {
      this.monthString(d);
      this.ordinal(d.getDate());
      this.year = d.getFullYear();

      anime({
        targets: this.$refs.dateElem,
        opacity: [.1, .3, .2],
        duration: 500,
        delay: anime.stagger(200, {direction: 'reverse'}),
        easing: 'easeInOutCubic'
      });

      // this.$refs.dateElem.style.mixBlendMode = "color-burn"
    },
    gridScroll(scrollPos, closest, duration) {
      let startTime;
      let onAnimationCompleteCallback;
      
      function repeatOften(timestamp) {
        const timePassed = timestamp - startTime;

        // https://github.com/component/ease/blob/master/index.js
        function ease(n) {
          return .5 * (1 - Math.cos(Math.PI * n));
        }

        if (timePassed < duration) {
          let p = (timestamp - startTime) / duration;
          let val = ease(p);

          document.documentElement.scrollTop = closest + ((scrollPos - closest) * (1 - val));

          requestAnimationFrame(repeatOften);
        } else if (onAnimationCompleteCallback) {
          onAnimationCompleteCallback();
        }
      }

      requestAnimationFrame((timestamp) => {
        startTime = timestamp;
        repeatOften(timestamp);
      });
    },
    scrollSpy() {

      this.$nextTick(() => {
      const scroller = scrollama();

      scroller
      .setup({
        step: ".time",
        debug: true
      })
      .onStepEnter((response) => {
        console.log('bla')
        console.log(response);
        // { element, index, direction }
      })
      // .onStepExit(response => {
      //   // { element, index, direction }
      // });

      window.addEventListener("resize", scroller.resize);
      })

    }
  },
  mounted () {

    this.scrollSpy();

    let d = moment().toDate();
    this.setDates(d);

    let arr = []

    for (let i = 0; i<100; i++) {
      arr.push(i*48);
    }

    let _this = this;
    let timer;

    document.addEventListener("scroll", function() {

    clearTimeout(timer);
      timer = setTimeout(function () {
        console.log('Snap to grid')
        let scrollPos = document.documentElement.scrollTop;
        let closest = arr.sort( (a, b) => Math.abs(scrollPos - a) - Math.abs(scrollPos - b) )[0];
        let pixels = closest - scrollPos;

        console.log(pixels);

        _this.gridScroll(scrollPos, closest, 300);
      }, 100);  
    });

    var i = 1;

    setInterval(() => {
      d = moment().add(i + 100, 'days').toDate();
      this.setDates(d);
      i++
    }, 4000)

    this.monthString(d);
    this.ordinal(d.getDate());
    this.year = d.getFullYear();



      /**
       * custom easing function
       * [default: easeInOutQuad]
       * for reference: https://gist.github.com/gre/1650294
       * @param t normalized time typically in the range [0, 1]
       **/
      // easing:  t => t<.5 ? 2*t*t : -1+(4-2*t)*t,
 

  
    }

 
  
}
</script>

<style lang="scss">
@import 'styles/reset';
@import 'styles/config';

body {
  font-size: 16px;
  scroll-behavior: smooth;
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

h2 {
  position: fixed;
  font-family: 'Flaco-Mono';
  font-size: 12rem;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  background-image: url('./assets/frames.jpg');
  opacity: .2;
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
  mix-blend-mode: overlay;
}

.date {
  right: -2rem;
  margin-top: 17.5rem;
  // mix-blend-mode: exclusion;
}

.month {
  left: -2rem;
  margin-top: 26.5rem;
  // text-transform: uppercase;
}

.year {
  right: -2rem;
  margin-top: 35.5rem;
}
</style>
