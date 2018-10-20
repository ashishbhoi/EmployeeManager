// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'materialize-css/dist/css/materialize.css'
import 'jquery/dist/jquery.js'
import 'materialize-css/dist/js/materialize.js'
import '@fortawesome/fontawesome-free/css/all.css'
import firebase from 'firebase/app'
import 'firebase/auth'
import './components/firebaseInit'

Vue.config.productionTip = false

let app;
firebase.auth().onAuthStateChanged(user => {
  if(!app) {
    app = new Vue({
      el: '#app',
      router,
      components: { App },
      template: '<App/>'
    })
    
  }
})