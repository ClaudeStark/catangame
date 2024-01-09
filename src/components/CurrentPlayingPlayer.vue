<template>
    <section id="currentPlayingPlayer">
        <h3 id="playerName">
            {{ player.name }}
        </h3>
        <button @click="generateQRCode">
            Generate QR-Code
        </button>
    </section>
</template>

<script setup>
// Vue importieren
import { defineEmits } from 'vue'

// Props definieren
const props = defineProps({
    player: Object
})

// Emit definieren
const emit = defineEmits();

/////////////////////////////////////////////// Methoden ///////////////////////////////////////////////

// Funktion, welche den QR-Code generiert
function generateQRCode() {
    // console.log('generateQRCode')
    emit('generateQRCode', props.player.id_session, '', props.player.id_color);
}

/////////////////////////////////////////////// Ende Methoden ///////////////////////////////////////////////


</script>

<style scoped>
button {
    margin: 0;
    margin-left: 2rem;
}

#currentPlayingPlayer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: right;

    width: 100%;
    background-color: #f5f5f5;
    margin: 5px;


    border-radius: 100px;
}
</style>