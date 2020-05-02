let express = require('express')
let db = require('../models')
let Sequelize = require('sequelize')
let Student = db.Student

let router = express.Router()  //matches the request

router.get('/students', function(req, res, next){
    Student.findAll( {order:['starID']}).then( students => { //findAll , Create, Distroy
        return res.json(students)
    })
    .catch(err => next(err))
})


router.get('/students/:id', function(req, res, next) {
    Student.findByPk(req.params.id).then(student => {
        if (student) {
            res.json(student)
        } else {
            res.status(404).send('Student not found')
        }
    }).catch( err => next(err) )  //TODO   make sure ABOUT THIS /////////////////////////////////////////////////////////////////????????????????????????????????
})


router.post('/students', function(req, res, next){ //other typee of request: patch:MOdifyng data  delete: deleting data
    Student.create(req.body).then( (data) => { //any jason vue client sents
        return res.status(201).send('ok')  //500 : kind of problem with server
    } ).catch(err =>{
        if (err instanceof Sequelize.ValidationError){
            let message= err.errors.map (e=> e.message)
            return res.status(400).json(message) //status(400) bad request from user 
        }
    })
})

router.patch('/students/:id', function(req, res, next){    // :id can be anything  template
    Student.update(req.body, { where: {id: req.params.id}})   //only need t update the student with the requested id. things in {{ }} is the way to find the requested id
    .then(rowModified => {
        if (!rowModified[0]) {
            return res.status(404).send('Not Found')
        } else {
            return res.send('ok')
        }
    }).catch( err => {
        if (err instanceof Sequelize.ValidationError) {
            let messages = err.errors.map( (e) => e.message)
            return res.status(400).json(messages)
        }
        return next(err)
    })
})

router.delete('/students/:id', function(req, res, next){
    Student.destroy( {where: {id: req.params.id} } )
    .then( rowModified => {
        return res.send('ok')
    }).catch (err => next(err) )
})
module.exports = router
