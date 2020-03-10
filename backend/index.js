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

//Diana
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
})

app.get('/budget', (request, response) => {
  database.all('SELECT * FROM budget')
    .then(rows => {
      response.send(rows)
    })
})

app.delete('/budget', (request, response) => {
  database.run('DELETE FROM budget WHERE ($activity, $amount)', {
      $activity: request.body.activity,
      $amount: request.body.amount
    })
    .then(() => {
      response.send()
    })
})

//Rebecca
app.get('/todo', (request, response) => {
  database.all('SELECT * FROM todoLists')
    .then(rows => {
      // console.log(rows.map (row => row.name) + 'GET')
      response.send(rows)
    })
})

app.post('/todo', (request, response) => {
  // console.log(request.body.name + 'POST')
  database.run('INSERT INTO todoLists VALUES ($name)', {
      $name: request.body.name
    })
    .then(() => {
      response.send()
    })
})


//Josefin
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
})

app.listen(3000, () => {
  console.log("server started");
})