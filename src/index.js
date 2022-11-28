const express = require('express');

const { v4: uuidv4 } = require('uuid');

const app = express();

// set customers array
const customers = [];

// middleware to express get data from json file
app.use(express.json());

app.post('/account', (request, response) => {
  const id = uuidv4();
  const { cpf, name } = request.body;

  // insert data intro array
  customers.push({
    name,
    cpf,
    id,
    statement: [],
  });

  return response.status(201).send();
});

app.listen(3333);
