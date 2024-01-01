<template>
    <!-- <section class="bankItem" @mousedown="$emit('emitMainItem', {mainItemId, position, mainItemType})" >
        <p>MainItem: {{ mainItemType }} | {{ position }} | {{ mainItemId }}</p>
    </section> -->
    <div ref="item" class="bankItem">
        <img :src="`/images/resources_vertical/card_${currentItemName}.svg`" alt="">
    </div>
</template>

<script setup>

// Vue importieren
import { ref, computed, onMounted } from 'vue';

// Store importieren
import { useStore } from 'vuex';
const store = useStore();

// Props definieren
const props = defineProps({
    ownPlayedItem: Object,
})

// DOM Elemente
const item = ref(null)

// Computed

// String, welcher den Namen des aktuellen Items enthält
// --> Änderung von STOREitemTypes und ownPlayedItem
const currentItemName = computed(() => {
    if (store.state.STOREitemTypes.length === 0) return null
     return store.state.STOREitemTypes.find(item => item.item_type_id === props.ownPlayedItem.id_item_type)?.name
})

// Methoden


///////////////////////////////////// ONMOUNT ////////////////////////////////

onMounted(() => {
   item.value.id = props.ownPlayedItem.rel_player_item_played_id;
   item.value.dataset.idItemType = props.ownPlayedItem.id_item_type;
})

///////////////////////////////////// Ende ONMOUNT ////////////////////////////////



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

<style scoped>
.bankItem {
    height: 100%;

}

img {
    width: 100%;
    height: 100%;
}
</style>