<template>
    <div class="specialCard" @mousedown="handleMouseDown" @touchstart="handleMouseDown">
        <img :src="'/images/resources_vertical/card_' + cardType + '.svg'" alt="card_development" draggable="false">
    </div>
</template>

<script setup>

//Vue importieren
import { ref, computed, onMounted } from 'vue';

// Store importieren
import { useStore } from 'vuex';
const store = useStore();

// Props definieren
const props = defineProps({
    card: Object
})

// Computed
let cardType = computed(() => {
    return store.state.STOREitemTypes.find(item => item.item_type_id === props.card.specialCardItemTypeId).name

})

// Methods
const handleMouseDown = () => {
    store.commit('STOREsetDraggedCard', props.card.specialCardItemTypeId)

}


</script>

<style scoped>
.specialCard {
    width: 15vw;
    flex-shrink: 0;
}
</style>