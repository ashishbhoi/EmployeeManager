<template>
    <div id="login">
        <div class="container">
            <div class="row">
                <div class="col s12 m8 offset-m2">
                    <div class="login card-panel green lighten-1 white-text center">
                        <h3>Login</h3>
                        <form>
                            <div class="input-field col s12">
                                <i class="fa fa-envelope prefix"></i>
                                <input type="email" id="email" v-model="email">
                                <label for="email" class="white-text">Email</label>
                            </div>
                            <div class="input-field col s12">
                                <i class="fa fa-lock prefix"></i>
                                <input type="password" id="password" v-model="password">
                                <label for="password" class="white-text">Password</label>
                            </div>
                            <button v-on:click="login" class="btn btn-large grey lighten-4 black-text">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
export default {
    name: 'login',
    data: function() {
        return {
            email: '',
            password: '',
        }
    },
    methods: {
        login: function(e) {
            firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
                user => {
                    alert('You Are logged in')
                    this.$router.go({path: this.$router.path})
                },
                err => {
                    alert(err.message)
                }
            )
             e.preventDefault()
        }
    }
}
</script>
