<template>
	<section>
	<v-list
	dense
	v-for="(route, i) in routes"
	:key="i + 'navbar_routes' "
	>
		<v-list-tile
		:to="{name: route.name}"
		>
			<v-list-tile-action>
				<v-icon>
					{{ route.icon }}
				</v-icon>
			</v-list-tile-action>
			<v-list-tile-content>
				<v-list-tile-title
				class="font-weight-light">
				  {{ route.title }}	
				</v-list-tile-title>
			</v-list-tile-content>
		</v-list-tile>
	</v-list>
</section>
</template>

<script>
	export default {
		name: 'NavBarRoutes',
	//	functional: true,
		props: {
			routes: {
				type: Array,
				reqired: true,
			}
		}
	}
</script>