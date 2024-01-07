<template>
    <div class="handCard" @mousedown="handleMouseDown" @touchstart="handleMouseDown">
        <img :src="'/images/resources_vertical/card_' + cardType + '.svg'" alt="card_development" draggable="false">
        <div id="amount">
            {{card.amount}}
        </div>
    </div>
</template>

<script setup>

//Vue importieren
import { ref, computed, onMounted} from 'vue';

// Store importieren
import { useStore } from 'vuex';
const store = useStore();

// Props definieren
const props = defineProps({
    card: Object
})


// Computed
let cardType = computed(() => {
    return store.state.STOREitemTypes.find(item => item.item_type_id === props.card.resourceCardItemTypeId).name
})

// Methods
const handleMouseDown = () => {
    if(props.card.amount > 0){
        store.commit('STOREsetDraggedCard', props.card.resourceCardItemTypeId)
    }
}
</script>


<style>
.handCard {
    width: 15vw;
    flex-shrink: 0;
    position: relative;
}

#amount{
    position: absolute;
    bottom: 10%;
    left: calc(50% - 2vw);
    background-color: white;
    border-radius: 50%;
    width: 4vw;
    height: 4vw;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2.5vw;
    font-weight: bold;
    color: black; 
}
</style>