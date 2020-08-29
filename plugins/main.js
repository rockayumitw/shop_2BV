import Vue from 'vue'
// import axios from 'axios'
import 'swiper/css/swiper.css'
import 'sweetalert2/dist/sweetalert2.min.css'

import VueSweetalert2 from 'vue-sweetalert2'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueClipboard from 'vue-clipboard2'
import VueCookies from 'vue-cookies'
import VueSocialSharing from 'vue-social-sharing'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { IconsPlugin } from 'bootstrap-vue'
import currencyFilter from '../mixins/filter';

Vue.use(VueSweetalert2)
Vue.use(VueAwesomeSwiper)
Vue.use(VueClipboard)
Vue.use(VueCookies)
// Vue.use(AOS,{disable: "phone"})
Vue.use(VueSocialSharing)
Vue.use('font-awesome-icon', FontAwesomeIcon)
Vue.use(IconsPlugin)
Vue.filter('currency',currencyFilter);


Vue.config.productionTip = false
VueClipboard.config.autoSetContainer = true

// axios.defaults.withCredentials = true
