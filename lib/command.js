'use strict';

let CircuitBreaker = require('../lib/circuit_breaker/circuit_breaker');
let constants = require('./constants');

class Command {

  constructor() {
    this.circuitBreaker = new CircuitBreaker();
    this.constants = constants;

  }

  execute(key, runParams, runFunction, fallbackParams, fallbackFunction, options) {
    let circuitBreakerCommand = this.circuitBreaker.getCommand(key, runFunction, fallbackFunction, options);
    return circuitBreakerCommand.execute(runParams, fallbackParams);
  }
}

module.exports = Command;
