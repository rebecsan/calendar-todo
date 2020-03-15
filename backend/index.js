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
app.get('/:budget', (request, response) => {
  database.all('SELECT * FROM ' + request.params.budget)
    .then(rows => {
      response.send(rows)
    })
})

app.post('/:budget', (request, response) => {
  if (request.body.name && request.body.sum) {
    database.run(
        'INSERT INTO ' + request.params.budget + ' VALUES ($name, $sum, $id)', {
          $name: request.body.name,
          $sum: request.body.sum,
          $id: request.body.id
        })
      .then(() => {
        response.status(201).send()
      })
  } else {
    response.status(400).send()
  }
})

app.delete('/:budget/:id', (request, response) => {
  database.run('DELETE FROM ' + request.params.budget + ' WHERE id=$id', {
      $id: request.params.id
    })
    .then(() => {
      response.send()
    })
})

//Rebecca
app.get('/todo', (request, response) => {
  database.all('SELECT * FROM todoLists')
    .then(rows => {
      response.send(rows)
    })
})

app.delete('/todo/:id', (request, response) => {
  database.run('DELETE FROM todoLists WHERE id=$id', {
      $id: request.params.id
    })
    .then(() => {
      response.send()
    })
})

app.post('/todo', (request, response) => {
  database.run('INSERT INTO todoLists VALUES ($name, $id)', {
      $name: request.body.name,
      $id: request.body.id
    })
    .then(() => {
      response.send()
    })
})

app.put('/todo/:id', (request, response) => {
  database.run('UPDATE todolists SET name=$newName WHERE id=$id', {
      $id: request.params.id,
      $newName: request.body.name,
    })
    .then(() => {
      response.send()
    })
})


//Josefin
app.get('/calendar', (request, response) => {
  database.all('SELECT * FROM activities').then(activities => {
    console.log(activities)
    response.send(activities)
  })
})

app.post('/calendar', (request, response) => {
  database.run('INSERT INTO activities VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        request.body.name,
        request.body.dateStart,
        request.body.dateEnd,
        request.body.timeStart,
        request.body.timeEnd,
        request.body.id,
        request.body.note

      ])
    .then(() => {
      response.send()
    })
})

app.delete('/calendar/:id', (request, response) => {
  database.run('DELETE FROM activities WHERE id=?', [request.params.id]).then(() => {
    console.log(request.params.id)
    response.send()
  })
})

app.listen(3000, () => {
  console.log("server started");
})