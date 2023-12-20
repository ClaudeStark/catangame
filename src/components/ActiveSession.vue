<template>
    <h3>{{ session.title }}</h3>
    <form @submit="checkCode">
        <label for="enterCode">enter Code:</label>
        <input type="text" id="enterCode" v-model="dynamicCode">
        <button type="submit">Join</button>
    </form>
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

<style></style>