<template>
    <h1>{{ session[0].title }}</h1>
    <h2>Code: {{ session[0].code }}</h2>
    <section id="navigation">
        <button id="backToSessions" @click="router.push('/session')">Back to Sessions</button>
        <button id="startGameButton" @click="gameStart()">Start Game</button><br>
    </section>
    <section id="playerInitialitation">
        <h3>Player Initialization</h3>
        <p>Each player in turn has to choose his desired color. After picking the color, scan your personal QR-Code with
            your mobile phone to join the playfield.</p>
    </section>
    <section v-if="firstPlayerInizialized" id="rejoinGameSection">
        <button id="rejoinGame" @click="setRejoinGame('rejoin')">{{ rejoinGame ? 'Close' : 'Rejoin Player in Game'
        }}</button>
        <section id="currentPlayers" v-if="rejoinGame">
            <div v-for="player in currentPlayingPlayers" id="currentPlayingPlayerContainer">
                <CurrentPlayingPlayer :player="player" @generateQRCode="generateQRCode"></CurrentPlayingPlayer>
            </div>
            <button v-if="showRejoinButton" @click="setRejoinGame('refresh')">Refresh joinable Player in Game</button>
        </section>

    </section>
    <section id="buttons">
        <button @click="buttonClick(color.color_id, color.hex_code)" class="colorButton" v-for="color in colors"
            :style="'background-color: ' + color.hex_code" :id="'button' + color.color_id"></button>
    </section>
    <section id="qrCodes" ref="qrCodes">
        <div class="qrCode" v-html="qrCodeSVG"></div>
    </section>
    <section>
        <button id="deleteSession" @click="deleteSession()">Delete this Session</button>
    </section>
</template>

<script setup>
// Route importieren
import { useRoute } from 'vue-router';

// Router importieren
import router from '@/router';

// Vue importieren
import { ref, onMounted, computed } from 'vue'

// Supabase importieren
import { supabase } from '@/lib/supabaseClient'

// Store importieren
import { useStore } from 'vuex';
const store = useStore();

// QRCode importieren
import QRCode from 'qrcode-generator';

// Komponenten importieren
import CurrentPlayingPlayer from '@/components/CurrentPlayingPlayer.vue';

// Variablen
let sessionTitle = useRoute().query.session_title;
let session = ref([{}]);
let qrCodeSVG = ref('');
let colors = ref([]);
let pickedColors = ref([]);
let allPlayerData = ref([]);
let rejoinGame = ref(false);
let currentPlayingPlayers = ref([]);
let showRejoinButton = ref(false);

// DOM Elemente
const qrCodes = ref(null);

// Computed
let getQrCodeSize = computed(() => {
    if (window.innerWidth < 500) {
        return 8;
    } else {
        return 15;
    }
})




// OnMounted
onMounted(() => {
    // Sessioninformationen aus der Datenbank holen
    fetchGetSession()

    // Item Types aus der Datenbank holen  
    fetchItemTypes();


})

///////////////////////////////////// Initialisierung beendet ////////////////////////////////


////////////////////////////////////// Computed Properties ////////////////////////////////

// Variabel, die anzeigt, ob bereits ein Spieler inizialisiert wurde
// --> allPlayerData
let firstPlayerInizialized = computed(() => {
    let tempFirstPlayerInizialized = false;
    allPlayerData.value.forEach(player => {
        if (player.initialization_in_progress == false && player.id_color != 0) {
            tempFirstPlayerInizialized = true;
        }
    });
    return tempFirstPlayerInizialized;
})

////////////////////////////////////// Ende Computed Properties ////////////////////////////////

////////////////////////////////////// Methoden ////////////////////////////////

// Funktion, die die Session löscht
// --> deleteSession
function deleteSession() {
    confirm('Are you sure you want to delete this session?') ? fetchDeleteSession() : null;
}

