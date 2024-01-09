<template>
    <div id="road" class="road" :style="{ 'transform': 'rotate(' + props.rotation + 'deg)' }">
        <svg id="Ebene_2" data-name="Ebene 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80.19 23">
            <g id="innerRoad" data-name="Layer 1">
                <rect width="80.19" height="23" :style="{ 'fill': props.color, 'stroke-width': '0px' }" />
            </g>
        </svg>
    </div>
</template>

<script setup>
// Props definieren
const props = defineProps({
    color: String,
    rotation: Number
})

</script>

<style scoped>
#road {
    display: flex;
    justify-content: center;
}
</style>