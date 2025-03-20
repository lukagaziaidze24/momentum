import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import helper from './helper'
import Multiselect from '@vueform/multiselect'
import { Field, Form, ErrorMessage } from 'vee-validate';

let momentumApp = createApp(App);

momentumApp.component("Field", Field);
momentumApp.component("Form", Form);
momentumApp.component("ErrorMessage", ErrorMessage);
momentumApp.component("Multiselect", Multiselect);
momentumApp.config.globalProperties.$helper = helper;
momentumApp.use(store).use(router).mount('#app');

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.js"
import "@/assets/css/reset.css";
import "@/assets/css/fonts.css";
import "@/assets/css/base.scss";
import "@vueform/multiselect/themes/default.css"

