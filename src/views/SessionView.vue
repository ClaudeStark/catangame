<template>
    <h1>SessionView</h1>
    <section id="activeSessions">
        <ul>
            <li v-for="session in sessions">
                <ActiveSession :session="session">

                </ActiveSession>
            </li>
        </ul>
    </section>
    <section id="createNewSession">
        <form @submit="createSession">
            <label for="sessionTitle">Title:</label>
            <input type="text" id="sessionTitle" v-model="dynamicTitle">
            <label for="sessionCode">Code:</label>
            <input type="number" id="sessionCode" v-model="dynamicCode">
            <button type="submit">Session erstellen</button>
        </form>
        <div ref="warning"><mark>{{ warningText }}</mark></div>
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

    return assignedTitle.value ? 'scho vergää' : '';
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

<style scoped></style>
