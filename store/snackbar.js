export const state = () => ({
	snackbar: {}
})

export const mutations = {
	SET_SNACKBAR(state, newSnackbar) {
		state.snackbar = {},
		state.snackbar = newSnackbar
	},

}

export const actions = {
	addSnackbar({commit}, newSnackbar) {
		commit('SET_SNACKBAR', newSnackbar)
	},

}

export const getters = {

}