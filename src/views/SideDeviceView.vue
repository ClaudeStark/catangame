<template>
    <section id="namePopUpContainer" v-if="chooseName || !choosenName">
        <div id="namePopUpContent">
            <form @submit="definePlayerName">
                <label for="playerName">Choose your name:</label>
                <input type="text" id="playerName" v-model="playerName">
                <button type="submit">{{ choosenName ? 'Update' : 'Done' }}</button>
            </form>
        </div>
    </section>
    <section id="gameBox" @mousemove="trackMousePosition($event)" @mouseup="stopFlyingCard()">
        <section id="middleBar">
            <section id="mainBox">
                <div id="topBar" ref="topBar" @mouseenter="sendCardVisualFeedback(true)"
                    @mouseleave="sendCardVisualFeedback(false)">
                </div>
                <section id="resourceCardsContainer">
                    <div v-if="resourceCards.length != 0" v-for="card in resourceCards">
                        <HandCard class="resourceCard" :id="card.positionClass"
                            :handCardType="item_types.find(arrayID => arrayID.item_type_id === card.item_type_id).name"
                            :amount="card.amount" @emitHandCard="showHandCard">
                        </HandCard>
                    </div>
                    <div class="flyingCard" v-if="trackMotion"
                        :style="{ left: mousePosition.mouseXPosition + 'px', top: mousePosition.mouseYPosition + 'px' }">
                        {{ flyingCard }}
                    </div>
                </section>
                <section id="playerStats">
                    <div id="victoryPoints" v-if="playerStats.length != 0">
                        <p>Victory Points: {{ victory_points }} </p>
                    </div>
                    <div id="buildings">
                        <div class="building" v-if="playerStats.length != 0">
                            <p>Remaining Roads: {{
                                maxRoads -
                                playerStats.find(arrayID => arrayID.item_type_id ===
                                    item_types.find(arrayID => arrayID.name === "road").item_type_id).amount
                            }}</p>
                        </div>
                        <div class="building" v-if="playerStats.length != 0">
                            <p>Remaining Settlements: {{
                                maxSettlements -
                                playerStats.find(arrayID => arrayID.item_type_id ===
                                    item_types.find(arrayID => arrayID.name === "settlement").item_type_id).amount
                            }}</p>
                        </div>
                        <div class="building" v-if="playerStats.length != 0">
                            <p>Remaining city: {{
                                maxCities -
                                playerStats.find(arrayID => arrayID.item_type_id ===
                                    item_types.find(arrayID => arrayID.name === "city").item_type_id).amount
                            }}</p>
                        </div>
                    </div>
                </section>
            </section>
            <section id="specialCardsScrollContainer">
                <div v-if="specialCards.length != 0" v-for="card in specialCards">
                    <HandCard class="specialCard"
                        :handCardType="item_types.find(arrayID => arrayID.item_type_id === card.item_type_id).name"
                        :amount="card.amount" @emitHandCard="showHandCard">
                    </HandCard>
                </div>
            </section>
        </section>
        <section id="bottomBar" :style="{ 'z-index': choosenName ? 30 : 10 }">
            <div id="bottomBarLeft">
                <div id="sessionCode">
                    <h2>Code: {{ sessionCode }}</h2>
                </div>
                <div id="playerName">
                    <h2>{{ playerName }}</h2>
                </div>
            </div>
            <button id="zahnradButton" @click="rename()" v-if="choosenName">
                <img src="@/assets/gear-svgrepo-com.svg" alt="Zahnrad-Symbol" id="zahnrad" />
            </button>
        </section>
    </section>
</template>

<script setup>
// Route importieren
import { useRoute } from 'vue-router';

// Supabase importieren
import { supabase } from '@/lib/supabaseClient';

// Vue importieren
import { ref, watch, onMounted, toRefs } from 'vue';

// Komponenten importieren
import HandCard from '@/components/HandCard.vue';

