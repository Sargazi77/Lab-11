<template>
  <div id="app">
  <NewSudentForm v-on:student-added="newStudentAdded"></NewSudentForm>

  <studentTable v-bind:students="students"
  v-on:student-present="studentArrivedOrLeft"
  v-on:delete-student="studentDeleted">
  </StudentTable>

  <studentMessage v-bind:message="message" v-bind:name="name"></studentMessage>
  </div>
</template>

<script>
import NewSudentForm from './components/NewSudentForm.vue'
import studentMessage from './components/studentMessage.vue'
import studentTable from './components/studentTable.vue'

export default {
  name: 'App',
  components: {
    NewSudentForm,
    studentMessage,
    studentTable
  },
  data() {
    return{
      students: [],
      message:'',
      name:''
      
    }
  },
  mounted() {    //gets called fisrt as a component loaded

      this.updateStudents()
  },
  methods: {
    newStudentAdded(student) {
      this.$student_api.addStudent(student).then( student =>{
        this.updateStudents() //get the lates list of students

      }).catch(err =>{
        let message= err.response.data.join(', ')
        console.log(message)
        alert(message)
      })
    
    }, 
    studentArrivedOrLeft(student) {
      this.$student_api.updateStudent(student).then( () =>{
        this.name = student.name
        this.message = student.present ? 'Welcome, ' : 'GoodBye, '
        this.updateStudents()

      })
      
    
  },
  studentDeleted(student) {
    this.$student_api.deleteStudent(student).then( () =>{
      this.updateStudents()
    })
  },

  updateStudents() {

      this.$student_api.getAllStudents().then( students => {
        this.students = students
      })
  }
    

  }
}
</script>

<style>

</style>

