'use strict';

const Error = require('../logger/error');
const hystrixjs = require('./hystrix');
const cbDefaultConfig = require('../../configs/circuit_breaker');
const Logger = require('../logger/logger');
const _ = require('lodash');

function getHysrixOptions(key, run, fallback, options) {
  options = _.defaultsDeep(options || {}, cbDefaultConfig.defaultConfig);
  options.key = key;
  options.fallbackTo = fallback;
  options.run = run;
  return options;
}

class CircuitBreaker {

  constructor() {
    this.commandFactory = hystrixjs.init();
    this.commandMap = new Map();
    this.metricsFactory = hystrixjs.getMetricsFactory();
  }

  /**
   * provides the current window metrics data.
   *
   * @param key
   * @returns object containing metrics data (like circuit break count, failures count, latency).
   */
  getCurrentMetrics(key) {
    if(this.metricsFactory && this.commandMap.has(key)) {
      return this.metricsFactory.getOrCreate({commandKey: key});
    }
    return {};
  }

  /**
   * This will return a curcuit breaker command which will be used to make external service calls. Each key will create a single
   * command which will be cached.
   * @param key Unique key for each command.
   * @param run function to run when the execute method of command is called.
   * @param fallback this will be called on each failure. This function should have two parameters, first param will
   * receive error and second param will receive an array containing the arguments of run method in the same order.
   * @param options Optional configuration fields.
   * @returns Command use execute method of command to make an external call.
   */
  getCommand(key, run, fallback, options) {
    if (this.commandMap.has(key)) {
      return this.commandMap.get(key);
    }

    if(!key) {
      throw Error.getErrorObject('circuit-breaker-validation-failure', 'key field is mandatory');
    }
    let hystrixjsCommand = hystrixjs.createCommand(this.commandFactory, getHysrixOptions(key, run, fallback, options));
    this.commandMap.set(key, hystrixjsCommand);
    return hystrixjsCommand;
  }
}

module.exports = CircuitBreaker;