let firstTimeInitializing = ref(true);
let chooseName = ref(false)
let choosenName = ref(true);
const id_session = useRoute().params.id;
const id_color = useRoute().query.playerColor;
const sessionCode = ref();
const player_id = ref();
let playerName = ref();
let victory_points = ref(0);
const item_types = ref([{}])
let playerStats = ref([]);
let specialCards = ref([]);
let resourceCards = ref([]);
const maxRoads = ref(15);
const maxSettlements = ref(5);
const maxCities = ref(4);
let mousePosition = ref({ 'mouseXPosition': '', 'mouseYPosition': '', 'relMouseXPosition': '', 'relMouseYPosition': '' });
let screenSize = ref({ 'windowWidth': '', 'windowHeight': '' })
let flyingCard = ref();
let sendingZone = ref(false);
let trackMotion = ref(false);
let boardPosition = ref();


// DOM Elemente
const topBar = ref(null)

// Emit Funktionen
const showHandCard = (handCard) => {
    flyingCard.value = handCard;
    startFlyingCard();
}

function setup() {
    fetchCurrentPlayerId();
    fetchSessionCode();
    // Screensize auslesen
    handleWindowResize();
}

function log(log) {
    console.log(log)
}





onMounted(() => {
    fetchCurrentPlayerId();

    fetchSessionCode();

    // Screensize auslesen
    handleWindowResize();
})

///////////////////////////////////// Initialisierung beendet ////////////////////////////////
////////////////////////////////////// Deklaration der Funktionen ////////////////////////////






// ENDE Hilfsfunktion, welche die GameView anzeigt oder versteckt etc








///////////////////////////////////// ONMOUNT ////////////////////////////////


// Funktion, die die Player ID aus der Datenbank holt. id_session und id_color kommen aus der Funktion playerInitializeDone().
// Auch wird der Wert der victory_points aus der Datenbank geholt
// Die id_session wird über die URL übergeben, die id_color wird über die URL übergeben
// Die Funktion wird nur bei erstmaliger Initialisierung des Spieles einen Wert zurückgeben - sonst --> catch
const fetchCurrentPlayerId = async () => {
    try {
        const { data, error } = await supabase
            .from('player')
            .select()
            .eq('id_session', id_session)
            .eq('initialization_in_progress', true)
        if (error) {
            console.error('Fehler:', error)
        } else {
            // Bei erstmaliger initialisierung des Spiels erfolgreich - sonst -> catch
            player_id.value = data[0].player_id;

            fetchPlayerInitializeDone();

            fetchJoinGame();
        };
    }
    catch (e) {
        // Bei wiedereinstieg ins Spiel
        try {
            const { data, error } = await supabase
                .from('player')
                .select()
                .eq('id_session', id_session)
                .eq('id_color', id_color)
            if (error) {
                console.error('Fehler:', error)
            } else {
                player_id.value = data[0].player_id;
                victory_points.value = data[0].victory_points;


                firstTimeInitializing.value = false;

                fetchJoinGame();

                fetchPlayerPosition();
            };
        }
        catch (e) {
            console.error('CatchFehler:', e)
        }
    }
}

const fetchSessionCode = async () => {
    try {
        const { data, error } = await supabase
            .from('session')
            .select()
            .eq('session_id', id_session)
        if (error) {
            console.error('Fehler:', error)
        } else {
            sessionCode.value = data[0].code;
        };
    }
    catch (e) {
        console.error('CatchFehler:', e)
    }
}

// Funktion, die die Initialisierung des Players beendet. player_id kommt aus der Funktion fetchCurrentPlayerId()
// in der Datenbank wird der Wert initialization_in_progress auf false gesetzt und der Wert id_color wird gesetzt
const fetchPlayerInitializeDone = async () => {
    let defaultPlayerName
    // Schauen, der vievielte Spieler der Session beigetreten ist
    try {
        const { data, error } = await supabase
            .from('player')
            .select()
            .eq('id_session', id_session)
        if (error) {
            console.error('Fehler:', error)
        } else {
            console.log(data)
            // defaultPlayerName = 'Player ' + (data.length);
        };
    }
    catch (e) {
        console.error('CatchFehler:', e)
    }


    // Der inizialisierende Spieler wird in der Datenbank als fertig markiert und ergänzt
    try {
        const { data, error } = await supabase
            .from('player')
            .update({ initialization_in_progress: false, id_color: id_color, victory_points: victory_points.value, name: defaultPlayerName })
            .eq('player_id', player_id.value)
        if (error) {
            console.error('Fehler:', error)
        } else {
            console.log('Initialisierung beendet');
        };
    }
    catch (e) {
        console.error('CatchFehler:', e)
    }
}

