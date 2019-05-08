<template>
	<v-container
	fill-height
	>
	<v-card
	class="elevation-8"
	color="accent"
	width="500px"
	>
		<v-card-title
		primary-title
		class="title"
		>
			<span
			class="pb-2"
			style="border-bottom: 3px solid;
			border-image: linear-gradient(to right, rgb(0, 210, 255, .8), rgb(58, 123, 213, .8));
			border-image-slice: 1"
			>
			LOGIN	
			</span>
		</v-card-title>
		<v-card-text>
			<v-form
			ref="form"
			v-model="valid"
			lazy-validation
			>
				<v-text-field
				prepend-icon="person"
				name="email"
				type="email"
				v-model="email"
				:rules="emailRules"
				validate-on-blur
				required>
			    </v-text-field>

			    <v-text-field
			    prepend-icon="lock"
			    name="password"
			    label="password"
			    id="password"
			    validate-on-blur
			    required
			    v-model="password"
			    :rules="passwordRules"
			    :append-icon="showPassword ? 'visibility' : 'visibility_off' "
			    :type="showPassword ? 'text' : 'password' "
			    @click.append="showPassword = !showPassword"
			    ></v-text-field>
			</v-form>
		</v-card-text>
		<v-card-actions
		class="pt-3"
		>
			<v-spacer></v-spacer>
			<v-btn
			:loading="buttonLoader"
			color="primary"
			:disabled="!valid"
			@click="submit(); buttonLoader = true">
		       LOGIN
	        </v-btn>
		</v-card-actions>
	</v-card>
</v-container>
</template>

<script>
import { auth, GoogleProvider} from '~/plugins/firebase.js'
export default {
	name: "LOGIN",
	middleware: ['handle-login-route'],
	data()  {
		return {
			prevRoute: null,
			valid: false,
			buttonLoader: false,
			showPassword: false,
			email: '',
			password: '',
			emailRules: [
			v => !!v || 'E-mail is required',
			v => /.+@.+/.test(v) || 'Email must be valid'
			],
			passwordRules: [
			v => !!v || 'Password is Required',
			v => v.length >= 6 || 'Password must be greater than 6 characters'
			]
		}
	},
	methods: {
		submit() {
			if (this.$refs.form.validate()) {
				
				 auth.signInWithEmailAndPassword(
					this.email,
					this.password )
				.then((FirebaseUser) => {
					const snackbar = {
						color: 'primary',
						type: 'success',
						message: 'Login Success'
					}
					console.info('firebase.user' + FirebaseUser.user)
					this.$store.dispatch('snackbar/addSnackbar', snackbar)
					this.$store.dispatch('user/login', FirebaseUser.user)
					this.$router.push('/')
					this.buttonLoader = false;
				})
				.catch((e) => {
					const snackbar = {
						type: 'error',
						message: 'Login error:' + e.message
					}
					this.$store.dispatch('snackbar/addSnackbar', snackbar)
					
					this.buttonLoader = false;
				})
			}
		}
	}
}
</script>