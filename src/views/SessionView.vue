<template>
    <h1>SessionView</h1>
    <h2>Active Sessions</h2>
    <section id="activeSessions">
        <ul>
            <li v-for="session in sessions">
                <ActiveSession id="activeSession" :session="session">

                </ActiveSession>
            </li>
        </ul>
    </section>
    <section id="createNewSession">
        <h2>Create new Session</h2>
        <div id="warningText" ref="warning">{{ warningText }}</div>
        <form @submit="createSession">
            <label for="sessionTitle">Choose a Session Title: </label>
            <input type="text" id="sessionTitle" v-model="dynamicTitle">
            <label for="sessionCode">Choose a Session Code: </label>
            <input type="number" id="sessionCode" v-model="dynamicCode">
            <button type="submit">create new Session</button>
        </form>
    </section>
</template>

<script setup>
// Komponenten importieren
import ActiveSession from '@/components/ActiveSession.vue';

// Supabase importieren
import { supabase } from '@/lib/supabaseClient'

// Vue importieren
import { ref, onMounted, computed } from 'vue'

// Variablen
let sessions = ref([])
let dynamicTitle = ref('')
let dynamicCode = ref('')
let assignedTitle = ref(false)

// DOM Elemente
const warning = ref(null);

// Computed
let warningText = computed(() => {
    sessions.value.find(name => name.title === dynamicTitle.value.trim()) ? assignedTitle.value = true : assignedTitle.value = false
    return assignedTitle.value ? 'Please choose a title, that is not already taken.' : '';
})

// OnMounted
onMounted(() => {
    fetchGetOpenSessions()
})

const fetchGetOpenSessions = async () => {
    try {
        const { data, error } = await supabase
            .from('session')
            .select()
        if (error) {
            console.error('Fehler:', error)
        } else {
            console.log('Geklappt:', data)
            sessions.value = data;
        }
    }
    catch (e) {
        console.error('CatchFehler:', e)
    }
}

// Methoden
function createSession(event) {
    event.preventDefault();

    if (assignedTitle.value) return;

    // Inputfelder leeren
    dynamicTitle.value = '';
    dynamicCode.value = '';

    // Variablen aus dem Formular auslesen

    let title = event.target[0].value;
    let code = event.target[1].value;

    // Fetch aufruf: Werte in Datenbank schreiben
    fetchCreateSession(title, code);
}

const fetchCreateSession = async (title, code) => {
    try {
        const { data, error } = await supabase
            .from('session')
            .insert([{ title, code }])
        if (error) {
            console.error('Fehler:', error)
        } else {
            console.log('Geklappt:', data)
        }
    }
    catch (e) {
        console.error('CatchFehler:', e)
    }
}

// Realtime Subscriptions
supabase
    .channel('session')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'session' }, fetchGetOpenSessions)
    .subscribe()
</script>

<style scoped>
h1 {
    margin-bottom: 1em;
}

h2 {
    margin-bottom: 0.5em;
}

#activeSessions {
    display: flex;
    flex-direction: column;
    background-color: #f2f2f2;
    border-radius: 8px;
    padding: 10px;
    max-width: fit-content;
    margin-bottom: 5em;

}

#activeSession {
    display: flex;
    flex-direction: row;
    justify-content: right;
    align-items: center;
}

#activeSessions ul li:nth-child(even) {
    background-color: white;
}

ul {
    list-style: none;
    width: 100%;
}

li {
    padding: 1em;
}

label {
    margin-right: 0.5em;
    margin-left: 2em;
}

#createNewSession {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    position: sticky;
    bottom: 0;
    background-color: #f2f2f2;
    padding-bottom: 1em;
}

#createNewSession h2 {
    width: 100%;
    padding: 1em 0;
    color: white;
    background-color: #2c3e50;
}

#warningText {
    color: red;
    font-size: 0.8em;
    margin-bottom: 1em;
}

@media screen and (max-width: 1000px) {


    #createNewSession form {
        display: flex;
        justify-content: left;
        flex-direction: column;
    }

    #createNewSession label {
        margin-right: 0;
        margin-left: 0;
    }

    #createNewSession input {
        margin: 0.5em 0 1.5em 0;
    }

}

@media screen and (max-width: 600px) {
    #activeSession {
        flex-direction: column;
        align-items: center;
    }

    form {
        display: flex;
        justify-content: left;
        flex-direction: column;
    }

    label {
        margin-right: 0;
        margin-left: 0;
    }

    input {
        margin: 0.5em 0 1.5em 0;
    }
}
</style>
