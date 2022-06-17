'use strict';

let Promise = require('bluebird');
let hystrixjs = require('hystrixjs');
let hystrix = {};

hystrix.init = () => {
  hystrixjs.hystrixConfig.init({
    "hystrix.promise.implementation": Promise
  });
  return hystrixjs.commandFactory;
};

hystrix.createCommand = (commandsFactory, options) => {
  return commandsFactory.getOrCreate(options.key)
    .circuitBreakerErrorThresholdPercentage(options.CIRCUIT_BREAKER_ERROR_THRESHOLD_PERCENTAGE)
    .timeout(options.TIMEOUT)
    .run(options.run)
    .circuitBreakerRequestVolumeThreshold(options.CIRCUIT_BREAKER_REQUEST_VOLUME_THRESHOLD)
    .circuitBreakerSleepWindowInMilliseconds(options.CIRCUIT_BREAKER_SLEEP_WINDOW_IN_MILLISECONDS)
    .statisticalWindowLength(options.STATISTICAL_WINDOW_LENGTH)
    .fallbackTo(options.fallbackTo)
    .circuitBreakerForceOpened(options.CIRCUIT_BREAKER_FORCE_OPENED)
    .circuitBreakerForceClosed(options.CIRCUIT_BREAKER_FORCE_CLOSED)
    .statisticalWindowNumberOfBuckets(options.STATISTICAL_WINDOW_NUMBER_OF_BUCKETS)
    .percentileWindowNumberOfBuckets(options.PERCENTILE_WINDOW_NUMBER_OF_BUCKETS)
    .percentileWindowLength(options.PERCENTILE_WINDOW_LENGTH)
    .build();
};

hystrix.getMetricsFactory = () => {
  if(hystrixjs) {
    return hystrixjs.metricsFactory;
  }
  return null;
};

module.exports = hystrix;