// In der Datenbank werden alle Rohstofftabellen generiert und auf 0 gesetzt - insofern die joinedGame Variable noch false ist.
// Anschliessend wird die joinedGame Variable auf true gesetzt, damit die GameView angezeigt wird.
const fetchJoinGame = async () => {

    fetchShowNamePopUp();

    // Hier werden alle Element die sich in der item_type Tabelle befinden ausgelesen und in einem Array gespeichert
    try {
        const { data, error } = await supabase
            .from('item_type')
            .select()
        if (error) {
            console.error('Fehler:', error)
        } else {
            item_types.value = [];
            data.forEach(item_type => {
                item_types.value.push(item_type);
            });
            console.log(item_types.value)
        };
    }
    catch (e) {
        console.error('CatchFehler:', e)
    }

    if (firstTimeInitializing.value) {
        // Hier werden alle Rohstofftabellen generiert und auf 0 gesetzt
        let createItemTablePromises = item_types.value.map((item_type) => {
            return fetchCreateItemTable(item_type.item_type_id)
        });

        // Abwarten, bis alle Tabelleneinträge generiert wurden

        await Promise.all(createItemTablePromises);

        firstTimeInitializing.value = false;
    }

    fetchDownloadPlayerStats();
}

// Funktion, welche in der Datenbank schaut, ob der Player schon einen Namen hat. Wenn nicht, wird das PopUp angezeigt.
const fetchShowNamePopUp = async () => {
    try {
        const { data, error } = await supabase
            .from('player')
            .select('name')
            .eq('player_id', player_id.value)
        if (error) {
            console.error('Fehler:', error)
        } else {
            if (data[0].name == null) {
                console.log('Name noch nicht gesetzt');
                choosenName.value = false;
            } else {
                choosenName.value = true;
                console.log('Name schon gesetzt');
                console.log(choosenName.value)
            }
            fetchDownloadPlayerName()
        };
    }
    catch (e) {
        console.error('CatchFehler:', e)
    }
}

// Funktion, welche den Namen des Players aus der Datenbank holt und in playerName speichert.
const fetchDownloadPlayerName = async () => {
    try {
        const { data, error } = await supabase
            .from('player')
            .select('name')
            .eq('player_id', player_id.value)
        if (error) {
            console.error('Fehler:', error)
        } else {
            playerName.value = data[0].name;
        };
    }
    catch (e) {
        console.error('CatchFehler:', e)
    }
}

// Funktion, die die Rohstofftabellen generiert und auf 0 setzt. Die Variable item_type_id kommt aus der Funktion joinGame() und wird 
// aus dem Array item_types.value ausgelesen mit einer forEach Schleife.
const fetchCreateItemTable = async (item_type_id) => {
    try {
        const { data, error } = await supabase
            .from('rel_player_item')
            .insert([{ owner_id_player: player_id.value, id_item_type: item_type_id, amount: 0 }])
        if (error) {
            console.error('Fehler:', error)
        } else {
            console.log("Table erfolgreich erstellt")
        };
    }
    catch (e) {
        console.error('CatchFehler:', e)
    }
}


