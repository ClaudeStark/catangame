<template>
    <div ref="boardItem" class="boardItem" :style="{ width: itemWidth + 'px', top: topPos, left: leftPos }">
        <Road v-if="itemType == 'road'" :color="color" :rotation="rotation"></Road>
        <Settlement v-if="itemType == 'settlement'" :color="color"></Settlement>
        <City v-if="itemType == 'city'" :color="color"></City>
        <Robber v-if="itemType == 'robber'"></Robber>
        
    </div>
</template>

<script setup>
// Vue importieren
import { ref, computed, onMounted } from 'vue';


// Komponenten importieren
import Road from '@/components/Road.vue'
import Settlement from '@/components/Settlement.vue'
import City from '@/components/City.vue'
import Robber from '@/components/Robber.vue'


// Store importieren
import { useStore } from 'vuex';
const store = useStore();

// Props definieren
const props = defineProps({
    item: Object,
    boardItemWidth: Number,
    robberWidth: Number,
    colors: Array
})

// DOM Elemente
const boardItem = ref(null)

// Variables
let currentCircleBoundingClientRect = ref(null);
let currentBoardItemClientRect = ref(null);

// OnMounted
onMounted(() => {
    getCurrentCircleBoundingClientRect()
    getCurrentBoardItemClientRect()

    boardItem.value.id = props.item.rel_player_item_played_id;

    boardItem.value.dataset.ownerId = props.item.owner_id_player;


})

// Computed
let color = computed(() => {
    if (store.state.STOREallPlayerData.length == 0) return null
    return props.colors.find(color => color.color_id == (store.state.STOREallPlayerData.find(player => player.player_id === props.item.owner_id_player)?.id_color))?.hex_code
})

let itemType = computed(() => {
    if(store.state.STOREitemTypes.length == 0) return null
    return store.state.STOREitemTypes.find(item => item.item_type_id === props.item.id_item_type).name
})

let positionCircle = computed(() => {
    if (currentCircleBoundingClientRect.value === null) return { x: 0, y: 0 }
    let xPosition = currentCircleBoundingClientRect.value.left + (currentCircleBoundingClientRect.value.width / 2);
    let yPosition = currentCircleBoundingClientRect.value.top + (currentCircleBoundingClientRect.value.height / 2);
    return { x: xPosition, y: yPosition }
})

let buildingMeasurements = computed(() => {
    if (currentBoardItemClientRect.value === null) return { width: 0, height: 0 }
    return { width: currentBoardItemClientRect.value.width, height: currentBoardItemClientRect.value.height }
})

let topPos = computed(() => {
    return (positionCircle.value.y - (buildingMeasurements.value.height / 2)) + 'px'
})

let leftPos = computed(() => {
    return (positionCircle.value.x - (buildingMeasurements.value.width / 2)) + 'px'
})

let rotation = computed(() => {
    return props.item.rotation
})

let itemWidth = computed(() => {
    if(props.item.id_item_type == (store.state.STOREitemTypes.find(item => item.name == 'robber')?.item_type_id)) {
        return (props.robberWidth/2)
    } else{
        return props.boardItemWidth
    }
})

// Methoden
function getCurrentCircleBoundingClientRect() {
    currentCircleBoundingClientRect.value = document.querySelector('#_' + props.item.position).getBoundingClientRect();
}

function getCurrentBoardItemClientRect() {
    if (boardItem.value != null) {
        currentBoardItemClientRect.value = boardItem.value.getBoundingClientRect();

    }
}

// Event Listeners$
window.addEventListener('resize', () => {
    getCurrentCircleBoundingClientRect()
})
window.addEventListener('resize', () => {
    getCurrentBoardItemClientRect()
})


</script>

<style scoped>
.boardItem {
    position: absolute;
}
</style>