<template>
    <div id="playerBankContainer" ref="playerBankContainer">
        <section id="playerBank" ref="playerBank"
            :style="{ backgroundColor: currentPositionPlayerColor }">
            <InGameBank :board-position=props.boardPosition :playedItems="props.playedItems"
                :currentPositionPlayerId="currentPositionPlayerId" :playerPositions="props.playerPositions" v-if="props.function === 'inGame' && props.playerPositions.find(entry => entry.boardPosition === props.boardPosition)" :currentPositionPlayerColor="currentPositionPlayerColor">
            </InGameBank>
            <ChoosePlayerPositionBank :activePlayerData="activePlayerData" :playerPositions="props.playerPositions"
                :board-position=props.boardPosition v-else-if="props.function === 'popUp'">
            </ChoosePlayerPositionBank>
        </section>
    </div>
</template>

<script setup>
// Vue importieren
import { ref, computed, onMounted, watch } from 'vue';

// Store importieren
import { useStore } from 'vuex';
const store = useStore();

// Komponenten importieren
import InGameBank from './InGameBank.vue';
import ChoosePlayerPositionBank from './ChoosePlayerPositionBank.vue';

// DOM Elemente
const playerBank = ref(null)
const playerBankContainer = ref(null)

// Props definieren
const props = defineProps({
    boardPosition: Number,
    function: String,
    playerPositions: Array,
    activePlayerData: Array,
    colors: Array,
    playedItems: Array
})

// Computed

// Array, welches die aktuelle Farbe des Spielers enthält
// --> Änderung von activePlayerData und boardPosition unf colors
let currentPositionPlayerColor = computed(() => {
    if (props.activePlayerData.length === 0 || props.colors.length === 0) return ''

    return props.colors.find(color => color.color_id === (props.activePlayerData.find(player => player.board_position === props.boardPosition)?.id_color))?.hex_code
})

// Number, welche die aktuelle Spieler ID enthält
// --> Änderung von playerPositions und boardPosition
let currentPositionPlayerId = computed(() => {
    if (props.playerPositions.length === 0) return null

    return props.playerPositions.find(player => player.boardPosition === props.boardPosition)?.playerId
})


// OnMounted
onMounted(() => {
    definePlayerBankSize();
})

// Methoden
function definePlayerBankSize() {
    // Schmalste Seite des Bildschirms definiert die Größe der PlayerBanks
    let playerBankWidth = (window.innerHeight * 0.8)
    // let playerBankWidth = (innerHeight - (innerWidth * 0.2)) //Option für alternatives Layout
    let playerBankHeight = (window.innerWidth * 0.1)

    // Generelle CSS Anpassungen
    playerBankContainer.value.style.justifyContent = 'center'
    playerBankContainer.value.style.alignItems = 'center'
    playerBank.value.style.flexShrink = '0'

    let playerBankRefStyle = playerBank.value.style

    // Playerbanks werden je nach Standort auf dem Spielfeld angepasst
    switch (props.boardPosition) {
        case 1000:
            playerBankRefStyle.height = playerBankHeight + 'px'
            playerBankRefStyle.width = playerBankWidth + 'px'
            playerBankRefStyle.rotate = '180deg'
            break;
        case 2000:
            playerBankRefStyle.height = playerBankHeight + 'px'
            playerBankRefStyle.width = playerBankWidth + 'px'
            playerBankRefStyle.rotate = '270deg'
            break;
        case 3000:
            playerBankRefStyle.height = playerBankHeight + 'px'
            playerBankRefStyle.width = playerBankWidth + 'px'
            playerBankRefStyle.rotate = '0deg'
            break;
        case 4000:
            playerBankRefStyle.height = playerBankHeight + 'px'
            playerBankRefStyle.width = playerBankWidth + 'px'
            playerBankRefStyle.rotate = '90deg'
            break;
    }
}

// Event Listeners
window.addEventListener('resize', () => {
    definePlayerBankSize()
})


</script>

<style scoped>
#playerBankContainer {
    display: flex;
    width: 100%;
    height: 100%;
    border-radius: 50%;
}

#playerBank {
    display: flex;
    flex-direction: column-reverse;
    position: relative;
}

#notChoosen {
    color: white;
}
</style>                                            