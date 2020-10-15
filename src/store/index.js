import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedFilter: ''
  },
  mutations: {
    filter (state, category) {
      state.selectedFilter = category
    }
  },
  actions: {
  },
  modules: {
  }
})
