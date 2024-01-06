<template>
    <section id="choosePlayerPositionBank">
        <div id="choosen" class="chooseBank" v-if="choosenBoardPosition">
            <h2>Welcome to the Game {{ playerNameAtPosition }}</h2>
            <button @click="resetChoosenPosition()">Reset</button>
        </div>
        <div id="notChoosen" class="chooseBank" v-else>
            <h2>Choose your name</h2>
            <div id="chooseNameButtons">
                <button v-for="name in playerNamesToBePositioned" @click="setChoosenPosition(name)">
                {{ name }}</button>
            </div>
        </div>
    </section>
</template>

<script setup>
// Vue importieren
import { ref, computed, onMounted } from 'vue';

// Store importieren
import { useStore } from 'vuex';
const store = useStore();

// Variablen
let playerNameAtPosition = ref('');

// Props definieren
const props = defineProps({
    boardPosition: Number,
    function: String,
    playerPositions: Array,
    activePlayerData: Array
})

// Computed

// Funktion, welche abhängig der Position auf dem Spielfeld herausfindet, ob diese Position bereits einem Spieler zugewiesen wurde
// --> v-if="!choosenBoardPosition()" in Abhängigkeit des Arrays playerPositions
let choosenBoardPosition = computed(() => {
     let tempIsChoosen = false

     props.playerPositions.forEach(player => {
        if (player.boardPosition === props.boardPosition) {
            tempIsChoosen = true
            getPlayerName(player.playerId)
        }
    })
    return tempIsChoosen
})

// Funktion, welche die Namen der Spieler, welche noch nicht auf dem Spielfeld positioniert sind, zurückgibt
// --> in Abhängigkeit des Arrays playerPositions
let playerNamesToBePositioned = computed(() => {
    let tempPlayerNamesToBePositioned = []
    
    props.playerPositions.forEach(player1 => {
        if (player1.boardPosition === null) {
            props.activePlayerData.forEach(player2 => {
                if (player2.player_id === player1.playerId) {
                    tempPlayerNamesToBePositioned.push(player2.name)
                }
            })
        }
    })
    return tempPlayerNamesToBePositioned
})

// Methoden

// Funnktion welche der PlayerId den zugehörigen Spielernamen zuweist
// --> Bei erfolgreichem Match einer Boardposition mit der Boardposition
function getPlayerName(playerId) {
    props.activePlayerData.forEach(player => {
        if (player.player_id === playerId) {
            playerNameAtPosition.value = player.name
        }
    })
}

// Funktion, welche die Position eines Spielers zurücksetzt
// --> Bei Klick auf Reset Button
function resetChoosenPosition() {
    store.commit('STOREresetPlayerPosition', props.boardPosition)
}

// Funktion, welche die Position eines Spielers setzt
// --> Bei Klick auf einen Namen
function setChoosenPosition(playerName) {
    store.commit('STOREsetPlayerPosition', {boardPosition: props.boardPosition, playerName})
}

</script>

<style scoped>
#choosePlayerPositionBank {
    height: 100%;
    width: 100%;
    color: white;
}

h2 {
    margin-bottom: 0;
}

#playerBank {
    border-radius: 100px 100px 0 0;

}

button {
    margin: 0;
}

.chooseBank{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    width: 100%;
}

#chooseNameButtons{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
}
</style>