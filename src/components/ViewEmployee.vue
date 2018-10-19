<template>
    <div id="view-employee">
        <ul class="collection with-header">
            <li class="collection-header"><h4>ID : {{employee_id}}</h4></li>
            <li class="collection-item">Name : {{name}}</li>
            <li class="collection-item">Department : {{dept}}</li>
            <li class="collection-item">Position : {{position}}</li>
        </ul>
        <router-link to="/" class="btn grey">Back<i class="fa fa-angle-double-left left"></i></router-link>
        <button @click="deleteEmployee" class="btn red">Delete<i class="fa fa-trash-alt right"></i></button>
        <div class="fixed-action-btn">
            <router-link class="btn-floating btn-large waves-effect waves-light red" v-bind:to="{name: 'edit-employee', params: {employee_id: id}}">
                <i class="fa fa-pencil-alt"></i>
            </router-link>
        </div>
    </div>
</template>

<script>
import db from './firebaseInit'
db.settings({
  timestampsInSnapshots: true
});
export default {
    name: 'view-employee',
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
        deleteEmployee() {
            if(confirm('Are You Sure?')){
                var ID = (this.$route.params.employee_id);
                db.collection('employees').doc(ID).delete().then(function () {
                    this.$router.push('/')
                })
            }
        }
    }
}
</script>