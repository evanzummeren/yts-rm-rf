<template>
  <div 
    class="container" 
    v-bind:style="{ height: videoDetails.timeUnits * 16 * 3 + 'px' }"
  >
    <div class="svg__element" ref="svg"></div>
    <!-- {{svgElem}} -->
    <div 
      class="video__frames"
      ref="frames"
      v-bind:style="{ backgroundPosition: bgPosition, marginTop: videoDetails.timeUnits * 16 * 3 + 'px' }">
    </div>
  </div>
</template>

<script>
import anime from 'animejs';
import SVG from 'rabbit-ear-svg';
import colors from '../colors.json';

  export default {
    name: 'singlevideo',
    data() {
      return {
        videoDetails: {
          timeUnits: 14,
          pixelsBlock: 3 * 16,
          chart: [0, 20, 30, 120, 140, 150, 200, 300, 400, 20000, 32000, 40000, 131300, 200000]
        },
        bgPosition: "0 0",
        row: 0,
        column: 0,
        svgElem: {},
        svgElemOverlay: {},
        linecolors: colors
      }
    },
    mounted () {
      this.bgPosition = "0px 0px"
      this.generateLineChart();
      // setInterval(() => { this.changeBgPosition(); }, 1000);

      anime({
        targets: this.$refs.frames,
        translateY: `-${this.videoDetails.timeUnits * 3 * 16}px`,
        height: [2*16, 4.2*16, 3.39*16],
        rotateX: [60,0],
        rotateY: [0, 0],
        // rotateZ: [-45, 0],
        elasticity: 800,
        duration: 1500,
        easing: 'easeInOutCubic'
      });

      //  transform: rotateX(60deg) rotateY(0deg) rotateZ(-45deg)

      anime({
        targets: 'line',
        opacity: 1,
        duration: 1500,
        delay: function(el, i) {
          return i * 100;
        },
        easing: 'easeInOutCubic'
      });

      anime({
        targets: 'circle',
        opacity: 1,
        translateX: [-20, 0],
        translateY: [20, 0],
        duration: 1200,
        delay: function(el, i) {
          return i * 100;
        },
        easing: 'easeInOutCubic'
      });


      anime({
        targets: 'polygon',
        opacity: 1,
        duration: 3000,
        easing: 'easeInOutCubic'
      });



    },
    methods: {
      changeBgPosition() {
        
        this.column++;
        this.bgPosition = `${this.column*94.8}px 0px`;
      },
      remap(value) {
        let { pixelsBlock, chart } = this.videoDetails;
        let low1 = 0;
        let high1 = chart[chart.length-1];
        let low2 = 0;
        let high2 = `${pixelsBlock * 2}`;
        return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
      },
      createShadow(chartLength) {
        console.log(chartLength);
        let defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');


        for (let i = 0; i < chartLength; i++){
          let filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
          let dropshadow = document.createElementNS('http://www.w3.org/2000/svg', 'feDropShadow');
          filter.setAttribute('id', `shadow${i}`);
          filter.setAttribute('x', `-10%`);
          filter.setAttribute('y', `-100%`);
          filter.setAttribute('width', `300%`);
          filter.setAttribute('height', `300%`);


          dropshadow.setAttribute('dx', '0');
          dropshadow.setAttribute('dy', '0');
          dropshadow.setAttribute('stdDeviation', '1');
          dropshadow.setAttribute('flood-color', this.linecolors.dot_shadow);
          dropshadow.setAttribute('flood-opacity', '.2');

          defs.append(filter);
          filter.append(dropshadow);
        }


        return defs;
      },
      createGradient() {
        let defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        let linearGradient= document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        linearGradient.setAttribute('id', 'grad1');
        linearGradient.setAttribute('x1', '0%');
        linearGradient.setAttribute('y1', '0%');
        linearGradient.setAttribute('x2', '100%');
        linearGradient.setAttribute('y2', '0%');

        let firstStop = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        firstStop.setAttribute('offset', '0%');
        firstStop.setAttribute('style', `stop-color:${this.linecolors.line};stop-opacity:0`);

        let secondStop = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        secondStop.setAttribute('offset', '100%');
        secondStop.setAttribute('style', `stop-color:${this.linecolors.line};stop-opacity:.3`);

        linearGradient.append(firstStop)
        linearGradient.append(secondStop)
        
        defs.append(linearGradient)

        return defs;
      },
      generateLineChart() {
        let { pixelsBlock, timeUnits, chart } = this.videoDetails;
        this.svgElem = SVG();
        this.svgElemOverlay = SVG();

        let cHeight =  pixelsBlock * timeUnits;

        this.svgElem.setAttribute("height", `${cHeight}px`);
        this.svgElem.setAttribute("width", `${pixelsBlock * 2}px`);
        this.svgElem.setAttribute("class", 'chart');

        this.svgElemOverlay.setAttribute("height", `${cHeight+ 20}px`);
        this.svgElemOverlay.setAttribute("width", `${pixelsBlock * 2 + 20}px`);   
        this.svgElemOverlay.setAttribute("class", "chart__dots");    

        this.svgElem.append(this.createGradient())
        this.svgElemOverlay.append(this.createShadow(chart.length))

        let arrayGradient = [];

        chart.forEach((d, i) => {
          if (i === chart.length -1 ) {
            arrayGradient.push(this.remap(d));
            arrayGradient.push(cHeight-(i*48));
          } else {
            arrayGradient.push(this.remap(d));
            arrayGradient.push(cHeight-(i*48));
            this.svgElem.line(this.remap(d), cHeight-(i*48), this.remap(chart[i+1]), cHeight-((i+1)*48))
            this.svgElemOverlay.circle(this.remap(d) + 5,  cHeight-(i*48), 4).fill(this.linecolors.dot).setAttribute("style", `filter: url(#shadow${i})`)

          }
        })

        this.svgElem.fill("none")
        .stroke(this.linecolors.line)
        .strokeWidth(1)

        arrayGradient.push(0);
        arrayGradient.push(48);


        this.svgElem
        .polygon(arrayGradient)
        .fill("url(#grad1)")
        .stroke(this.linecolors.line)
        .strokeWidth(0);

        this.$refs.svg.appendChild(this.svgElem)
        this.$refs.svg.appendChild(this.svgElemOverlay)
      }
    },

  }
</script>

<style lang="scss" scoped>
@import '../styles/config';

.container {
  position: absolute;
  z-index: 10;
  width: 6rem;
  margin-left: 3rem;
  margin-top: 6rem;
  // background: orange;
}

.video__frames {
  width: 6rem;
  height:2rem;
  background-image: url('../assets/frames.jpg');
  background-size: 948px 550px;
  // background-size: 948px 540px;
  filter: grayscale(100%);
    background-color: $second-steunkleur;
    background-blend-mode: multiply;
  // mix-blend-mode: multiply;
  opacity: 1;
   transform-style: preserve-3d;
}

.svg__element {
  position: absolute;
  z-index: 20;
}

</style>