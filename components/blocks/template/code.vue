<template>
	<v-container>
		<no-ssr>
		<v-hover>
			<v-card
			flat
			dark
			class="elevation-0"
			color="blue-grey darken-4"
			slot-scope="{ hover }">
			<v-slide-y-transition>
				<span v-if="copied" class="info--text text--lighten-4" style="position: absolute; right: 50%; top: 5px;z-index: 10">Copied</span>
            <v-btn
              v-if="hover"
              flat
              icon
              class="transition-fast-in-fast-out"
              style="position: absolute; right: 5px; top: 5px;z-index: 10"
              @click.stop.prevent="copyMarkup"
              >
              <v-icon class="white--text">far fa-copy</v-icon>
            </v-btn>
          </v-slide-y-transition>
				<v-card-text class="font-weight-thin">
				    <pre style="overflow:auto">{{ data.code }}</pre>
			    </v-card-text>
		    </v-card>
		</v-hover>
		<input type="hidden" id="codes" :value="data.code">
	</no-ssr>
	</v-container>	
</template>

<script>
export default {
	name: 'BlockCode',
	data() {
		return {
			copied: false
		}
	},

  props: {
    data: {
      code: String
    }
  },

  methods: {
  	copyMarkup () {
        const markup = this.$el.querySelector('pre')
        markup.setAttribute('contenteditable', 'true')
        markup.focus()
       // document.execCommand('selectAll', false, null)
        this.copied = document.execCommand('copy')
        markup.removeAttribute('contenteditable')
        setTimeout(() => { this.copied = false }, 2000)
      },
  },

}
</script>
