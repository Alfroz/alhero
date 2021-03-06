import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'


   // Initialize Firebase
  const config = {
    apiKey: "AIzaSyA9ZLksXlLGpED31flJ7nqdfhvNkg5R0GM",
    authDomain: "alhero-x.firebaseapp.com",
    databaseURL: "https://alhero-x.firebaseio.com",
    projectId: "alhero-x",
    storageBucket: "alhero-x.appspot.com",
    messagingSenderId: "303753755152"
  };
  
 
  if (!firebase.apps.length) { 
    firebase.initializeApp(config) 
    firebase.firestore().enablePersistence()
      .catch(function(err) {
        if (err.code == 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
        } else if (err.code == 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
        }
      });
  }
  
 export const firestore = firebase.firestore();
 export const auth = firebase.auth();
 export const storage = firebase.storage();
 export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
 
 const firebasePlugin = {

  install() {
    if (Vue.__nuxt_firebase_installed__) {
      return
    }
    Vue.__nuxt_firebase_installed__ = true

    if (!Vue.prototype.$DB) {
      Vue.prototype.$firestore = firestore
      Vue.prototype.$auth = auth
      Vue.prototype.$storage = storage
    }
  }
}

Vue.use(firebasePlugin)

export default (ctx) => {
  const { app, store } = ctx

  app.$firestore = Vue.prototype.$firestore
  ctx.$firestore = Vue.prototype.$firestore

  app.$auth = Vue.prototype.$auth
  ctx.$auth = Vue.prototype.$auth

  app.$storage = Vue.prototype.$storage
  ctx.$storage = Vue.prototype.$storage

  if (store) {
    store.$firestore = Vue.prototype.$firestore
    store.$AUTH = Vue.prototype.$auth
    store.$storage = Vue.prototype.$storage
  }
}