// Funktion, welche die Variabel rejoinGame anpasst, je nach dem ob man auf rejoinGame klickt oder nicht
// --> click auf rejoinGame
function setRejoinGame(input) {
    if (rejoinGame.value && input == 'rejoin') {
        rejoinGame.value = false;
    } else {
        rejoinGame.value = true;

        // Alle Player, welche noch keinen Namen haben, werden aus der Datenbank gelöscht
        fetchUnMountNoNamePlayer();

        // Alle Player, welche an der Session teilnehmen, werden aus der Datenbank geholt und in das Array currentPlayingPlayers geschrieben
        fetchGetCurrentPlayingPlayers();

        // QR-Code wird geleert
        qrCodeSVG.value = '';
    }
}


////////////////////////////////////// Ende Methoden ////////////////////////////////

////////////////////////////////////// Deklaration der Fetches ////////////////////////////

// Anhand des Session Titels wird die Session ID aus der Datenbank geholt. Der Sessiontitel wird über die URL übergeben
// --> onMounted
const fetchGetSession = async () => {
    try {
        const { data, error } = await supabase
            .from('session')
            .select()
            .eq('title', sessionTitle)
        if (error) {
            console.error('Fehler:', error)
        } else {
            session.value = data;

            // Sobald die Session ID bekannt ist, werden die Farben aus der Datenbank geholt
            fetchGetColors();

            // Alle Player Daten aus der Datenbank holen
            fetchGetAllPlayerData();
        }
    }
    catch (e) {
        console.error('CatchFehler:', e)
    }
}

// Funktion, die die Farben aus der Datenbank holt. Darauf basiert die Anzahl der Buttons und die Farbe der Buttons. 
// --> fetchGetSession
const fetchGetColors = async () => {
    try {
        const { data, error } = await supabase
            .from('color')
            .select()
        if (error) {
            console.error('Fehler:', error)
        } else {
            colors.value = data;

            // Funktion, welche die bereits vergebenen Farben ausblendet
            checkpickedColor()
        };
    }

    catch (e) {
        console.error('CatchFehler:', e)
    }
}

// Funktion, welche die durch Spielerinitialisierung bereits vergebenen Farben aus der Datenbank holt und die Buttons
// entsprechend ausgraut/pinkt. Ausserdem wird das Array pickedColors gefüllt, welches die id bereits vergebenen Farben enthält
// Die Funktion reagiert auf Änderungen in der Datenbank, da sie als Realtime Subscription aufgerufen wird
const checkpickedColor = async () => {
    let id_session = session.value[0].session_id; // !!!

    try {
        const { data, error } = await supabase
            .from('player')
            .select('id_color')
            .eq('id_session', id_session)
        if (error) {
            console.error('Fehler:', error)
        } else {

            // console.log(data)
            // Alle Knöpfe werden wieder farbig
            colors.value.forEach(color => {
                document.querySelector('#button' + color.color_id).style.backgroundColor = color.hex_code;
                document.querySelector('#button' + color.color_id).style.borderColor = 'white';
                document.querySelector('#button' + color.color_id).style.cursor = 'pointer'
            });

            pickedColors.value = [];
            // Benutzte Knöpfe in die gleiche Farbe wie Hintergrund setzen

            data.forEach(colorIndex => {
                // console.log(colorIndex)
                if (colorIndex.id_color != null && colorIndex.id_color != 0) {
                    document.querySelector('#button' + colorIndex.id_color).style.backgroundColor = '#1D4B3C';
                    document.querySelector('#button' + colorIndex.id_color).style.borderColor = '#1D4B3C';
                    document.querySelector('#button' + colorIndex.id_color).style.cursor = 'default'
                    pickedColors.value.push(colorIndex.id_color);
                }
            });
        }
    }
    catch (e) {
        console.error('CatchFehler:', e)
    }
}

