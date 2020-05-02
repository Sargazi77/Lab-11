<template>
    <tr v-bind:class= "'present-' + student.present">
        <td>{{student.name}}</td>
        <td>{{student.starID}}</td>
        <td> <input type="checkbox" v-model="student.present" v-on:change="checked(student)"></td>
        <td v-show="edit">
            <img class="delete-icon" v-on:click= "deleteStudent(student)" src="@/assets/1.png">
        </td>
     </tr>
                     
</template>


<script>
    export default {
        name: "studentRow",
        props: {
            student: Object,
            edit: Boolean


        },

        methods: {
            checked(student) {
                this.$emit('student-present', student)
            },
            deleteStudent(student) {
                if (confirm(`Delete ${student.name}, Are you Sure?`)) {
                    this.$emit('delete-student',student)
                }
            }
        }
    }
</script>

<style>
    .present-true {
    color: gray;
    font-style: italic;
}
.present-false {
    font-weight: bold;
}
.delete-icon{
    height: 30px;
}
</style>