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
      currentDate: {},
      day: 29,
      month: '',
      year: 2020,
      data: [],
      busy: false,
      scroller: {}
    }
  },
  beforeMount() {
    let d = moment().toDate();
    this.currentDate = d;
    this.setDates();
  },
  mounted () {
    // init scrollspy
    this.scrollSpy();

    // set initial dates
    let d = moment().toDate();
    this.setDates(d);

    let _this = this;
    let timer;

    document.addEventListener("scroll", function() {
      clearTimeout(timer);
        timer = setTimeout(function () {
          let scrollPos = document.documentElement.scrollTop;
          let roundedScrollPos = Math.round(scrollPos/48) * 48;

          _this.gridScroll(scrollPos, roundedScrollPos, 300);
        }, 100);  
    });
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
    setDates() {
      let d = this.currentDate;

      console.log(d);

      this.month = moment(d).format('MMMM');
      this.ordinal(moment(d).date());
      this.year = moment(d).format('YYYY');

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
      let _this = this;
      this.$nextTick(() => {
        _this.scroller = scrollama();

        _this.scroller
        .setup({
          step: ".time",
          debug: false
        })
        .onStepEnter((response) => {
          if(response.direction === "down") {
            this.currentDate = response.element.dataset.step;
            this.setDates();
          }

          if(response.direction === "up") {
            this.currentDate = moment(response.element.dataset.step).add(1, 'days');
            this.setDates();
          }
        })

        window.addEventListener("resize", _this.scroller.resize);
      })

    }
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
