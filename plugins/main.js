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

// Justinone vue-awesome
import FaIcon from 'vue-awesome/components/Icon'

Vue.component('v-faicon', FaIcon)
Vue.mixin(authMixin);