// Funktion, die aufgerufen wird, wenn ein Button angeklickt wird. colorIndex ist der Index des angeklickten Buttons, color ist die Farbe des Buttons
// --> v-for in der HTML 
function buttonClick(colorIndex, colorHexCode) {

    let id_session = session.value[0].session_id;

    // Schauen, ob der angeklickte Button in pickedColors enthalten ist = schon mal definiert wurde - nicht mehr anklickbar sein darf
    if (!pickedColors.value.includes(colorIndex)) {

        // Abfrage an die Datenbank, ob bereits ein Spieler am initialisieren ist. Rückgabewert des Fetches ist ein Array, wessen Länge relevant für die Unterscheidung ist
        fetchCheckPendingInitialization().then((result) => {
            if (result.length == 0) {
                fetchCreatePlayer(id_session);
            }
        });

        // Alle noch nicht gewählten Buttons werden wieder farbig basierend auf dem Array pickedColors
        colors.value.forEach(color => {
            if (!pickedColors.value.includes(color.color_id)) {
                document.querySelector('#button' + color.color_id).style.backgroundColor = color.hex_code;
                document.querySelector('#button' + color.color_id).style.borderColor = 'white';
            }
        });

        // Angeklickter Button wird ausgegraut
        let currentButton = document.querySelector('#button' + colorIndex);
        currentButton.style.backgroundColor = 'white';
        currentButton.style.borderColor = colorHexCode;

        // rejoinGame wird false gesetzt, wenn pickedColors noch leer ist
        if (pickedColors.value.length == 0) {
            rejoinGame.value = false;
        }


        // QR-Code wird generiert für den ersten Spieler, der in der Datenbank generiert wurde
        generateQRCode(id_session, colorHexCode, colorIndex);
    }
    // console.log(window.location.origin + '/sidedevice/' + id_session + '?' + 'playerColor=' + colorIndex);
}

// Funktion, die den QR-Code generiert basierend auf der Session ID und der Farbe des Spielers. id_session kommt von der Funktion
// buttonClick. colorIndex kommt von der Funktion buttonClick. color kommt von der Funktion buttonClick
function generateQRCode(id_session, color, colorIndex) {
    const qr = QRCode(0, 'M'); // Erstelle eine neue QRCode-Instanz
    qr.addData(window.location.origin + '/sidedevice/' + id_session + '?' + 'playerColor=' + colorIndex); // Füge die Daten hinzu
    qr.make(); // Generiere den QR-Code
    qrCodeSVG.value = qr.createSvgTag(getQrCodeSize.value); // Erstelle ein Data URL für das Bild
    // Notwendig, solange auf Localhost getestet wird um den QR-Code zu "scannen"
    // console.log(window.location.origin + '/sidedevice/' + id_session + '?' + 'playerColor=' + colorIndex);
    setTimeout(function () {
        qrCodes.value.scrollIntoView({ behavior: 'smooth' });
    }, 50);

}

// Funktion, die das Spiel startet. Dazu wird die Session ID und der Titel an die URL angehängt und die Seite gewechselt
// Es wird geprüft, ob die Session bereits initialisiert wurde. Wenn nicht, wird die Session initialisiert
function gameStart() {
    if (session.value[0].initialization_in_progress == true) {
        fetchInitializeSession(session.value[0].session_id);

        // Ein neutraler Spieler wird in der Datenbank angelegt, dieser wird für den Räuber benötigt
        fetchCreateNeutralPlayer();
    }

    fetchClearPlayerInProgress(session.value[0].session_id);
    router.push({ name: 'maindevice', params: { id: session.value[0].session_id }, query: { session_title: session.value[0].title } })


}


// Funktion, die einen neuen Spieler in der Datenbank anlegt sofern kein Spieler daran ist, initialisiert zu werden.
// id_session kommt von der Funktion buttonClick.
const fetchCreatePlayer = async (id_session) => {
    try {
        const { data, error } = await supabase
            .from('player')
            .insert([{ id_session, initialization_in_progress: true }])
        if (error) {
            console.error('Fehler:', error)
        } else {
        };
    }

    catch (e) {
        console.error('CatchFehler:', e)
    }
}


// Funktion, die abfragt, ob bereits ein Spieler am initialisieren ist. Rückgabewert des Fetches ist ein Array, 
// dessen Länge relevant für die Unterscheidung ist. Bei Länge 0 ist kein Spieler am initialisieren, sonst schon.
const fetchCheckPendingInitialization = async () => {
    let id_session = session.value[0].session_id;
    try {
        const { data, error } = await supabase
            .from('player')
            .select('player_id')
            .eq('id_session', id_session)
            .eq('initialization_in_progress', 'true')

        if (error) {
            console.error('Fehler:', error)
        } else {
            return data;
        };
    }

    catch (e) {
        console.error('CatchFehler:', e)
    }

}

