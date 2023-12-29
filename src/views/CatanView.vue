<template>
    <div class="header">

        <h1>Catan</h1>
        <h2>Gemeinsam – aber Digital</h2>

        <button id="btn" @click="goToSession">Starte ein neues Spiel!</button>

    </div>
</template>

<script setup>
import router from '@/router';

function goToSession() {
    router.push('/session')
}

</script>


<style scoped>
.header {
    display: flex;
    height: 100vh;
    width: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #1d4b3c;
}

h1 {
    font-weight: 700;
    margin-bottom: 0rem;
    font-family: 'Raleway', monospace;
    text-transform: uppercase;
    color: #fadb42;
}

h2 {
    font-weight: 400;
    font-family: 'Work Sans', sans-serif;
    color: #fadb42;
    text-transform: uppercase;
}

#btn {
    font-weight: 800;
    font-family: 'Raleway', sans-serif;
    color: #1d4b3c;
    letter-spacing: 0.05rem;
    padding: 1rem 2rem;
    background-color: white;
    border-radius: 100px;
    margin-top: 5rem;
    transition: ease-in-out 0.4s;
}

#btn:hover {
    background-color: #fadb42;
    cursor: pointer;
    transition: ease-in-out 0.4s;
}

#btn:active {
    transition: ease-in-out 0.1s;
    transform: scale(0.98);
}


@media (min-width: 1024px) {
    h1 {
        font-size: 12rem;
        letter-spacing: 0.3rem;
    }

    h2 {
        font-size: 2rem;
        letter-spacing: 0.48rem;
        margin-top: -1.5rem;
    }

    #btn {
        font-size: 1.5rem;
    }
}



/* Media Queries */

/* Smartphones (Portrait) */
@media (max-width: 430px) {
    h1 {
        font-size: 5rem;
        letter-spacing: 0.3rem;
    }

    h2 {
        font-size: 1rem;
        letter-spacing: 0.12rem;
        margin-top: -0.5rem;
    }

    #btn {
        font-size: 1rem;
    }
}


/* Tablets (Portrait) */

@media (min-width: 431px) and (max-width: 1023px) {
    h1 {
        font-size: 8rem;
        letter-spacing: 0.3rem;
    }

    h2 {
        font-size: 1rem;
        letter-spacing: 0.53rem;
        margin-top: -0.75rem;
    }

    #btn {
        font-size: 1.5rem;
    }
}
</style>