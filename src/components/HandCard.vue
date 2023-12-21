<template>
    <section class="handCard" @mousedown="$emit('emitHandCard',handCardType)">
        <p>Ich bin eine Handkarte und zwar: {{ handCardType }}{{ amount }}</p>
    </section>
</template>

<script setup>

// Vue importieren
import { ref } from 'vue';

// Props definieren
const props = defineProps({
    handCardType: String,
    amount: Number
})

// Emits definieren
const emit = defineEmits(['emitHandCard'])

</script>

<style>

</style>