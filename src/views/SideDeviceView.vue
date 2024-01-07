<template>
    <section id="namePopUpContainer" v-if="chooseName || !choosenName">
        <div id="namePopUpContent">
            <form @submit="checkNameAvailability">
                <label for="playerName">Choose your name: </label>
                <input type="text" id="playerName" maxlength="20" v-model="playerName">
                <button id="buttonChooseName" type="submit">{{ choosenName ? 'Update' : 'Done' }}</button>
            </form>
            <button v-if="choosenName" @click="fetchRemoveOwnPosition">Choose new Position on Board</button>
        </div>
    </section>
    <section ref="gameBox" id="gameBox" @mousemove="event => trackMousePosition(event, 'mouse')"
        @touchmove="event => trackMousePosition(event, 'touch')" @mouseup="stopFlyingCard()" @touchend="stopFlyingCard()">
        <div class="flyingCardContainer" v-if="mousePosition.mouseXPosition != null">
            <div class="flyingCard" ref="flyingCard"
                :style="{ top: flyingCardPositionTop + 'px', left: flyingCardPositionLeft + 'px', opacity: flyingCardVisible }">
                <img :src="'/images/resources_vertical/card_' + flyingCardType + '.svg'" draggable="false">
            </div>
        </div>
        <section id="middleBar">
            <section id="mainBox">
                <div id="hoverBar" @mouseenter="hoverBarVisible = true" @mouseleave="hoverBarVisible = false"
                    :style="{ background: 'linear-gradient(to top, transparent, ' + colors.find(color => color.color_id == id_color)?.hex_code + ')' }">
                </div>
                <section id="resourceCardsContainer">
                    <div class="resourceCard" v-if="resourceCards.length != 0" v-for="card in resourceCards">
                        <HandCard :card="card" @getMousePosition=""></HandCard>
                    </div>
                </section>
                <section id="playerStats"
                    :style="{ backgroundColor: `${colors.find(color => color.color_id == id_color)?.hex_code}20` }">
                    <div id="buildings">
                        <div class="building">
                            <Road id="road" :rotation="0"
                                :color="colors.find(color => color.color_id == id_color)?.hex_code"></Road>
                            <p id="roadAmount"> {{ buildings.find(building => building.buildingItemTypeId ==
                                (store.state.STOREitemTypes.find(item => item.name ==
                                    'road')?.item_type_id))?.amount }}/{{ store.state.STOREmaxRoads }}</p>
                        </div>
                        <div class="building">
                            <Settlement id="settlement" :color="colors.find(color => color.color_id == id_color)?.hex_code">
                            </Settlement>
                            <p id="settlementAmount">{{ buildings.find(building => building.buildingItemTypeId ==
                                (store.state.STOREitemTypes.find(item => item.name ==
                                    'settlement')?.item_type_id))?.amount }}/{{ store.state.STOREmaxSettlements }}</p>
                        </div>
                        <div class="building">
                            <City id="city" :color="colors.find(color => color.color_id == id_color)?.hex_code"></City>
                            <p id="cityAmount">{{ buildings.find(building => building.buildingItemTypeId ==
                                (store.state.STOREitemTypes.find(item => item.name ==
                                    'city')?.item_type_id))?.amount }}/{{ store.state.STOREmaxCities }}</p>
                        </div>
                    </div>
                </section>
            </section>
            <section id="specialCardsScrollContainer"
                :style="{ backgroundColor: colors.find(color => color.color_id == id_color)?.hex_code }">
                <div v-if="specialCards.length != 0" v-for="card in specialCards">
                    <SpecialHandCard :card="card"></SpecialHandCard>
                </div>
            </section>
        </section>
        <section id="bottomBar"
            :style="{ 'z-index': choosenName ? 30 : 10, 'borderTop': '0.15em solid ' + colors.find(color => color.color_id == id_color)?.hex_code, backgroundColor: `${colors.find(color => color.color_id == id_color)?.hex_code}50` }">
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
// Vue importieren
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

