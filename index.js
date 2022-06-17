'use strict';

let Command = require('./lib/command');

let Handlers = {
  initCircuitBreaker: () => {
    return new Command();
  }
};

module.exports = Handlers;