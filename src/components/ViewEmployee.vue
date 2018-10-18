<template>
    <div id="view-employee">
        <ul class="collection with-header">
            <li class="collection-header"><h4>ID : {{employee_id}}</h4></li>
            <li class="collection-item">Name : {{name}}</li>
            <li class="collection-item">Department : {{dept}}</li>
            <li class="collection-item">Position : {{position}}</li>
        </ul>
        <router-link to="/" class="btn grey">Back</router-link>
        <button @click="deleteEmployee" class="btn red">Delete</button>
    </div>
</template>

<script>
import db from './firebaseInit'
export default {
    name: 'view-employee',
    data () {
        return {
            employee_id: null,
            name: null,
            dept: null,
            position: null
        }
    },
    beforeRouteEnter(to, from, next) {
        db.collection('employees').doc( to.params.employee_id).get()
        .then(function(doc) {
                next(vm => {
                    vm.employee_id = doc.data().employee_id
                    vm.name = doc.data().name
                    vm.dept = doc.data().dept
                    vm.position = doc.data().position
                })
        })
    },
    watch: {
        '$route': 'fetchData'
    },
    methods: {
        fetchData() {
            db.collection('employees').doc(this.$root.params.employee_id).get().then(function(doc) {
                this.employee_id = doc.data().employee_id
                this.name = doc.data().name
                this.dept = doc.data().dept
                this.position = doc.data().position   
            })
        },
        deleteEmployee() {
            if(confirm('Are You Sure?')){
            db.collection('employees').doc(this.$root.params.employee_id).get().then(function(doc) {
                doc.ref.delete()
                this.$router('/')
            })
            }
        }
    }
}
</script>