// Supabase importieren
import { supabase } from '@/lib/supabaseClient';

// Route importieren
import { useRoute } from 'vue-router';

// Store importieren
import { useStore } from 'vuex';
const store = useStore();

// Components importieren
import SpecialHandCard from '@/components/SpecialHandCard.vue';
import City from '@/components/City.vue';
import Road from '@/components/Road.vue';
import Settlement from '@/components/Settlement.vue';
import HandCard from '@/components/HandCard.vue';

// Variables
const id_session = useRoute().params.id;
const id_color = useRoute().query.playerColor;
let colors = ref([]);
const playerId = ref();
const sessionCode = ref();
const boardPosition = ref();
let firstTimeInitializing = ref(true);

let hoverBarVisible = ref(false);
let chooseName = ref(false)
let choosenName = ref(true);
let playerName = ref();
let mousePosition = ref({ mouseXPosition: 0, mouseYPosition: 0 });

// DOM
const flyingCard = ref(null);
const gameBox = ref(null);

///////////////////////////////////// Computed ////////////////////////////////

// Array, welches alle specialCards des Spielers enthält
// --> Änderung von playerStats
let specialCards = computed(() => {
    if (store.state.STOREitemTypes.length === 0 || store.state.STOREplayerStats.length === 0) return []

    let tempSpecialCards = [];
    let specialCardNames = ['knight', 'road_building', 'year_of_plenty', 'monopoly', 'victory_point'];

    specialCardNames.forEach(specialCardName => {
        let tempIdItemType = store.state.STOREitemTypes.find(itemType => itemType.name === specialCardName).item_type_id;
        let tempAmount = store.state.STOREplayerStats.find(card => card.id_item_type === tempIdItemType)?.amount;
        for (let i = 0; i < tempAmount; i++) {
            tempSpecialCards.push({ specialCardItemTypeId: tempIdItemType });
        }
    })

    return tempSpecialCards;
})

// Array, welches alle resourceCards des Spielers enthält
// --> Änderung von playerStats
let resourceCards = computed(() => {
    if (store.state.STOREitemTypes.length === 0 || store.state.STOREplayerStats.length === 0) return []

    let tempResourceCards = [];
    let resourceCardNames = ['brick', 'lumber', 'ore', 'grain', 'wool'];

    resourceCardNames.forEach(resourceCardName => {
        let tempIdItemType = store.state.STOREitemTypes.find(itemType => itemType.name === resourceCardName).item_type_id;
        tempResourceCards.push({ resourceCardItemTypeId: tempIdItemType, amount: store.state.STOREplayerStats.find(card => card.id_item_type === tempIdItemType)?.amount });
    })

    return tempResourceCards;
})

// Array, welches alle Buildings des Spielers enthält
// --> Änderung von playerStats
let buildings = computed(() => {
    if (store.state.STOREitemTypes.length === 0 || store.state.STOREplayerStats.length === 0) return []

    let tempBuildings = [];
    let buildingNames = ['settlement', 'city', 'road'];

    buildingNames.forEach(buildingName => {
        let tempIdItemType = store.state.STOREitemTypes.find(itemType => itemType.name === buildingName).item_type_id;
        tempBuildings.push({ buildingItemTypeId: tempIdItemType, amount: store.state.STOREplayerStats.find(card => card.id_item_type === tempIdItemType)?.amount });
    })

    return tempBuildings;
})

// Variable, welche die Art der flyingCard beinhaltet
// --> Änderung von draggedCard (store)
let flyingCardType = computed(() => {
    if (store.state.STOREitemTypes.length === 0 || store.state.STOREdraggedCard === null) return 'classic_back'

    return store.state.STOREitemTypes.find(itemType => itemType.item_type_id === store.state.STOREdraggedCard)?.name
})

// Variable, welche bestimmt, ob die flyingCard sichtbar ist oder nicht
// --> Änderung von draggedCard (store) 
let flyingCardVisible = computed(() => {
    if (store.state.STOREdraggedCard === null) return 0

    return 1
})

