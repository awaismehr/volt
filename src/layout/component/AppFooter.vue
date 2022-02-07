<template>
	<!-- <div class="layout-footer">
		powered by SunAlgo Volt Engine v1.3
	</div> -->
	<div></div>
</template>

<script>
	export default {
		name: "AppFooter",
		computed: {
			darkTheme() {
				return this.$appState.theme.startsWith('saga');
			}
		}
	}
</script>

<style scoped>

</style>