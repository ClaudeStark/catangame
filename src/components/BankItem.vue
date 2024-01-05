<template>
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