// Aktueller Wert jedes Rohstoffs des Spielers aus der Datenbank holen und in playerStats speichern.
const fetchDownloadPlayerStats = async () => {
    console.log(player_id.value)
    try {
        const { data, error } = await supabase
            .from('rel_player_item')
            .select()
            .eq('owner_id_player', player_id.value)
        if (error) {
            console.error('Fehler:', error)
        } else {
            // PlayerStats Array leeren, specialCards Array leeren, resourceCards Array leeren  
            playerStats.value = [];
            specialCards.value = [];
            resourceCards.value = [];

            data.forEach(item => {
                playerStats.value.push({ item_type_id: item.id_item_type, amount: item.amount });
            });

            // Aus dem Array playerStats werden sie Special Karten in ein neues Array gespeichert je nach Anzahl
            let specialItem = 'knight';
            for (let i = 0; i < 5; i++) {
                playerStats.value.forEach(card => {
                    if (item_types.value.find(arrayID => arrayID.item_type_id === card.item_type_id).name == specialItem) {
                        for (let i = 0; i < card.amount; i++) {
                            specialCards.value.push(card);
                        }
                    }
                })
                switch (specialItem) {
                    case 'knight':
                        specialItem = 'road_building';
                        break;
                    case 'road_building':
                        specialItem = 'year_of_plenty';
                        break;
                    case 'year_of_plenty':
                        specialItem = 'monopoly';
                        break;
                    case 'monopoly':
                        specialItem = 'victory_point';
                        break;
                }
            }

            // Aus dem Array playerStats werden die Rohstoff Karten in das Array itemCards gespeichert
            let resource = 'brick';
            let cardPositionId = 'left';
            for (let i = 0; i < 5; i++) {
                playerStats.value.forEach(card => {
                    if (item_types.value.find(arrayID => arrayID.item_type_id === card.item_type_id).name == resource) {
                        card.positionClass = cardPositionId;
                        resourceCards.value.push(card);
                    }
                })
                switch (resource) {
                    case 'brick':
                        cardPositionId = 'middleLeft';
                        resource = 'lumber';
                        break;
                    case 'lumber':
                        cardPositionId = 'middle';
                        resource = 'ore';
                        break;
                    case 'ore':
                        cardPositionId = 'middleRight';
                        resource = 'grain';
                        break;
                    case 'grain':
                        cardPositionId = 'right';
                        resource = 'wool';
                        break;
                }
            }
        };
    }
    catch (e) {
        console.error('CatchFehler:', e)
    }
}

///////////////////////////////////// ONMOUNT beendet ////////////////////////////////
///////////////////////////////////// Namenssetzung ////////////////////////////////

// Funktion, welche aufgerufen wird, wenn der Player den Knopf drückt, um dem Spiel beizutreten/Seinen Namen einzugeben
// der eingetragene Name aus dem Formular wird in playerName.value gespeichert
function definePlayerName(event) {
    event.preventDefault();


    // Variable, definierter Name des Players, aus dem Formular auslesen
    playerName.value = event.target[0].value.trim();

    if (playerName.value != '') {
        chooseName.value = false;

        // Fetch aufruf: Werte in Datenbank schreiben
        fetchDefinePlayerName(playerName.value);
    }


}

// Funktion, welche den Namen des Players in der Datenbank speichert. playerName kommt aus der Funktion definePlayerName()
const fetchDefinePlayerName = async (name) => {
    try {
        const { data, error } = await supabase
            .from('player')
            .update({ name })
            .eq('player_id', player_id.value)
        if (error) {
            console.error('Fehler:', error)
        } else {
            fetchDownloadPlayerName()
        };
    }

    catch (e) {
        console.error('CatchFehler:', e)
    }
}

// Funktion, die aufgerufen wird, wenn der Player den Knopf drückt, um seinen Namen zu ändern
function rename() {
    if (chooseName.value) {
        chooseName.value = false;
        fetchDownloadPlayerName()

    } else {
        chooseName.value = true;
    }
}

///////////////////////////////////// Funktionen, was passiert, wenn Ressourcen ändern ////////////////////////////////

