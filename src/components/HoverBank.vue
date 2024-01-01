<template>
    <div class="hoverBankTop"></div>
    <div class="hoverBankBottom"
        :style="{ background: 'linear-gradient(to bottom, transparent, ' + props.currentPositionPlayerColor + ')' }">
    </div>
</template>

<script setup>
// Vue importieren
import { ref, computed, onMounted } from 'vue';

// Store importieren
import { useStore } from 'vuex';
const store = useStore();

// DOM Elemente

// Props definieren
const props = defineProps({
    currentPositionPlayerColor: String,
    currentPositionPlayerId: Number
})
// Methoden


// Funktion, welche das Objekt, auf dem man hovered, in den Store schreibt
// -->@mouseover in hoverBankTop und hoverBankBottom
function setMouseOver(position) {
    if (position === 'top') {
        store.commit('STOREsetcurrentHoveredObject', props.currentPositionPlayerId + 'top')
    } else if (position === 'bottom') {
        store.commit('STOREsetcurrentHoveredObject', props.currentPositionPlayerId + 'bottom')
    }

}

// Funktion, welche das hoveredObject im Store leert
// -->@mouseout in hoverBankTop und hoverBankBottom
function setMouseOut() {
    store.commit('STOREresetcurrentHoveredObject')
}
</script>


<style scoped>
.hoverBankTop {
    height: 50%;
    width: 100%;
}


.hoverBankBottom {
    transition: opacity 0.3s ease;
    height: 50%;
    width: 100%;
    opacity: 0;
}

.hoverBankBottom:hover {
    opacity: 1;
}
</style>                                            