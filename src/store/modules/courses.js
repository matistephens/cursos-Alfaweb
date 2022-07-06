import Firebase from 'firebase'

export const coursesModule = {
  namespaced: true,
  data: {
    list: [],
    loading: false
  },
  mutations: {
    SET_LIST(state, newList) {
      state.list = newList
    },
    SET_LOADING(state, newLoading) {
      state.loading = newLoading
    }
  },
  getters: {
    totalCourses(state) {
      return state.list.length
    },
  },
  actions: {
    async getAll({ commit }) {
      commit('SET_LOADING', true)
      try {
        const list = []
        const listCollection = await Firebase.firestore().collection('courses').get()

        listCollection.forEach((document) => {
          list.push({ ...document.data() })
        })
        commit('SET_LIST', list)
      } catch (e) {
        console.error('Error al traer usuarios de Firebase', e)
      } finally {
        commit('SET_LOADING', false)
      }
    }
  }
}
