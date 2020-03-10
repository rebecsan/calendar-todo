const sqlite = require('sqlite')
const express = require('express')
const cors = require('cors')
//const moment = require('moment')

const app = express()
app.use(express.json())
app.use(cors())

let database
// hämtar värden i en databas. 
sqlite.open('database.sqlite').then(database_ => {
  database = database_
  })

  app.get('/calendar', (request, response) => {
    database.all('SELECT * FROM activities').then(activities => {
      console.log(activities)
      response.send(activities) 
      
    })
  })

  app.post('/calendar', (request, response) => {
    database.run('INSERT INTO activities VALUES (?, ?, ?, ?, ?)', 
    [
    request.body.name,
    request.body.dateStart,
    request.body.dateEnd,
    request.body.timeStart, 
    request.body.timeEnd 
    ])
      .then(() => {
        response.send() 
          
        
      })

  
  
  app.get('/todo', (request, response) => {
    database.all('SELECT * FROM todoLists')
    .then(rows => {
      // console.log(rows.map (row => row.name) + 'GET')
      response.send(rows)
    })
  })

  app.post('/todo', (request, response) => {
    // console.log(request.body.name + 'POST')
    database.run('INSERT INTO todoLists VALUES ($name)', 
    {
      $name: request.body.name
    })
      .then(() => {
        response.send()
      })
  })

  })

app.listen(3000)