<template>
    <svg id="Ebene_2" data-name="Ebene 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35.08 63">
        <g id="Layer_1" data-name="Layer 1">
            <path
                d="M33.21,18.83c1.19-1.76,1.88-3.73,1.88-5.83,0-7.18-7.84-13-17.5-13S.08,5.82.08,13c0,2.22.75,4.31,2.08,6.14L0,49.24h.14c-.02.26-.05.5-.05.76,0,7.18,7.84,13,17.5,13s17.5-5.82,17.5-13c0-.63-.08-1.24-.2-1.84l-1.68-29.33Z"
                :style="{ 'fill': props.color, 'stroke-width': '0px' }" />
        </g>
    </svg>
</template>

<script setup>
// Props definieren
const props = defineProps({
    color: String
})

</script>