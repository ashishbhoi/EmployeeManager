<template>
    <div id="register">
        <div class="container">
            <div class="row">
                <div class="col s12 m8 offset-m2">
                    <div class="login card-panel grey lighten-4 black-text center">
                        <h3>Register</h3>
                        <form>
                            <div class="input-field col s12">
                                <i class="fa fa-envelope prefix"></i>
                                <input type="email" id="email" v-model="email">
                                <label for="email">Email</label>
                            </div>
                            <div class="input-field col s12">
                                <i class="fa fa-lock prefix"></i>
                                <input type="password" id="password" v-model="password">
                                <label for="password">Password</label>
                            </div>
                            <div class="input-field col s12">
                                <i class="fa fa-lock prefix"></i>
                                <input type="password" id="confPassword" v-model="confPassword">
                                <label for="conf-password">Confirm Password</label>
                            </div>
                            <button v-on:click="register" class="btn btn-large grey lighten-4 black-text">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'


export default {
    name: 'register',
    data: function() {
        return {
            email: '',
            password: '',
            confPassword : ''
        }
    },
    methods: {
        register: function(e) {
            if(this.password == this.confPassword) {
                firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
                    user => {
                        alert('Account Created')
                        this.$router.go({path: this.$router.path})
                    },
                    err => {
                        alert(err.message)
                    }
                )
            } 
            else {
                alert('Confirm Password Doesnt Match With Password')
            }
            e.preventDefault()
        }
    }
}
</script>
