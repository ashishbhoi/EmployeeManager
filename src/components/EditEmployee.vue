<template>
    <div id="edit-employee">
        <h3>Edit Employee</h3>
        <form @submit.prevent="updateEmploey" class="col s12">
            <div class="row">
                <div class="input-field col s12">
                    <input disabled type="text" v-model="employee_id" required>
                </div>
                <div class="input-field col s12">
                    <input type="text" v-model="name" required>
                </div>
                <div class="input-field col s12">
                    <input type="text" v-model="dept" required>
                </div>
                <div class="input-field col s12">
                    <input type="text" v-model="position" required>
                </div>
            </div>
            <button type="submit" class="btn waves-effect waves-light">Submit<i class="fa fa-paper-plane right"></i></button>
            <button @click="CancelEdit" class="btn grey">Cancel<i class="fa fa-times-circle right"></i></button>
        </form>
    </div>
</template>

<script>
import db from './firebaseInit'
db.settings({
  timestampsInSnapshots: true
});
export default {
    name: 'edit-employee',
    data () {
        return {
            id: null,
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
                    vm.id = doc.id
                })
        })
    },
    watch: {
        '$route': 'fetchData',
    },
    methods: {
        fetchData() {
            db.collection('employees').doc(this.$root.params.employee_id).get().then(function(doc) {
                this.employee_id = doc.data().employee_id
                this.name = doc.data().name
                this.dept = doc.data().dept
                this.position = doc.data().position
                this.id = doc.id
            })
        },
     updateEmploey() {
        var ID = (this.$route.params.employee_id);
        db.collection('employees').doc(ID).update({
            'employee_id': this.employee_id,
            'name': this.name,
            'dept': this.dept,
            'position': this.position
        }).then(() => {
            this.$router.push({name: 'view-employee', params: ID})
        })
     },
     CancelEdit() {
         var ID = (this.$route.params.employee_id);
         this.$router.push({name: 'view-employee', params: ID})
     }
    }
}
</script>
