<template>
	<div>
		<v-container
      	  class="px-5"
		  :tag="data.style === 'ordered' ? 'ol' : 'ul' ">
		  <li v-for="(item, i) in data.items"> {{ item }} </li>
		</v-container>
    </div>
</template>

<script>
export default {
	name: 'BlockList',

  props: {
    data: {
      type: Object,
      require: true
    }
  },

}
</script>