// Funktion, die die Session initialisiert. Dazu wird der Wert initialization_in_progress auf false gesetzt
// --> gameStart
const fetchInitializeSession = async (id_session) => {
    try {
        const { data, error } = await supabase
            .from('session')
            .update({ initialization_in_progress: 'false' })
            .eq('session_id', id_session)
            .eq('initialization_in_progress', 'true')
        if (error) {
            console.error('Fehler:', error);
        } else {
        }
    }
    catch (e) {
        console.error('CatchFehler:', e)
    }
}

// fetch um die Player, welche nicht initialisert wurden aus der Datenbank zu löschen
const fetchClearPlayerInProgress = async (id_session) => {
    let tempPlayerIdToBeDeleted;

    try {
        const { data, error } = await supabase
            .from('player')
            .select()
            .eq('id_session', id_session)
            .eq('initialization_in_progress', 'true')
        if (error) {
            console.error('Fehler:', error);
        } else {
            // console.log('Geklappt:4', data);
            tempPlayerIdToBeDeleted = data[0].player_id;
        }
    }
    catch (e) {
        console.error('Ein uns sehr bewusster und nicht weiter schlimmer CatchFehler:', e)
    }

    try {
        const { data, error } = await supabase
            .from('player')
            .delete()
            .eq('player_id', tempPlayerIdToBeDeleted)

        if (error) {
            console.error('Es gibt keine temporären Spieler, welche gelöscht werden müssten', error);
        } else {
            // console.log('Geklappt:5', data);
        }
    }
    catch (e) {
        console.error('CatchFehler:', e)
    }
}

// Funktion, die einen neutralen Spieler in der Datenbank anlegt. Dieser wird für den Räuber benötigt
// --> gameStart
const fetchCreateNeutralPlayer = async () => {
    try {
        const { data, error } = await supabase
            .from('player')
            .insert([{ id_session: session.value[0].session_id, id_color: 0 }])
        if (error) {
            console.error('Fehler:', error)
        } else {
            // ID des neutralen Spielers wird aus der Datenbank geholt
            fetchGetNeutralPlayerId();
        };
    }

    catch (e) {
        console.error('CatchFehler:', e)
    }
}

// Funktion, die die ID des neutralen Spielers aus der Datenbank holt. Diese wird für den Räuber benötigt
// --> fetchCreateNeutralPlayer
const fetchGetNeutralPlayerId = async () => {
    try {
        const { data, error } = await supabase
            .from('player')
            .select('player_id')
            .eq('id_session', session.value[0].session_id)
            .eq('id_color', 0)
        if (error) {
            console.error('Fehler:', error)
        } else {
            // Funktion, welche den Räuber in der Datenbank anlegt
            fetchCreateRobber(data[0].player_id);
        };
    }

    catch (e) {
        console.error('CatchFehler:', e)
    }
}

// Funktion, welche einen Räuber in der Datenbank anlegt
// --> fetchGetNeutralPlayerId
const fetchCreateRobber = async (neutralPlayerId) => {
    let tempIdItemType = store.state.STOREitemTypes.find(item => item.name === 'robber')?.item_type_id;
    try {
        const { data, error } = await supabase
            .from('rel_player_item_played')
            .insert([{ owner_id_player: neutralPlayerId, id_item_type: tempIdItemType, position: 143, rotation: 0 }])
        if (error) {
            console.error('Fehler:', error)
        } else {
        };
    }

    catch (e) {
        console.error('CatchFehler:', e)
    }
}

// Funktion, welche die ItemTypes aus der Datenbank holt
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

// Funktion, welche alle Player Daten aus der Datenbank holt
// --> Realtime Subscription
const fetchGetAllPlayerData = async () => {
    try {
        const { data, error } = await supabase
            .from('player')
            .select()
            .eq('id_session', session.value[0].session_id)
        if (error) {
            console.error('Fehler:', error)
        } else {
            allPlayerData.value = data;

        };
    }
    catch (e) {
        console.error('CatchFehler:', e)
    }
}

