<template>
  <v-img
  :src="srcUrl"
  v-bind="$attrs"
  />
</template>

<script>
  export default {
    props: {
      src: String
    },
    data() {
      return {
        placeHolder: '/images/ph.png',
        observer: null,
        intersected: false,
      }
    },

    computed: {
      srcUrl() {
        return this.intersected ? this.src : this.placeHolder;
      }
    },

    mounted() {
      this.observer = new IntersectionObserver(entries => {
        const image = entries[0];

        if (image.isIntersecting) {
          this.intersected = true;
          this.observer.disconnect();
        }
      });
      this.observer.observe(this.$el);
    },
    destroyed() {
      this.observer.disconnect();
    }
  }
</script>