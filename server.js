const express = require('express') 
const logger = require('morgan')
const bodyParser = require('body-parser')
const errorhandler = require('errorhandler')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/ass4')
  
let app = express()
app.use(logger('dev'))
app.use(bodyParser.json())

const account = mongoose.model('Account', { name: String,
  name: String,
  balance: Number
})

app.get('/accounts', (req, res, next) => {
  account.find({}, null, (err, accounts) => {
    if (err) return next(err)
    res.send(accounts)
  })
})

app.get('/accounts/:id', (req, res, next) => {
  account.findById(req.params.id, (err, account) => {
    if (err) return next(err)
    res.send(account.toJSON())
  })
})

app.post('/accounts', (req, res, next) => {
  let nvacc = new account(req.body)
  nvacc.save((err, results) => {
    if (err) return next(err)
    res.send(results)
  })
})

app.put('/accounts/:id', (req, res, next) => {
  account.findById(req.params.id, (err, facc) => {
    if (err) return next(err)
    if (req.body.name) facc.name = req.body.name
    if (req.body.balance) facc.balance = req.body.balance
   facc.save((err, results) => {
	  if (err) return next(err)
      res.send(results)
    })
  })
})

app.delete('/accounts/:id', (req, res, next) => {
  account.findById(req.params.id, (err, account) => {
    if (err) return next(err)
    account.remove((err, results) => {
      if (err) return next(err)
      res.send(results)
    })
  })
})

app.use(errorhandler())

app.listen(3000)