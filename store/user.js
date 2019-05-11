import { auth } from '~/plugins/firebase'
import Cookies from 'js-cookie'

export const state = () => ({
  uid: null,
  user: null
})

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

export const actions = {

  async login({dispatch, state}, user) {
    console.log('[STORE ACTIONS] - login')
    console.log('[STORE ACTIONS USER]'+ JSON.stringify(user.uid))
    const token = await auth.currentUser.getIdToken(true)
    console.log('[STORE ACTIONS Token]'+ token)
    const userInfo = {
      name: user.displayName,
      email: user.email,
      avatar: user.photoURL,
      uid: user.uid
    }

    Cookies.set('access_token', token) // saving token in cookie for server rendering
    await dispatch('setUSER', userInfo)
    await dispatch('saveUID', userInfo.uid)
    console.log('[STORE ACTIONS] - in login, response:', status)

  },

  async logout({commit, dispatch}) {
    console.log('[STORE ACTIONS] - logout')
    await auth.signOut()

    Cookies.remove('access_token');
    commit('SET_USER', null)
    commit('SAVE_UID', null)
  },

  saveUID({commit}, uid) {
    console.log('[STORE ACTIONS] - saveUID')
    commit('SAVE_UID', uid)
  },

  setUSER({commit}, user) {
    commit('SET_USER', user)

  }

}

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
