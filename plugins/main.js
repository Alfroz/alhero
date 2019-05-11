import Vue from 'vue'
import { mapState, mapActions, mapGetters } from 'vuex'

const authMixin = {
	computed: {
		...mapState('user', [
			'uid',
			'user'
			]),
		...mapGetters('user', [
			'isAuthenticated'
			])
	},
	methods: {
		...mapActions('user', [
			'login', 'logout'
			])
	}
}

Vue.mixin(authMixin);