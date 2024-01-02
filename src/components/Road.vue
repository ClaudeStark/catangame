<template>
    <svg id="Ebene_2" data-name="Ebene 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80.19 23">
        <g id="Layer_1" data-name="Layer 1">
            <rect id="huhu" width="80.19" height="23" :style="{ 'fill': props.color, 'stroke-width': '0px' }" />
        </g>
    </svg>
</template>

<script setup>
// Props definieren
const props = defineProps({
    color: String
})

</script>