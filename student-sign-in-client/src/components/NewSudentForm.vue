<template>
    <div>
         <div class="alert alert-danger" v-show="errors.length">
            <li v-for="error in errors"> {{error}}</li>
        </div>
        <div class="card add-student m-2 p-2">
            <h4 class="card-title">Add new student</h4>

            <div class="form-group">
                <label for="name">Name</label>
                <!-- TODO v-model -->    <!-- .trim gets rid of the begining and end spaces-->
                <input id="name" class="form-control" v-model.trim="newStudentName">
            </div>
            <div class="form-group">
                <label for="starID">Star ID</label>
                <!-- TODO v-model -->
                <input id="starID" class="form-control" v-model.trim="newStarID">
            </div>

            <!-- TODO v-on:click event handler -->
            <button class="btn btn-primary" v-on:click.prevent="addStudent">Add</button>
        </div>

    </div>
</template>

<script>

    export default {
        name:'NewSudentForm',
        data(){
            return {
                newStudentName:'',
                newStarID: '',
                errors:[]
                
            }
        },
        methods: {
            addStudent() {
                       this.errors=[]
                    if (this.newStudentName && this.newStarID) { // checks if the name and startId are both entered
                        let student = {name: this.newStudentName, starID:this.newStarID}
                        this.$emit('student-added', student)
                        this.newStudentName =''  // removes the entered data after each click
                        this.newStarID = ''
                    } else if (!this.newStudentName) {
                        this.errors.push("Name is required ")
                    } else if (!this.newStarID) {
                         this.errors.push("starID is required ")
                         
                    }    
            }
        }

    }
    

</script>

<style>

</style>