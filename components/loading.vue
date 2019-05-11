<template>
	<div v-if="loading" id="progress"><div class="bar" role="bar" style="transform: translate3d(-0.6%, 0px, 0px); transition: all 200ms ease 0s;"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div></div>
</template>

<script>
export default {
	data: () => ({
			loading: false
	}),

	methods: {
		start () {
			this.loading = true
		},
		finish () {
			this.loading = false
		}
	}
}	
</script>


<style scoped>
/* Make clicks pass-through */
#progress {
  pointer-events: none;
}

#progress .bar {
  background: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
  position: fixed;
  z-index: 1031;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
}

/* Fancy blur effect */
#progress .peg {
  display: block;
  position: absolute;
  right: 0px;
  width: 100px;
  height: 100%;
  box-shadow: 0 0 10px #84fab0, 0 0 5px #8fd3f4;
  opacity: 1.0;
  
  -webkit-transform: rotate(3deg) translate(0px, -4px);
  -ms-transform: rotate(3deg) translate(0px, -4px);
  transform: rotate(3deg) translate(0px, -4px);
}

/* Remove these to get rid of the spinner */
#progress .spinner {
  display: block;
  position: fixed;
  z-index: 1031;
  bottom: 5%;
  right: 5%;
}

#progress .spinner-icon {
  width: 20px;
  height: 20px;
  box-sizing: border-box;
  border: solid 3px transparent;
  border-top-color: #8fd3f4;
  border-left-color: #8fd3f4;
  border-radius: 50%;
  
  -webkit-animation: progress-spinner 400ms linear infinite;
  animation: progress-spinner 400ms linear infinite;
}

.progress-custom-parent {
  overflow: hidden;
  position: relative;
}

.progress-custom-parent #progress .spinner,
.progress-custom-parent #progress .bar {
  position: absolute;
}

@-webkit-keyframes progress-spinner {
  0%   { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}
@keyframes progress-spinner {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}


</style>