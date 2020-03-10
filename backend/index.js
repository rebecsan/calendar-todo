const express = require('express')
const sqlite = require('sqlite')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())


let database;

sqlite.open('database.sqlite').then(database_ => {
  database = database_
})

app.post('/budget', (request, response) => {
  console.log(request.body);
  database.run(
      'INSERT INTO budget VALUES ($activity, $amount)', {
        $activity: request.body.activity,
        $amount: request.body.amount
      })
    .then(() => {
      response.send()
    })

  // (err) => {
  //   if (err) {
  //     response.status(400)
  //     response.send()
  //   } else {
  //     response.status(201)
  //     response.send()
  //   }
  // }

})

app.get('/', (request, response) => {
  database.all('SELECT * FROM budget').then(budget => {
    console.log(budget)
    response.send(budget)
  })
})

app.listen(3000, () => {
  console.log("server started");
})


/*
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

app.listen(3000)

*/