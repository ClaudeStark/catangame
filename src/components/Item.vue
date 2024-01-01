<template>
    <div class="item" ref="item" @click="$emit('updateSelectedItem', itemId)" :style="{ top: topPos, left: leftPos }">
        <p>Ich bin ein Item. Position: {{ currentItemName }}{{ idCurrentCard  }}
        </p>
    </div>
</template>

<script setup>

// Vue importieren
import { ref, onMounted, computed } from 'vue';

// Store importieren
import { useStore } from 'vuex';
const store = useStore();

// Props definieren
const props = defineProps({
    // positionTop: Number,
    // positionLeft: Number,
    // itemTypeId: Number,
    // itemId: Number,
    // owner: Number,
    // item_types: Array,
    idItemType: String,
    idCurrentCard: String,
    mousePosition: Object
})

// Computed

// String, welcher den Namen des aktuellen Items enthält
// --> Änderung von STOREitemTypes und idItemType
const currentItemName = computed(() => {
    if (store.state.STOREitemTypes.length === 0) return null
    console.log('hallo'+props.idItemType)
    return store.state.STOREitemTypes.find(item => item.item_type_id === parseInt(props.idItemType, 10))?.name
})



const topPos = computed(() => {
    if (props.mousePosition != null) {
        return props.mousePosition.mouseYPosition + 'px';
    } else {
        return null;
    }
})

const leftPos = computed(() => {
    if (props.mousePosition != null) {
        return props.mousePosition.mouseXPosition + 'px';
    } else {
        return null;
    }
})





</script>

<style scoped>
.item {
    position: absolute;
    background-color: bisque;
    height: 150px;
    width: 100px;
}

p {
    font-size: xx-small;
}
</style>