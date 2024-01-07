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

.hoverBankBottom:hover, .hoverBankBottom:active {
    opacity: 1;
}

</style>                                            