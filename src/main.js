import Vue from 'vue'
import Vue2Filters from 'vue2-filters'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import d11Rest from './mixins/d11Rest'
import helpers from './mixins/helpers'

import '@/scss/d11.scss'

Vue.config.productionTip = false

Vue.component('D11Header', () => import('@/components/D11Header'))
Vue.component('D11Image', () => import('@/components/image/D11Image'))
Vue.component('TeamImage', () => import('@/components/image/TeamImage'))
Vue.component('D11TeamImage', () => import('@/components/image/D11TeamImage'))
Vue.component('PlayerImage', () => import('@/components/image/PlayerImage'))

Vue.component('HeaderSection', () => import('@/components/header/HeaderSection'))
Vue.component('BackgroundPicture', () => import('@/components/header/BackgroundPicture'))
Vue.component('HeaderNavigation', () => import('@/components/header/HeaderNavigation'))
Vue.component('HeaderContext', () => import('@/components/header/HeaderContext'))
Vue.component('HeaderSpacer', () => import('@/components/header/HeaderSpacer'))
Vue.component('HeaderContent', () => import('@/components/header/HeaderContent'))
Vue.component('HeaderContentBackground', () => import('@/components/header/HeaderContentBackground'))
Vue.component('ContentSection', () => import('@/components/ContentSection'))

Vue.use(Vue2Filters)
Vue.use(require('vue-moment'))

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

Vue.mixin(d11Rest)
Vue.mixin(helpers)