// Variable, welche die Position der flyingCard beinhaltet
// --> Änderung von mousePosition
let flyingCardPositionTop = computed(() => {
    if (flyingCard.value === null) return 0
    return mousePosition.value.mouseYPosition - (flyingCard.value.getBoundingClientRect().height / 2);
})
let flyingCardPositionLeft = computed(() => {
    if (flyingCard.value === null) return 0
    return mousePosition.value.mouseXPosition - (flyingCard.value.getBoundingClientRect().width / 2);
})



///////////////////////////////////// Ende Computed ////////////////////////////////

///////////////////////////////////// ONMOUNT ////////////////////////////////
onMounted(() => {
    // Aktuelle Player ID aus der Datenbank holen
    fetchCurrentPlayerId();

    // Alle Item-Typen aus der Datenbank holen
    fetchItemTypes();

    // Session Code aus der Datenbank holen
    fetchSessionCode();

    // Alle Farben aus der Datenbank holen
    fetchColors();

    // overflow: hidden; damit die Seite nicht gescrollt werden kann
    document.body.style.overflow = 'hidden';
})

///////////////////////////////////// Ende ONMOUNT ////////////////////////////////



///////////////////////////////////// ONBEFOREUNMOUNT ////////////////////////////////

// overflow: auto; wieder aktivieren beim Verlassen der Seite
onBeforeUnmount(() => {
    document.body.style.overflow = '';
})

///////////////////////////////////// Ende ONBEFOREUNMOUNT ////////////////////////////////



