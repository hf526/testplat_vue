// index.js
import Vue from 'vue'
import Vuex from 'vuex'
import apistore from './apisotre'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    apistore: apistore
  }
})
