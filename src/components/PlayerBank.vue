<template>
    <section id="playerBank">
        {{ playerBankwidth }}
    </section>
</template>

<script setup>
// Vue importieren
import { ref, computed } from 'vue';

// Computed
const playerBankwidth = computed(() => {
    let windowWidth = window.innerWidth
    let windowHeight = window.innerHeight
    return windowWidth > windowHeight ? windowHeight : windowWidth;
})

</script>

<style scoped>
#playerBank {
    background-color: green;
    width: 100%;
    height: 100%;
}
</style>