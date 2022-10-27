
// Se importa express para levantar el servidor
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());


const { getUser, createUser } = require('./endpoints');

// BodyParser permite parsear el body que viene en formato json a un objeto de js
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Se definen los endpoints
app.get('/user/:mail', (req, res) => {
  getUser(req, res);
});

app.post('/user', (req, res) => {
    createUser(req, res);
} )


// Se monta la app en el puerto 8000
app.listen(8000, () => {
  console.log('Backend mount at 8000!')
});
