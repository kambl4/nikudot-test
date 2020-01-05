// Old browsers support
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'intersection-observer';
// Components
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import VueSweetalert2 from 'vue-sweetalert2';
import BootstrapVue from 'bootstrap-vue';
import VueAutosize from 'vue-autosize';
// CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'sweetalert2/dist/sweetalert2.min.css';
// Fontawesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEdit, faCopy } from '@fortawesome/free-regular-svg-icons';
import { faTasks } from '@fortawesome/free-solid-svg-icons';
library.add(faEdit, faTasks, faCopy);

Vue.config.productionTip = false;
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(BootstrapVue);
Vue.use(VueSweetalert2);
Vue.use(VueAutosize);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});