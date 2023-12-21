<template>
    <div id="playerBankContainer" ref="playerBankContainer">
        <section id="playerBank" ref="playerBank">
            <div id="playerBankBottom">Hallo</div>
            <div id="playerBankTop">
                <section id="buildings" ref="buildings">
                    <div class="buildingContainer"><svg class="building" data-name="Ebene 2"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80.19 23">
                            <g id="road" data-name="Layer 1">
                                <rect width="80.19" height="23" style="fill: #1d3c6b; stroke-width: 0px;" />
                            </g>
                        </svg></div>
                    <div class="buildingContainer"><svg class="building" data-name="Ebene 2"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35.08 63">
                            <g id="village" data-name="Layer 1">
                                <path
                                    d="M33.21,18.83c1.19-1.76,1.88-3.73,1.88-5.83,0-7.18-7.84-13-17.5-13S.08,5.82.08,13c0,2.22.75,4.31,2.08,6.14L0,49.24h.14c-.02.26-.05.5-.05.76,0,7.18,7.84,13,17.5,13s17.5-5.82,17.5-13c0-.63-.08-1.24-.2-1.84l-1.68-29.33Z"
                                    style="fill: #1d3c6b; stroke-width: 0px;" />
                            </g>
                        </svg></div>
                    <div class="buildingContainer"><svg class="building" data-name="Ebene 2"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35.25 79.5">
                            <g id="city" data-name="Layer 1">
                                <path
                                    d="M32.25,44.75v-19.77c1.89-1.28,3-2.82,3-4.48,0-3.57-5.13-6.6-12.2-7.62-.64-7.42-2.77-12.88-5.3-12.88s-4.66,5.46-5.3,12.88C5.38,13.9.25,16.93.25,20.5c0,1.66,1.11,3.2,3,4.48v19.77c-1.81,1.26-3,3.35-3,5.73v13.92c-.15.69-.25,1.39-.25,2.11s.1,1.44.26,2.13c.04,2.59,1.48,4.83,3.61,6,3.21,2.96,8.12,4.87,13.64,4.87,5.23,0,9.9-1.71,13.11-4.41,2.7-.96,4.64-3.53,4.64-6.57v-18.05c0-2.37-1.19-4.47-3-5.73Z"
                                    style="fill: #1d3c6b; stroke-width: 0px;" />
                            </g>
                        </svg>
                    </div>
                </section>
                <section id="bankCards"></section>
            </div>
        </section>
    </div>
</template>

<script setup>
// Vue importieren
import { ref, computed, onMounted } from 'vue';

// Komponenten importieren
import BankItem from '@/components/BankItem.vue'

// DOM Elemente
const playerBank = ref(null)
const playerBankContainer = ref(null)
const buildings = ref(null)

// Props definieren
const props = defineProps({
    boardPosition: Number
})

// OnMounted
onMounted(() => {
    definePlayerBankSize()
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
    buildings.value.style.width = ((window.innerWidth * 0.1) / 3) + 'px'


    // Playerbanks werden je nach Standort auf dem Spielfeld angepasst
    switch (props.boardPosition) {
        case 1:
            playerBankRefStyle.height = playerBankHeight + 'px'
            playerBankRefStyle.width = playerBankWidth + 'px'
            playerBankRefStyle.backgroundColor = 'red'
            playerBankRefStyle.rotate = '180deg'
            break;
        case 2:
            playerBankRefStyle.height = playerBankHeight + 'px'
            playerBankRefStyle.width = playerBankWidth + 'px'
            playerBankRefStyle.backgroundColor = 'red'
            playerBankRefStyle.rotate = '270deg'
            break;
        case 3:
            playerBankRefStyle.height = playerBankHeight + 'px'
            playerBankRefStyle.width = playerBankWidth + 'px'
            playerBankRefStyle.backgroundColor = 'red'
            playerBankRefStyle.rotate = '0'
            break;
        case 4:
            playerBankRefStyle.height = playerBankHeight + 'px'
            playerBankRefStyle.width = playerBankWidth + 'px'
            playerBankRefStyle.backgroundColor = 'red'
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

#playerBankTop {
    flex-grow: 1;
    display: flex;
    flex-direction: row-reverse;
}

#buildings {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 0.1em 0;
    background-color: aqua;
}

.buildingContainer {
    height: 33%;
    width: 33%;
}

.building {
    height: 100%;
    width: 100%;
}
</style>