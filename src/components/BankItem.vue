<template>
    <!-- <section class="bankItem" @mousedown="$emit('emitMainItem', {mainItemId, position, mainItemType})" >
        <p>MainItem: {{ mainItemType }} | {{ position }} | {{ mainItemId }}</p>
    </section> -->
    <section class="bankItem">
        <img src="@/assets/card_classic_backPNG.png" alt="">
    </section>
</template>

<script setup>

// Vue importieren
import { ref, computed } from 'vue';

// Props definieren
const props = defineProps({

})

// const mainItemType = computed(() => {
//     if (props.currentItem != null && props.item_types != null) {
//              return props.item_types.find(arrayID => arrayID.item_type_id === props.currentItem.id_item_type)?.name
//     } else{
//         return null;
//     }
// })

// const mainItemId = computed(() => {
//     if (props.currentItem != null) {
//         return props.currentItem.rel_player_item_played_id
//     } else{
//         return null;
//     }
// })


// Emits definieren
// const emit = defineEmits(['emitMainItem'])

// const getRotation = () => {
//     switch(props.position) {
//         case 1:
//             return 'transform: rotate(180deg)'
//         case 2:
//             return 'transform: rotate(270deg)'
//         case 3:
//             return 'transform: rotate(0deg)'
//         case 4:
//             return 'transform: rotate(90deg)'
//     }
// }

</script>

<style>
.bankItem{
    height: 90%;
}

img{
    height: 100%;
}
</style>