import Vue from 'vue'
import App from './App.vue'
import VueSpriteAnimator from 'vue-sprite-animator'


Vue.config.productionTip = false

Vue.use(VueSpriteAnimator)

new Vue({
  render: h => h(App),
}).$mount('#app')

// if (process.env.NODE_ENV !== 'production') {
//   const VueAxe = require('vue-axe')
//   Vue.use(VueAxe, {
//     config: {
//       // ...
//       rules: [
//         { id: 'heading-order', enabled: false },
//         { id: 'label-title-only', enabled: true },
//         // and more
//       ]
//     }
//   })
// }