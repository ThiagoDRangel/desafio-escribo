const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.listen(3010, () => {
  console.log('Servidor rodando na porta 3010');
});
