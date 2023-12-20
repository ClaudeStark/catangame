<template>
    <section id="activeSession">
        <h3>{{ session.title }}</h3>
        <form @submit="checkCode">
            <input type="text" id="enterCode" placeholder="enter Code" v-model="dynamicCode">
            <button type="submit" aria-label="enter Code:">Join</button>
        </form>
    </section>
</template>

<script setup>
// Vue importieren
import { ref } from 'vue';

// Router importieren
import router from '@/router';

// Props
let propSession = defineProps(['session']);

// Variablen
let session = ref(propSession.session);
let dynamicCode = ref('');

// Methoden
function checkCode(event) {
    event.preventDefault();
    if (dynamicCode.value.trim() == session.value.code) {
        createWaitingroom();
    } else {
        alert('wrong code');
    }
}

function createWaitingroom() {
    router.push({ name: 'waitingroom', params: { id: session.value.session_id }, query: { session_title: session.value.title } })
}
</script>

<style scoped>
h3 {
    margin-right: 2em;
}

label {
    overflow: hidden;
}

@media screen and (max-width: 768px) {
    h3{
        margin-bottom: 1em;
    }
    form {
        display: flex;
        flex-direction: row;
        text-align: center;
    }
}
</style>