supabase
    .channel('rel_player_item')
    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'rel_player_item' }, (payload) => {
        console.log('Payload:', payload);
        if (payload.new.owner_id_player == player_id.value) {
            fetchDownloadPlayerStats(/*payload.new.id_item_type, payload.new.amount*/);
            console.log(payload.new.id_item_type, payload.new.amount);
        }
    })
    .subscribe()

supabase
    .channel('player')
    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'player' }, (payload) => {
        console.log('Payload:', payload);
        if (payload.new.player_id == player_id.value) {
            victory_points.value = payload.new.victory_points;
            fetchShowNamePopUp()
            fetchPlayerPosition()
            console.log('Hey')
        }
    })
    .subscribe()

///////////////////////////////////// Deklaration der Funktionen beendet ////////////////////////////////
////////////////////////////////////// Interaktion GameBox ////////////////////////////

// Funktion wird ausgeführt, sobald sich die Maus auf der GameBox bewegt
function trackMousePosition(event) {

    // Die Mausposition wird in das Array mousePosition gespeichert

    mousePosition.value.mouseXPosition = event.clientX;
    mousePosition.value.mouseYPosition = event.clientY;
    mousePosition.value.relMouseXPosition = (event.clientX / screenSize.value.windowWidth) * 100;
    mousePosition.value.relMouseYPosition = (event.clientY / screenSize.value.windowHeight) * 100;
}

// Funktion wird ausgeführt, sobald sich die Fenstergrösse ändert
// Die Fenstergrösse wird in das Array screenSize gespeichert
function handleWindowResize() {
    screenSize.value.windowHeight = innerHeight;
    screenSize.value.windowWidth = innerWidth;
}

// Funktion wird ausgeführt, sobald die Maus auf der GameBox gedrückt wird
function startFlyingCard() {
    trackMotion.value = true;
}

// Funktion wird ausgeführt, sobald die Maus auf der GameBox losgelassen wird
function stopFlyingCard() {
    if (sendingZone.value && trackMotion.value) {
        fetchChangeRelTable();
        console.log('Jetzt')

    }
    trackMotion.value = false;
}

// Funktion, welche die Datenbank anpasst, sobald man eine Karte ausspielt
const fetchChangeRelTable = async () => {
    let tempAmount = 0;
    let tempItemId = 0;
    try {
        const { data, error } = await supabase
            .from('item_type')
            .select('item_type_id')
            .eq('name', flyingCard.value)

        if (error) {
            console.error('Fehler:', error);
        } else {
            console.log('Geklappt: 1', data);
            tempItemId = data[0].item_type_id;
        }
    }
    catch (e) {
        console.error('CatchFehler:', e)
    }


    try {
        const { data, error } = await supabase
            .from('rel_player_item')
            .select('amount')
            .eq('owner_id_player', player_id.value)
            .eq('id_item_type', tempItemId)

        if (error) {
            console.error('Fehler:', error);
        } else {
            console.log('Geklappt: 2', data);
            tempAmount = data[0].amount;
        }
    }
    catch (e) {
        console.error('CatchFehler:', e)
    }

    try {
        const { data, error } = await supabase
            .from('rel_player_item')
            .update({ amount: tempAmount - 1 })
            .eq('owner_id_player', player_id.value)
            .eq('id_item_type', tempItemId)

        if (error) {
            console.error('Fehler:', error);
        } else {
            console.log('Geklappt:3', data);
        }
    }
    catch (e) {
        console.error('CatchFehler:', e)
    }

    fetchChangeRelPlayerItemPlayed(tempItemId);
}



// In Relationstabelle vom MainDevice (rel_player_item_played) wird die Karte hinzugefügt
const fetchChangeRelPlayerItemPlayed = async (itemType) => {

    try {
        const { data, error } = await supabase
            .from('rel_player_item_played')
            .insert([{ owner_id_player: player_id.value, id_item_type: itemType, position: boardPosition.value }])

        if (error) {
            console.error('Fehler:', error);
        } else {
            console.log('Geklappt: 4', data);

        }
    }
    catch (e) {
        console.error('CatchFehler:', e)
    }
}

