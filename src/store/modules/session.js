import Firebase from 'firebase'

export const sessionModule = {
  namespaced: true,
  state: {
    user: null,
    loading: false
  },
  getters: {
    activeLogin(state) {
      return !!state.user
    }
  },
  mutations: {
    SET_USER(state, newUser) {
      state.user = newUser
    },
    SET_LOADING(state, newLoading) {
      state.loading = newLoading
    }
  },
  actions: {
    async subscribeToAuthStateChange({ commit }) {
      Firebase.auth().onAuthStateChanged((user) => {
        commit('SET_USER', user)
      })
    },
    async signInWithEmailAndPassword({ commit }, credentials) {
      commit('SET_LOADING', true)
      try {
        await Firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
      } catch (e) {
        console.error('Non-Authorized', e)
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async createUserWithEmailAndPassword({ commit }, newUser) {
      commit('SET_LOADING', true)
      try {
        await Firebase.firestore().createUserWithEmailAndPassword(newUser.email, newUser.password)
        // await Firebase.firestore().collection('users').doc(newUser.email).set({
        //     name: '',
        //     lastName: '',
        //     birthDate: '',
        //     phoneNumber: '',
        //     role: 'user'
        // });
      } catch (e) {
        console.error('There is a problem. Please try again.', e)
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async signOut({ commit }) {
      commit('SET_LOADING', true)
      try {
        await Firebase.auth().signOut();
      } catch (e) {
        console.error('There is an error in the sign out', e)
      } finally {
        commit('SET_LOADING', false)
      }
    },
  }
}
