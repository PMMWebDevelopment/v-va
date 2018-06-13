// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import 'babel-polyfill';
import VueResource from 'vue-resource';
import VueFire from 'vuefire';
import Vuex from 'vuex';
import 'es6-promise/auto';
import firebase from 'firebase';
import firebaseApp from './firebase';
import store from './store/store';
import App from './App';
import router from './router';

Vue.config.productionTip = false;

Vue.use(Vuetify);
Vue.use(VueResource);
Vue.use(VueFire);
Vue.use(Vuex);
Vue.use(firebaseApp);

let app;
firebase.auth().onAuthStateChanged(() => {
    if (!app) {
        app = new Vue({
            el: '#app',
            store,
            router,
            firebaseApp,
            components: { App },
            template: '<App/>'
        });
    }
});