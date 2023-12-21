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
    <section id="buttons">
        <button @click="buttonClick(colors.indexOf(color), color)" class="colorButton" v-for="color in colors"
            :style="'background-color: ' + color" :id="'button' + colors.indexOf(color)"></button>
    </section>
    <section id="qrCodes">
        <div class="qrCode" v-html="qrCodeSVG"></div>
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

// QRCode importieren
import QRCode from 'qrcode-generator';

// Variablen
let sessionTitle = useRoute().query.session_title;
let session = ref([{}]);
let qrCodeSVG = ref('');
let colors = ref([]);
let pickedColors = [];

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
    fetchGetSession()
})

///////////////////////////////////// Initialisierung beendet ////////////////////////////////
////////////////////////////////////// Deklaration der Funktionen ////////////////////////////

// Anhand des Session Titels wird die Session ID aus der Datenbank geholt. Der Sessiontitel wird über die URL übergeben
const fetchGetSession = async () => {
    try {
        const { data, error } = await supabase
            .from('session')
            .select()
            .eq('title', sessionTitle)
        if (error) {
            console.error('Fehler:', error)
        } else {
            console.log('Geklappt:', data)
            session.value = data;
            // Sobald die Session ID bekannt ist, werden die Farben aus der Datenbank geholt
            fetchGetColors();
        }
    }
    catch (e) {
        console.error('CatchFehler:', e)
    }
}


// Funktion, die die Farben aus der Datenbank holt. Darauf basiert die Anzahl der Buttons und die Farbe der Buttons. 
const fetchGetColors = async () => {
    try {
        const { data, error } = await supabase
            .from('color')
            .select()
        if (error) {
            console.error('Fehler:', error)
        } else {
            //console.log('Geklappt:', data);
            data.forEach(color => {
                colors.value.push(color.hex_code)
            });
            // Bereits vergebene Farben ausgrauen
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
    let id_session = session.value[0].session_id;
    //console.log(id_session)
    try {
        const { data, error } = await supabase
            .from('player')
            .select('id_color')
            .eq('id_session', id_session)
        if (error) {
            console.error('Fehler:', error)
        } else {
            //console.log('Geklappt:', data)

            // Benutzte Knöpfe ausblenden
            data.forEach(colorIndex => {
                if (colorIndex.id_color != null) {
                    document.querySelector('#button' + colorIndex.id_color).style.backgroundColor = '#2c3e50';
                    document.querySelector('#button' + colorIndex.id_color).style.borderColor = '#2c3e50';
                    pickedColors.push(colorIndex.id_color);
                }
            });
        }
    }
    catch (e) {
        console.error('CatchFehler:', e)
    }
}

// Funktion, die aufgerufen wird, wenn ein Button angeklickt wird. colorIndex ist der Index des angeklickten Buttons, color ist die Farbe des Buttons
function buttonClick(colorIndex, color) {

    let id_session = session.value[0].session_id;

    // Schauen, ob der angeklickte Button in pickedColors enthalten ist = schon mal definiert wurde - nicht mehr anklickbar sein darf
    if (!pickedColors.includes(colorIndex)) {

        // Abfrage an die Datenbank, ob bereits ein Spieler am initialisieren ist. Rückgabewert des Fetches ist ein Array, wdessen Länge relevant für die Unterscheidung ist
        fetchCheckPendingInitialization().then((result) => {
            if (result.length == 0) {
                fetchCreatePlayer(id_session);
            }
        });

        // Alle noch nicht gewählten Buttons werden wieder farbig basierend auf dem Array pickedColors
        colors.value.forEach(color => {
            if (!pickedColors.includes(colors.value.indexOf(color))) {
                document.querySelector('#button' + colors.value.indexOf(color)).style.backgroundColor = color;
                document.querySelector('#button' + colors.value.indexOf(color)).style.borderColor = 'white';

            }
        });

        // Angeklickter Button wird ausgegraut
        let currentButton = document.querySelector('#button' + colorIndex);
        currentButton.style.backgroundColor = 'white';
        currentButton.style.borderColor = color;

        // QR-Code wird generiert für den ersten Spieler, der in der Datenbank generiert wurde
        generateQRCode(id_session, color, colorIndex);
    }
    console.log(window.location.origin + '/sidedevice/' + id_session + '?' + 'playerColor=' + colorIndex);
}

// Funktion, die den QR-Code generiert basierend auf der Session ID und der Farbe des Spielers. id_session kommt von der Funktion
// buttonClick. colorIndex kommt von der Funktion buttonClick. color kommt von der Funktion buttonClick
function generateQRCode(id_session, color, colorIndex) {
    const qr = QRCode(0, 'M'); // Erstelle eine neue QRCode-Instanz
    qr.addData(window.location.origin + '/sidedevice/' + id_session + '?' + 'playerColor=' + colorIndex); // Füge die Daten hinzu
    qr.make(); // Generiere den QR-Code
    qrCodeSVG.value = qr.createSvgTag(getQrCodeSize.value); // Erstelle ein Data URL für das Bild
    // Notwendig, solange auf Localhost getestet wird um den QR-Code zu "scannen"
    console.log(window.location.origin + '/sidedevice/' + id_session + '?' + 'playerColor=' + colorIndex);

}

// Funktion, die das Spiel startet. Dazu wird die Session ID und der Titel an die URL angehängt und die Seite gewechselt
// Es wird geprüft, ob die Session bereits initialisiert wurde. Wenn nicht, wird die Session initialisiert
function gameStart() {
    if (session.value[0].initialization_in_progress == true) {
        fetchInitializeSession(session.value[0].session_id);
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
            //console.log('Geklappt:', data);
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
            //console.log('Geklappt:', data)
            return data;
        };
    }

    catch (e) {
        console.error('CatchFehler:', e)
    }

}

// Funktion, die die Session initialisiert. Dazu wird der Wert initialization_in_progress auf false gesetzt
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
            console.log('Geklappt:3', data);
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
            console.log('Geklappt:4', data);
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
            console.error('Fehler:', error);
        } else {
            console.log('Geklappt:5', data);
        }
    }
    catch (e) {
        console.error('CatchFehler:', e)
    }
}


// Realtime Subscription zum Player Table um bereits vergebene Farbwahlen auszugrauen

supabase
    .channel('player')
    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'player' }, (payload) => {
        if (payload.new.id_session == session.value[0].session_id) {
            checkpickedColor()
            console.log('Isch was passiert');
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

#backToSessions {
    background-color: #2c3e50;
    color: white;
}


h3 {
    margin-bottom: 1em;
}

#buttons {
    width: 100%;
    padding: 1em 0;
    color: white;
    background-color: #2c3e50;
}

#playerInitialitation {
    display: flex;
    flex-direction: column;
    background-color: #f2f2f2;
    border-radius: 8px;
    padding: 10px;
    max-width: fit-content;
    margin-bottom: 2em;

}

.colorButton {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 5px solid white;
    margin: 10px;
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