// Funktion, die den Spieler, welcher mounted ist aber noch keinen Namen hat die id_color auf null setzt
// --> setRejoinGame
const fetchUnMountNoNamePlayer = async () => {
    try {
        const { data, error } = await supabase
            .from('player')
            .delete()
            .eq('id_session', session.value[0].session_id)
            .is('name', null)
            .neq('id_color', '0');
        if (error) {
            console.error('Fehler:', error)
        } else {
            checkpickedColor();

            fetchGetAllPlayerData();
        };
    }
    catch (e) {
        console.error('CatchFehler:', e)
    }
}

// Funktion, die die Session aus der Datenbank löscht
// --> deleteSession
const fetchDeleteSession = async () => {
    try {
        const { data, error } = await supabase
            .from('session')
            .delete()
            .eq('session_id', session.value[0].session_id)
        if (error) {
            console.error('Fehler:', error)
        } else {

            fetchDeleteAllPlayer();

            router.push('/session');
        };
    }
    catch (e) {
        console.error('CatchFehler:', e)
    }
}

// Funktion, die alle Player dieser Session aus der Datenbank löscht
// --> fetchDeleteSession
const fetchDeleteAllPlayer = async () => {
    try {
        const { data, error } = await supabase
            .from('player')
            .delete()
            .eq('id_session', session.value[0].session_id)
        if (error) {
            console.error('Fehler:', error)
        } else {

            // Alle weiteren Einträge in den Tabellen werden durch die Foreign Keys gelöscht (cascade)
        };
    }
    catch (e) {
        console.error('CatchFehler:', e)
    }
}

// Funktion, welche alle Player, welche an der Session teilnehmen, aus der Datenbank holt und in das Array currentPlayingPlayers schreibt
// --> setRejoinGame
const fetchGetCurrentPlayingPlayers = async () => {
    try {
        const { data, error } = await supabase
            .from('player')
            .select()
            .eq('id_session', session.value[0].session_id)
            .neq('name', 'null')
            .neq('id_color', '0')
        if (error) {
            console.error('Fehler:', error)
        } else {
            currentPlayingPlayers.value = data;
            if (data.length > 0) {
                showRejoinButton.value = true;
            } else {
                showRejoinButton.value = false;
            }
        };
    }
    catch (e) {
        console.error('CatchFehler:', e)
    }
}


////////////////////////////////////// Ende Fetches ////////////////////////////////


// Realtime Subscription zum Player Table um bereits vergebene Farbwahlen auszugrauen

supabase
    .channel('player')
    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'player' }, (payload) => {
        if (payload.new.id_session == session.value[0].session_id) {
            checkpickedColor()

            fetchGetAllPlayerData();
        }
    })
    .subscribe()
</script>

<style scoped>
#navigation {
    display: flex;
    flex-direction: row;
    align-items: center;
}

#navigation button {
    margin: 2em 1em;
    min-width: 10em;
}

#rejoinGame {
    margin: 4rem 1rem 2rem 1rem;
    min-width: 10em;
}

#backToSessions {
    background-color: #A7C836;
    color: white;
}

#backToSessions:hover {
    background-color: #FADB42;
    color: white;
}


h3 {
    margin-bottom: 1em;
}

#buttons {
    width: 100%;
    padding: 1em 0;
    color: white;
    background-color: #1D4B3C;
}

#playerInitialitation {
    display: flex;
    flex-direction: column;
    background-color: #f2f2f2;
    border-radius: 8px;
    padding: 10px;
    max-width: fit-content;
}

.colorButton {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 5px solid white;
    margin: 10px;
}

.qrCode {
    overflow: auto;
}

#deleteSession {
    background-color: #EB66A2;
    margin-bottom: 1rem;
}

#deleteSession:hover {
    background-color: #943C8F;
}

#currentPlayers {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
}

#rejoinGameSection {
    width: 70%;
    margin-bottom: 2rem;
}

#currentPlayingPlayerContainer {
    width: 100%;

}

@media screen and (max-width: 600px) {
    .colorButton {
        width: calc(100vw / 5);
        height: calc(100vw / 5);
        border-radius: 50%;
        border: 5px solid white;
        margin: 5px;
    }
}
</style>
