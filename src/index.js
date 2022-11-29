const express = require('express');

const { v4: uuidv4 } = require('uuid');

const app = express();

// set customers array
const customers = [];

// Middleware
function verifyIfExistsAccountCPF(request, response, next) {
  const { cpf } = request.headers;

  const customer = customers.find(customer => customer.cpf === cpf);

  // validation if customer not found
  if (!customer) {
    return response.status(400).json({ error: 'Customer not found' });
  }
  request.customer = customer;
  return next();
}

// middleware to express get data from json file
app.use(express.json());

// create account route
app.post('/account', (request, response) => {
  const { cpf, name } = request.body;

  // Validation
  const customerAlreadyExists = customers.some(
    customer => customer.cpf === cpf,
  );

  if (customerAlreadyExists) {
    return response.status(400).json({ error: 'Customer already exists!' });
  }

  // insert data intro array
  customers.push({
    id: uuidv4(),
    name,
    cpf,
    statement: [],
  });

  return response.status(201).send();
});

// get customer statement
app.get('/statement', verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;
  return response.json(customer.statement);
});

app.listen(3333);
