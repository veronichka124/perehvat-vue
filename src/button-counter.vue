<template>
	<div name="button-counter">
		<button v-on:click="count++">
			Счётчик кликов — {{ count }}
		</button>
	</div>
</template>

<script>
	export default {
		name: "button-counter",
		data () {
			return {
				count: 0,
			}
			
		}
	}
</script>
