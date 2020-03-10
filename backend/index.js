const sqlite = require('sqlite')
const express = require('express')
const cors = require('cors')
//const moment = require('moment')

const app = express()
app.use(express.json())
app.use(cors())

let database
// hämtar värden i en databas. 
sqlite.open('calendar.sqlite').then(database_ => {
  database = database_
  })
  app.get('/', (request, response) => {
    database.all('SELECT * FROM activities').then(activities => {
      console.log(activities)
      response.send(activities) 
      
    })
  })

  app.post('/', (request, response) => {
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
    
  
    
      // $name: request.body.name
      // $population: request.body.population
  
  })



app.listen(8080)