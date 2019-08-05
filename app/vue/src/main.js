import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/style.css'
import locale from 'element-ui/lib/locale/lang/en'
import './mock'
import Settings from './scenes/Settings'
import Options from './scenes/Options'
import Events from './scenes/Events'
import Test from './scenes/Test'
// import store from './store'
import vueCustomElement from 'vue-custom-element'

Vue.use(vueCustomElement)

Vue.config.productionTip = false
Vue.use(ElementUI, { locale })

Vue.customElement('lf-events-settings', Settings)
Vue.customElement('lf-event-options', Options)
Vue.customElement('lf-events', Events)
Vue.customElement('lf-test', Test)
_.noConflict()

// window.lf.init = () => {
//   window.lf.events = new Vue({
//     el: '.wp-admin',
//     store
//   })
// }

// window.lf.adminInit = () => {
//   window.lf.events = new Vue({
//     el: '.wp-admin',
//     store
//   })
// }