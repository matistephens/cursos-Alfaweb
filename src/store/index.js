import Vue from 'vue'
import Vuex from 'vuex'

import {sessionModule as session} from '@/store/modules/session'
import {coursesModule as courses} from '@/store/modules/courses'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    session,
    courses
  }
})
