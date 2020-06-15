import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import d11Rest from './mixins/d11Rest'
import helpers from './mixins/helpers'

import '@/scss/d11.scss'

Vue.config.productionTip = false

Vue.component('D11Header', () => import('@/components/D11Header'))
Vue.component('D11Image', () => import('@/components/D11Image'))
Vue.component('TeamImage', () => import('@/components/TeamImage'))
Vue.component('PlayerImage', () => import('@/components/PlayerImage'))

Vue.use(require('vue-moment'))

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

Vue.mixin(d11Rest)
Vue.mixin(helpers)
