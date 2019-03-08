const express = require('express');
const db = require('./data/db.js');

const server = express();
const PORT = process.env.PORT || 9090

server.use(express.json())

console.log('hubs', db.hubs);

server.get('/', (req, res) => {
  res.send('Hello from Express');
})
//
// server.get('/now', (req, res) => {
//   let d = new Date();
//   res.send(d)
// })
server.get('/api/hubs', (req,res) => {
  db.hubs.find()
    .then(hubs => {
      res.json(hubs);
    })
    .catch(({code, message}) => {
      res.status(code).json(message)
    })
})

server.post('/api/hubs', (req, res) => {
  const newHub = req.body;

  db.hubs.add(newHub)
  .then(dbHub => {
    res.status(201).json(dbHub);
  })
  .catch(({code, message}) => {
    res.status(code).json(message)
  });
});


server.put('/api/hubs/:id', (req,res) =>{
  const { id } = req.params;
  const updateHub = req.body;

  db.hubs.update(id, updateHub)
  .then(dbHub => {
    if (dbHub) {
      res.json(dbHub);
    } else {
      res.status(400).json({err: 'invalid id'});}
  })
  .catch(({code, message}) => {
    res.status(code).json({err: message})
  })
})

server.delete('/api/hubs/:id', (req, res) => {
  const { id } = req.params;
  db.hubs.remove(id)
    .then(hub => {
      res.json(hub);
    })
    .catch(({code, message}) => {
      res.status(code).json(message)
    });
})


server.listen(PORT, () => {
  console.log('App is listening');
});