// Position des Spielers ermitteln
const fetchPlayerPosition = async () => {

    try {
        const { data, error } = await supabase
            .from('player')
            .select('board_position')
            .eq('player_id', player_id.value)

        if (error) {
            console.error('Fehler:', error);
        } else {
            console.log('Geklappt: 5', data);
            boardPosition.value = data[0].board_position;
            console.log(boardPosition.value);

        }
    }
    catch (e) {
        console.error('CatchFehler:', e)
    }
}


// Funktion, welche schaut, ob die Maus sich in der oberen Zone befindet oder nicht
function sendCardVisualFeedback(mouseIn) {
    let playerColor = '#ff6846';
    if (mouseIn) {
        sendingZone.value = true;
        topBar.value.style.background = 'linear-gradient(to bottom,' + playerColor + ' 0%,  transparent 100%)';
    } else {
        topBar.value.style.background = 'white';
        sendingZone.value = false;
    }
}


///////////////////////////////////// EventListener ////////////////////////////////
// Eventlistener für die Fenstergrösse
window.addEventListener('resize', handleWindowResize)


</script>








<style scoped>
#namePopUpContainer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 20;
}

#namePopUpContent {
    background: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    text-align: center;
}

#gameBox {
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    user-select: none;
}

#middleBar {
    height: 90vh;
    display: flex;
}

#bottomBar {
    height: 10vh;
    background-color: lightgreen;
    width: 100%;
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 10;
}

#bottomBarLeft {
    display: flex;
    align-items: center;
}

#playerName {
    margin: 0 0 0 2vw;
}

#sessionCode {
    margin: 0 5px;
}

#zahnradButton {
    background-color: transparent;
    border: none;
    width: 3vw;
    margin-right: 5px;
}

#zahnrad {
    width: 100%;
    height: 100%;
}

#mainBox {
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
}

#topBar {
    height: 10vh;
    display: flex;
    flex-shrink: 0;
    z-index: 16;
}

#resourceCardsContainer {
    height: 70vh;
    background-color: white;
    flex-direction: row;
    display: flex;
    align-items: center;
    justify-content: center;
}

#playerStats {
    height: 10vh;
    display: flex;
    flex-shrink: 0;
    background-color: bisque;
    z-index: 10;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
}

#victoryPoints {
    background-color: aqua;
    width: 10vw;
    flex-shrink: 0;
    height: 100%;
    flex-direction: row;
    display: flex;
    align-items: center;
}

#buildings {
    height: 100%;
    background-color: blueviolet;
    display: flex;
    flex-shrink: 0;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;

}

#specialCardsScrollContainer {
    background-color: blueviolet;
    height: 100%;
    width: 25vw;
    overflow-y: scroll;
    flex-direction: column;
    gap: 10px;
    display: flex;
    align-items: center;
    padding: 10px;
}

.specialCard {
    width: 15vw;
    flex-shrink: 0;
    height: 25vw;
    background-color: aqua;
}

.resourceCard {
    width: 15vw;
    flex-shrink: 0;
    height: 25vw;
    background-color: aquamarine;
    display: flex;
    margin: 0 -15px;
}

#left {
    rotate: -25.5deg;
    margin-top: 21vh;
    background-color: red;
    z-index: 1;
    position: relative;
}

#middleLeft {
    rotate: -12.5deg;
    margin-top: 5vh;
    background-color: aliceblue;
    z-index: 2;
    position: relative;
}

#middle {
    z-index: 3;
    position: relative;
}

#middleRight {
    rotate: 12.5deg;
    margin-top: 4.5vh;
    background-color: blueviolet;
    z-index: 4;
    position: relative;
}

#right {
    rotate: 25.5deg;
    margin-top: 20vh;
    background-color: aqua;
    z-index: 5;
    position: relative;
}

#flyingCards {
    display: flex;
    align-items: center;
    justify-content: center;
}

:deep(.flyingCard) {
    position: absolute;
    height: 100px;
    width: 100px;
    z-index: 15;
    background-color: red;
}
</style>

