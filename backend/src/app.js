// é aqui que vai ser configurado o servidor express

const express = require('express');
const path = require('path');
const cors = require('cors');
const routes = require('./routes');


class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  };

  middlewares() {
    this.server.use(express.json());
    
    // permite requisições externas de outras aplicações
    this.server.use(cors());

    // acessar arquivos estaticos, ex.: Imagens
    this.server.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')));
  };

  routes() {
    this.server.use(routes);
  };
};

module.exports = new App().server;