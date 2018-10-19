<template>
    <nav>
        <div class="nav-wrapper green">
            <div class="container">
                <router-link to="/" class="brand-logo left">Employee Manager</router-link>
                <ul id="nav-mobile" class="right">
                    <li v-if="isLogedIn" class="email black-text">{{currentUser}}</li>
                    <li v-if="isLogedIn"><router-link to="/">Dashboard</router-link></li>
                    <li v-if="!isLogedIn"><router-link to="/login">Login</router-link></li>
                    <li v-if="!isLogedIn"><router-link to="/register">Register</router-link></li>
                    <li v-if="isLogedIn"><button v-on:click="logout" class="btn black">Logout</button></li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import firebase from 'firebase'
export default {
    name: 'navbar',
    data() {
        return {
            isLogedIn: false,
            currentUser: false
        }
    },
    created() {
        if(firebase.auth().currentUser) {
            this.isLogedIn = true
            this.currentUser = firebase.auth().currentUser.email
        }
    },
    methods: {
        logout: function(){
            firebase.auth().signOut().then(() => {
                alert('Signout Successful')
                this.$router.go({path: this.$router.path})
            }).catch(function(error) {
                alert(error.message)
            })
        }
    }
}
</script>
