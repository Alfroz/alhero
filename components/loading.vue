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
  background: #29d;

  position: fixed;
  z-index: 1031;
  top: 0;
  left: 0;

  width: 100%;
  height: 2px;
}

/* Fancy blur effect */
#progress .peg {
  display: block;
  position: absolute;
  right: 0px;
  width: 100px;
  height: 100%;
  box-shadow: 0 0 10px #29d, 0 0 5px #29d;
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
  top: 15px;
  right: 15px;
}

#progress .spinner-icon {
  width: 18px;
  height: 18px;
  box-sizing: border-box;

  border: solid 2px transparent;
  border-top-color: #29d;
  border-left-color: #29d;
  border-radius: 50%;

  -webkit-animation: progress-spinner 400ms linear infinite;
          animation: progress-spinner 400ms linear infinite;
}

.nprogress-custom-parent {
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