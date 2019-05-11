import {getUserFromCookie, getUserFromSession} from '@/helpers/firebase'

export const state = () => ({
	snackbar: {}
})

export const actions = {

  async nuxtServerInit ({ dispatch }, { req }) {
    const user = getUserFromCookie(req)
    if (user) {
      await dispatch('user/setUSER', { name: user.name, email: user.email, avatar: user.picture, uid: user.user_id})
    }
  },

	addSnackbar({commit}, newSnackbar) {
	commit('SET_SNACKBAR', newSnackbar)
  },
}

export const mutations = {
	SET_SNACKBAR(state, newSnackbar) {
		state.snackbar = {},
		state.snackbar = newSnackbar
	},

}