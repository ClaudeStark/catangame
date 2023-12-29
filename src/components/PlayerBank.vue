<template>
    <div id="playerBankContainer" ref="playerBankContainer">
        <section id="playerBank" ref="playerBank"
            :style="{ backgroundColor: colors.find(color => color.color_id === (activePlayerData.find(player => player.board_position === boardPosition)?.id_color))?.hex_code }">

            <InGameBank :board-position=props.boardPosition v-if="props.function === 'inGame'">

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
    colors: Array
})

// Computed



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
        case 1:
            playerBankRefStyle.height = playerBankHeight + 'px'
            playerBankRefStyle.width = playerBankWidth + 'px'
            playerBankRefStyle.rotate = '180deg'
            break;
        case 2:
            playerBankRefStyle.height = playerBankHeight + 'px'
            playerBankRefStyle.width = playerBankWidth + 'px'
            playerBankRefStyle.rotate = '270deg'
            break;
        case 3:
            playerBankRefStyle.height = playerBankHeight + 'px'
            playerBankRefStyle.width = playerBankWidth + 'px'
            playerBankRefStyle.rotate = '0'
            break;
        case 4:
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
}

#playerBank {
    display: flex;
    flex-direction: column-reverse;
}
</style>                                            