<template>
    <div class="item" ref="item" @click="$emit('updateSelectedItem', itemId)" :style="{ top: topPos, left: leftPos }">
        <p>Ich bin ein Item. Position:
            {{ positionLeft }} und {{ positionTop }} |
            owner: {{ owner }}|
            itemId: {{ itemId }}|
            itemTypeId: {{ itemTypeId }}|
            itemType: {{ itemType }}
        </p>
    </div>
</template>

<script setup>

// Vue importieren
import { ref, onMounted, computed } from 'vue';

// Props definieren
const props = defineProps({
    positionTop: Number,
    positionLeft: Number,
    itemTypeId: Number,
    itemId: Number,
    owner: Number,
    item_types: Array,
})



const topPos = computed(() => {
    if (props.positionTop != null && props.positionLeft != null) {
        return props.positionTop + 'px';
    } else {
        return null;
    }
})

const leftPos = computed(() => {
    if (props.positionTop != null && props.positionLeft != null) {
        return props.positionLeft + 'px';
    } else {
        return null;
    }
})

const itemType = computed(() => {
    if (props.itemTypeId != null && props.item_types != null) {
        return props.item_types.find(arrayID => arrayID.item_type_id === props.itemTypeId)?.name
    } else {
        return null;
    }
})





</script>

<style scoped>
.item {
    position: absolute;
    background-color: bisque;
    height: 200px;
    width: 40px;
}

p {
    font-size: xx-small;
}
</style>