///////////////////////////////////// Methoden ////////////////////////////////
// Funktion, welche prüft, ob der Name schon vergeben ist
// --> Button im NamePopUp
function checkNameAvailability(event) {
    event.preventDefault();

    // Variable, definierter Name des Players, aus dem Formular auslesen
    playerName.value = event.target[0].value.trim();

    fetchGetAllPlayerNames();
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

// Funktion, die aufgerufen wird, wenn der Player die Handkarte loslässt
// --> HandCard (mouseUp)
function stopFlyingCard() {
    mousePosition.value.mouseXPosition = null;
    mousePosition.value.mouseYPosition = null;
    console.log(store.state.STOREdraggedCard, hoverBarVisible.value)
    if (store.state.STOREdraggedCard != null && hoverBarVisible.value) {
        let tempItemAmount = store.state.STOREplayerStats.find(item => item.id_item_type == store.state.STOREdraggedCard)?.amount
        fetchChangeRelTable(store.state.STOREdraggedCard, tempItemAmount);
    }
    store.commit('STOREsetDraggedCard', null)
}

function trackMousePosition(event, input) {
    // Die Mausposition wird in das Array mousePosition gespeichert
    if (input == 'touch') {
        mousePosition.value.mouseXPosition = event.touches[0].pageX;
        mousePosition.value.mouseYPosition = event.touches[0].pageY;

        let hoverBankLowerBorder = document.getElementById('hoverBar').getBoundingClientRect().bottom;

        console.log(hoverBankLowerBorder)

        if (mousePosition.value.mouseYPosition < hoverBankLowerBorder) {
            console.log('true')
            hoverBarVisible.value = true
        } else {
            console.log('false')
            hoverBarVisible.value = false
        }
    } else if (input == 'mouse') {
        mousePosition.value.mouseXPosition = event.clientX;
        mousePosition.value.mouseYPosition = event.clientY;
    }

}


///////////////////////////////////// Ende Methoden ////////////////////////////////

///////////////////////////////////// Fetch ////////////////////////////////

// Funktion, welche die Item-Daten, der aktuellen Session aus der Datenbank holt
// --> onMounted
const fetchItemTypes = async () => {
    try {
        const { data, error } = await supabase
            .from('item_type')
            .select()
        if (error) {
            console.error('Fehler:', error)
        } else {
            store.commit('STOREsetItemTypes', data);
        };
    }
    catch (e) {
        console.error('CatchFehler:', e)
    }
}

// Funktion, welche die Farben der aktuellen Session aus der Datenbank holt
// --> onMounted
const fetchColors = async () => {
    try {
        const { data, error } = await supabase
            .from('color')
            .select()
        if (error) {
            console.error('Fehler:', error)
        } else {
            colors.value = data;
        };
    }
    catch (e) {
        console.error('CatchFehler:', e)
    }
}


// Funktion, die die Player ID aus der Datenbank holt.
// Die id_session wird über die URL übergeben, die id_color wird über die URL übergeben
// Die Funktion wird nur bei erstmaliger Initialisierung des Spieles einen Wert zurückgeben - sonst --> catch
const fetchCurrentPlayerId = async () => {
    try {
        const { data, error } = await supabase
            .from('player')
            .select('player_id')
            .eq('id_session', id_session)
            .eq('initialization_in_progress', true)
        if (error) {
            console.error('Fehler:', error)
        } else {
            // Bei erstmaliger initialisierung des Spiels erfolgreich - sonst -> catch
            playerId.value = data[0].player_id;

            fetchPlayerInitializeDone();

            fetchJoinGame();

            fetchPlayerPosition();

        };
    }
    catch (e) {
        // Bei wiedereinstieg ins Spiel
        try {
            const { data, error } = await supabase
                .from('player')
                .select('player_id')
                .eq('id_session', id_session)
                .eq('id_color', id_color)
            if (error) {
                console.error('Fehler:', error)
            } else {
                playerId.value = data[0].player_id;

                firstTimeInitializing.value = false;

                fetchJoinGame();

                fetchPlayerPosition();

            };
        }
        catch (e) {
            gameBox.value.style.display = 'none';
            alert('Dieser Spieler existiert nicht mehr.')
            console.error('CatchFehler:', e)
        }
    }
}


// Funktion, die die Initialisierung des Players beendet. player_id kommt aus der Funktion fetchCurrentPlayerId()
// in der Datenbank wird der Wert initialization_in_progress auf false gesetzt und der Wert id_color wird gesetzt
const fetchPlayerInitializeDone = async () => {
    // Der inizialisierende Spieler wird in der Datenbank als fertig markiert und ergänzt
    try {
        const { data, error } = await supabase
            .from('player')
            .update({ initialization_in_progress: false, id_color: id_color })
            .eq('player_id', playerId.value)
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

    if (firstTimeInitializing.value) {
        // Hier werden alle Rohstofftabellen generiert und auf 0 gesetzt
        let createItemTablePromises = store.state.STOREitemTypes.map((item_type) => {
            return fetchCreateItemTable(item_type.item_type_id)
        });

        // Abwarten, bis alle Tabelleneinträge generiert wurden

        await Promise.all(createItemTablePromises);

        firstTimeInitializing.value = false;
    }

    fetchDownloadPlayerStats();
}

// Funktion, die die Rohstofftabellen generiert und auf 0 setzt. Die Variable item_type_id kommt aus der Funktion joinGame() und wird 
// aus dem Array item_types.value ausgelesen mit einer forEach Schleife.
const fetchCreateItemTable = async (item_type_id) => {
    try {
        const { data, error } = await supabase
            .from('rel_player_item')
            .insert([{ owner_id_player: playerId.value, id_item_type: item_type_id, amount: 0 }])
        if (error) {
            console.error('Fehler:', error)
        } else {
        };
    }
    catch (e) {
        console.error('CatchFehler:', e)
    }
}

// Aktueller Wert jedes Rohstoffs des Spielers aus der Datenbank holen und in playerStats speichern.
const fetchDownloadPlayerStats = async () => {
    try {
        const { data, error } = await supabase
            .from('rel_player_item')
            .select()
            .eq('owner_id_player', playerId.value)
        if (error) {
            console.error('Fehler:', error)
        } else {
            if (data.length != 0) {
                store.commit('STOREsetPlayerStats', data);
            } else {
                firstTimeInitializing.value = true;
                fetchJoinGame();
            }
        };
    }
    catch (e) {
        console.error('CatchFehler:', e)
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


// Funktion, welche in der Datenbank schaut, ob der Player schon einen Namen hat. Wenn nicht, wird das PopUp angezeigt.
const fetchShowNamePopUp = async () => {
    try {
        const { data, error } = await supabase
            .from('player')
            .select('name')
            .eq('player_id', playerId.value)
        if (error) {
            console.error('Fehler:', error)
        } else {
            if (data[0].name == null) {
                choosenName.value = false;
            } else {
                choosenName.value = true;

                fetchDownloadPlayerName()
            }
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
            .eq('player_id', playerId.value)
        if (error) {
            console.error('Fehler:', error)
        } else {
            playerName.value = data[0].name;
        };
    }
    catch (e) {
        console.error('CatchFehler:', e)
        gameBox.value.style.display = 'none';
        alert('Dieser Spieler existiert nicht mehr.')
    }
}

// Funktion, welche den Namen des Players in der Datenbank speichert. playerName kommt aus der Funktion definePlayerName()
const fetchDefinePlayerName = async () => {
    try {
        const { data, error } = await supabase
            .from('player')
            .update({ name: playerName.value })
            .eq('player_id', playerId.value)
        if (error) {
            console.error('Fehler:', error)
        } else {
            fetchDownloadPlayerName()
        };
    }

    catch (e) {
        console.error('CatchFehler:', e)
        gameBox.value.style.display = 'none';
        alert('Dieser Spieler existiert nicht mehr.')
    }
}

// Position des Spielers ermitteln
const fetchPlayerPosition = async () => {

    try {
        const { data, error } = await supabase
            .from('player')
            .select('board_position')
            .eq('player_id', playerId.value)

        if (error) {
            console.error('Fehler:', error);
        } else {
            boardPosition.value = data[0].board_position;
        }
    }
    catch (e) {
        console.error('CatchFehler:', e)
    }
}


// Funktion, welche die Datenbank anpasst, sobald man eine Karte ausspielt
const fetchChangeRelTable = async (tempItemTypeId, tempItemAmount) => {

    try {
        const { data, error } = await supabase
            .from('rel_player_item')
            .update({ amount: tempItemAmount - 1 })
            .eq('owner_id_player', playerId.value)
            .eq('id_item_type', tempItemTypeId)

        if (error) {
            console.error('Fehler:', error);
        } else {
        }
    }
    catch (e) {
        console.error('CatchFehler:', e)
    }

    fetchChangeRelPlayerItemPlayed(tempItemTypeId);
}

// In Relationstabelle vom MainDevice (rel_player_item_played) wird die Karte hinzugefügt
const fetchChangeRelPlayerItemPlayed = async (tempItemTypeId) => {

    try {
        const { data, error } = await supabase
            .from('rel_player_item_played')
            .insert([{ owner_id_player: playerId.value, id_item_type: tempItemTypeId, position: boardPosition.value }])

        if (error) {
            console.error('Fehler:', error);
        } else {
        }
    }
    catch (e) {
        console.error('CatchFehler:', e)
    }
}

// Funktion, welche die Position des Spielers in der Datenbank löscht
// --> Button in NamePopUp
const fetchRemoveOwnPosition = async () => {
    try {
        const { data, error } = await supabase
            .from('player')
            .update({ board_position: null })
            .eq('player_id', playerId.value)

        if (error) {
            console.error('Fehler:', error);
        } else {
            chooseName.value = false;
        }
    }
    catch (e) {
        console.error('CatchFehler:', e)
        gameBox.value.style.display = 'none';
        alert('Dieser Spieler existiert nicht mehr.')
    }
}

// Funktion, welche alle Namen der Spieler aus der Datenbank holt
const fetchGetAllPlayerNames = async () => {
    try {
        const { data, error } = await supabase
            .from('player')
            .select('name')
            .eq('id_session', id_session)

        if (error) {
            console.error('Fehler:', error);
        } else {
            let tempPlayerNames = [];
            data.forEach(player => {
                tempPlayerNames.push(player.name);
            })

            if (tempPlayerNames.includes(playerName.value)) {
                alert('Dieser Name ist bereits vergeben.')
            } else {
                // Fetch aufruf: Werte in Datenbank schreiben
                if (playerName.value != '' ) {
                    chooseName.value = false;

                    // Fetch aufruf: Werte in Datenbank schreiben
                    fetchDefinePlayerName();
                }
            }
        }
    }
    catch (e) {
        console.error('CatchFehler:', e)
    }
}

///////////////////////////////////// Ende Fetch ////////////////////////////////

///////////////////////////////////// EventListener ////////////////////////////////

///////////////////////////////////// Ende EventListener ////////////////////////////////

///////////////////////////////////// Watcher ////////////////////////////////

supabase
    .channel('rel_player_item')
    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'rel_player_item' }, (payload) => {
        if (payload.new.owner_id_player == playerId.value) {
            fetchDownloadPlayerStats();
        }
    })
    .subscribe()

supabase
    .channel('player')
    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'player' }, (payload) => {
        if (payload.new.player_id == playerId.value) {
            fetchDownloadPlayerStats()
            fetchShowNamePopUp()
            fetchPlayerPosition();
        }
    })
    .subscribe()

///////////////////////////////////// Ende Watcher ////////////////////////////////


</script>

<style scoped>
h2 {
    margin: 0;
}

#zahnradButton {
    padding: 0;
    background-color: transparent;
    color: #000;
    border-radius: 0;
    cursor: pointer;
    height: 100%;
    margin-right: 5px;
    margin-top: 0;
}

