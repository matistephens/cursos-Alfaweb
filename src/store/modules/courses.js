import Firebase from 'firebase'

export const coursesModule = {
  namespaced: true,
  state: {
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
    totalSeats(state) {
      return state.list.reduce((accumulator, list) => {
        accumulator += parseInt(list.seats)
        return accumulator
      }, 0)
    },

    totalSeatsUsed(state) {
      return state.list.reduce((accumulator, list) => {
        accumulator += parseInt(list.seatsUsed)
        return accumulator
      }, 0)
    },

    seatsAvailable(state, getters) {
      return getters.totalSeats - getters.totalSeatsUsed
    },

    coursesEnded(state) {
      return state.list.reduce((accumulator, list) => {
        if (list.status === 'Si') accumulator++
        return accumulator
      }, 0)
    },

    totalActiveCourses(state) {
      return state.list.reduce((accumulator, list) => {
        if (list.status === 'No') accumulator++
        return accumulator
      }, 0)
    }
  },
  actions: {
    async getAll({ commit }) {
      commit('SET_LOADING', true)
      try {
        const courses = []
        const coursesCollection = await Firebase.firestore().collection('courses').get()
        coursesCollection.forEach((doc) => {
          courses.push({ ...doc.data(), id: doc.id })
        })
        commit('SET_LIST', courses)
      } catch (e) {
        console.error('Error al traer Usuarios de Firebase', e)
      } finally {
        commit('SET_LOADING', false)
      }
    }
  }
}
