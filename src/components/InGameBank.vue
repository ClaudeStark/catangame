<template>
    <div id="playerBankBottom">{{ store.state.STOREallPlayerData.find(player => player.board_position ===
        boardPosition)?.name }}</div>
    <div id="playerBankTop">
        <section class="buildings" ref="buildings" :style="{ border: '2px solid ' + currentPositionPlayerColor }">
            <div class="buildingContainer"><svg class="building" id="road" data-name="Ebene 2"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80.19 23">
                    <g data-name="Layer 1">
                        <rect :width="80.19" :height="23"
                            :style="{ fill: props.currentPositionPlayerColor, 'stroke-width': '0px' }" />
                    </g>
                </svg></div>
            <div class="buildingContainer"><svg class="building" id="village" data-name="Ebene 2"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35.08 63">
                    <g data-name="Layer 1">
                        <path
                            d="M33.21,18.83c1.19-1.76,1.88-3.73,1.88-5.83,0-7.18-7.84-13-17.5-13S.08,5.82.08,13c0,2.22.75,4.31,2.08,6.14L0,49.24h.14c-.02.26-.05.5-.05.76,0,7.18,7.84,13,17.5,13s17.5-5.82,17.5-13c0-.63-.08-1.24-.2-1.84l-1.68-29.33Z"
                            :style="{ fill: props.currentPositionPlayerColor, 'stroke-width': '0px' }" />
                    </g>
                </svg></div>
            <div class="buildingContainer"><svg class="building" id="city" data-name="Ebene 2"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35.25 79.5">
                    <g data-name="Layer 1">
                        <path
                            d="M32.25,44.75v-19.77c1.89-1.28,3-2.82,3-4.48,0-3.57-5.13-6.6-12.2-7.62-.64-7.42-2.77-12.88-5.3-12.88s-4.66,5.46-5.3,12.88C5.38,13.9.25,16.93.25,20.5c0,1.66,1.11,3.2,3,4.48v19.77c-1.81,1.26-3,3.35-3,5.73v13.92c-.15.69-.25,1.39-.25,2.11s.1,1.44.26,2.13c.04,2.59,1.48,4.83,3.61,6,3.21,2.96,8.12,4.87,13.64,4.87,5.23,0,9.9-1.71,13.11-4.41,2.7-.96,4.64-3.53,4.64-6.57v-18.05c0-2.37-1.19-4.47-3-5.73Z"
                            :style="{ fill: props.currentPositionPlayerColor, 'stroke-width': '0px' }" />
                    </g>
                </svg>
            </div>
        </section>
        <section class="bankCards">
            <BankItem v-for="item in ownPlayedItems" :ownPlayedItem="item" v-if="ownPlayedItems.length > 0">

            </BankItem>
        </section>
    </div>
    <div class="hoverBank" ref="hoverBank">
        <HoverBank :currentPositionPlayerColor="props.currentPositionPlayerColor"
            :currentPositionPlayerId="currentPositionPlayerId"></HoverBank>
    </div>
</template>

<script setup>
// Vue importieren
import { ref, computed, onMounted } from 'vue';

// Komponenten importieren
import BankItem from '@/components/BankItem.vue'
import HoverBank from '@/components/HoverBank.vue'

// Store importieren$
import { useStore } from 'vuex';
const store = useStore();

// DOM Elemente
const buildings = ref(null)
const hoverBank = ref(null)

// Props definieren
const props = defineProps({
    boardPosition: Number,
    playedItems: Array,
    playerPositions: Array,
    currentPositionPlayerColor: String,
    currentPositionPlayerId: Number
})

// Computed
let ownPlayedItems = computed(() => {
    return props.playedItems.filter(item => item.owner_id_player === (props.playerPositions.find(player => player.boardPosition === props.boardPosition)?.playerId))
})

// OnMounted
onMounted(() => {
    definePlayerBankSize()

    hoverBank.value.id = props.boardPosition
})

// Methoden
function definePlayerBankSize() {

    // Generelle CSS Anpassungen
    buildings.value.style.width = ((window.innerWidth * 0.1) / 3) + 'px'
}

// Event Listeners
window.addEventListener('resize', () => {
    definePlayerBankSize()
})

</script>

<style scoped>
#playerBankTop {
    display: flex;
    flex-direction: row-reverse;
    height: 80%;
}

#playerBankBottom {
    display: flex;
    flex-direction: row-reverse;
    font-size: 1em;
    height: 20%;
    background-color: white;
}

.bankCards {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0.5em;
    height: 100%;
    width: 100%;
    gap: 0.5em;
}

.buildings {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 0.1em 0;
    background-color: white;
}

.buildingContainer {
    height: 33%;
    width: 33%;
}

.building {
    height: 100%;
    width: 100%;
}

.hoverBank {
    position: absolute;
    z-index: 20;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
}
</style>