<template>
	<div>
		<v-container
      	  class="px-5 ml-2"
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
      style: String,
      items: Array,
    }
  },

}
</script>
