<template>
    <div class="container">
        <h3>Please Verefy Your Email</h3>
        <button class="btn" @click="sendVereficationEmail">Resend Verefication Email</button>
        <br>
        <br>
        <h6>Once Verefied Please Refresh The Page</h6>
    </div>
</template>
<script>
import firebase from 'firebase'
export default {
    name: 'verefy',
    methods: {
        sendVereficationEmail() {
            firebase.auth().currentUser.sendEmailVerification()
            alert('Verefication Email Sent')
        }
    }
}
</script>