#zahnrad {
    width: 100%;
    height: 100%;
}

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
    z-index: 20;
}

#gameBox {
    width: 100vw;
    height: 100dvh;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    user-select: none;

}

#middleBar {
    height: 90dvh;
    display: flex;
}

#bottomBar {
    height: 10vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 10;
    flex-direction: row;
    background-color: white;
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

#mainBox {
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
}

#specialCardsScrollContainer {
    height: 100%;
    width: 25vw;
    overflow-y: scroll;
    flex-direction: column;
    gap: 10px;
    display: flex;
    align-items: center;
    padding: 10px;
}

#hoverBar {
    height: 10dvh;
    display: flex;
    flex-shrink: 0;
    z-index: 16;
    transition: opacity 0.3s ease;
    opacity: 0;
}

#hoverBar:hover {
    opacity: 1;
}

#resourceCardsContainer {
    height: 70dvh;
    background-color: white;
    flex-direction: row;
    display: flex;
    align-items: center;
    justify-content: center;
}

#playerStats {
    padding: 0 calc(5px + 0.2em);
    height: 10dvh;
    display: flex;
    flex-shrink: 0;
    z-index: 10;
    width: 100%;
    justify-content: right;
    flex-direction: row;
    align-items: center;
}





#road {
    aspect-ratio: 1/1;
    height: 80%;
    margin-right: 5px;
}

#settlement {
    aspect-ratio: 1/1;
    height: 80%;
    margin-right: 5px;
}

#city {
    aspect-ratio: 1/1;
    height: 90%;
    margin-right: 5px;
}

#roadAmount {
    width: 5rem
}

#settlementAmount {
    width: 5rem
}

#cityAmount {
    width: 5rem
}

.resourceCard {
    display: flex;
    margin: 0 -15px;
}

.flyingCard {
    position: absolute;
    width: 15vw;
    z-index: 15;
    pointer-events: none;
}

.flyingCardContainer {
    overflow: hidden;
    position: absolute;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
}

#buildings {
    height: 100%;
    display: flex;
    flex-shrink: 0;
    flex-direction: row;
    gap: 2em;
}

.building {
    height: 100%;
    align-items: center;
    display: flex;
    flex-direction: row;
}

#buttonChooseName {
    margin-left: 1rem;
}
</style>