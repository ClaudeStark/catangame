<template>
    <section id="activeSession">
        <h3>{{ session.title }}</h3>
        <form @submit="checkCode">
            <input ref="enterCode" type="text" id="enterCode" placeholder="enter Code" v-model="dynamicCode">
            <button type="submit" aria-label="enter Code:">Join</button>
        </form>
    </section>
</template>

<script setup>
// Vue importieren
import { ref, onMounted } from 'vue';

// Router importieren
import router from '@/router';

// Props
let propSession = defineProps(['session']);

// Variablen
let session = ref(propSession.session);
let dynamicCode = ref('');

// DOM Elemente
const enterCode = ref(null);

// Methoden

// Funktion, welche den eingegebenen Code mit dem Session Code vergleicht
// --> onSubmit (Form @submit)
function checkCode(event) {
    event.preventDefault();
    if (dynamicCode.value.trim() == session.value.code) {
        createWaitingroom();
    } else {
        enterCode.value.style.border = '1px solid red';
    }
}

// Funktion, welche den User in den Waitingroom weiterleitet
// --> checkCode()
function createWaitingroom() {
    router.push({ name: 'waitingroom', params: { id: session.value.session_id }, query: { session_title: session.value.title } })
}

// OnMounted
onMounted(() => {
    addEventListener();
})

// EventListener
function addEventListener() {
    enterCode.value.addEventListener('focus', () => {
        enterCode.value.style.border = '1px solid #ccc';
    })
}
</script>

<style scoped>
label {
    overflow: hidden;
}

h3 {
    margin-right: 2em;
}

button {
    margin-top: 0;
}

@media screen and (max-width: 600px) {
    h3 {
        margin-bottom: 1em;
    }

    form {
        display: flex;
        flex-direction: row;
        text-align: center;
    }
}
</style>