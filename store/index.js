import {getUserFromCookie, getUserFromSession} from '@/helpers/firebaseAuth'
export const strict = false;

// =================================================
// State
// =================================================
export const state = () => ({
	snackbar: {}
})


// =================================================
// Actions
// =================================================
export const actions = {

  async nuxtServerInit ({ dispatch }, { req }) {
    const user = getUserFromCookie(req)
    if (user) {
      await dispatch('user/setUSER', { name: user.name, email: user.email, avatar: user.picture, uid: user.user_id})
      await dispatch('user/saveUID', user.user_id)
    }
  },

	addSnackbar({commit}, newSnackbar) {
	commit('SET_SNACKBAR', newSnackbar)
  },
}

// =================================================
// Mutations
// =================================================
export const mutations = {
	SET_SNACKBAR(state, newSnackbar) {
		state.snackbar = {},
		state.snackbar = newSnackbar
	},

}

// =================================================
// Getters
// =================================================

export const getters = {
	
}