<template>
	<div name="offline-map" id="offline">
        <div class="overlay" />
        <div id="map_screenshot" />
        <div class="dialog">        
            <h6>В данный момент игра не происходит</h6>
        </div>
	</div>
</template>

<script>
	export default {
		name: "offline-map",
		data () {
			return {
				count: 0,
			}
			
		}
	}
</script>
