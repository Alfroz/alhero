<script>
export default {
	middleware:['authenticated'],
	beforeRouteEnter (to, from, next) {
    next(vm => {
    // access to component instance via `vm`
		  return vm.logout()
		  .then(() => {
			  const snackbar = {
				  message: 'Logout',
				  type: 'info'
			  }
			  vm.$store.dispatch('addSnackbar', snackbar)
			  vm.$router.push('/');
		  })
		  .catch(() => {
			  console.error('Error Logout');
			  vm.$router.back('/');
		  })    
    })
  }
}
</script>
<template>
</template>