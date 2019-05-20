import { auth } from '~/plugins/firebase'
import Cookies from 'js-cookie'

// =================================================
// State
// =================================================
export const state = () => ({
  uid: null,
  user: null
})

// =================================================
// Getters
// =================================================
export const getters = {

  uid(state) {
    if (state.user && state.user.uid) return state.user.uid
    else return null
  },

  user(state) {
    return state.user
  },

  isAuthenticated(state) {
    return !!state.user && !!state.user.uid
  }
}

// =================================================
// Actions
// =================================================
export const actions = {

  async login({dispatch, state}, user) {
    
    const token = await auth.currentUser.getIdToken(true)
    
    const userInfo = {
      name: user.displayName,
      email: user.email,
      avatar: user.photoURL,
      uid: user.uid
    }

    Cookies.set('access_token', token) // saving token in cookie for server rendering
    await dispatch('setUSER', userInfo)
    await dispatch('saveUID', userInfo.uid)
   
   if (process.env.NODE_ENV === 'development') {
    console.log('[STORE ACTIONS] - in login, response:', status);
    // console.log('[STORE ACTIONS Token]'+ token);
    // console.log('[STORE ACTIONS USER]'+ JSON.stringify(user.uid))
  }

  },

  async logout({commit, dispatch}) {
   // console.log('[STORE ACTIONS] - logout')
    await auth.signOut()

    Cookies.remove('access_token');
    commit('SET_USER', null)
    commit('SAVE_UID', null)
  },

  saveUID({commit}, uid) {
    commit('SAVE_UID', uid)
  },

  setUSER({commit}, user) {
    commit('SET_USER', user)

  }

}

// =================================================
// Mutations
// =================================================
export const mutations = {
  SAVE_UID (state, uid) {
    console.log('[STORE MUTATIONS] - SAVE_UID:', uid)
    state.uid = uid
  },
  SET_USER (state, user) {
    console.log('[STORE MUTATIONS] - SET_USER:', user)
    state.user = user
  }
}
