'use strict';

module.exports = {
  defaultConfig: {
    // how long the circuit breaker should stay opened, before allowing a single request to test the health of the service
    CIRCUIT_BREAKER_SLEEP_WINDOW_IN_MILLISECONDS: 5000,
    // timeout for request
    TIMEOUT: 5000,
    /* minimum number of requests in a rolling window that needs to be exceeded,
    before the circuit breaker will bother at all to calculate the health. */
    CIRCUIT_BREAKER_REQUEST_VOLUME_THRESHOLD: 10,
    // error percentage threshold to trip the circuit
    CIRCUIT_BREAKER_ERROR_THRESHOLD_PERCENTAGE: 50,
    // force this circuit breaker to be always opened
    CIRCUIT_BREAKER_FORCE_OPENED: false,
    // force this circuit breaker to be always closed
    CIRCUIT_BREAKER_FORCE_CLOSED: false,
    /* length of the window to keep track of execution counts metrics (success, failure).Unit is in milliseconds.
    Circuit breaking condition is based on these three factors- STATISTICAL_WINDOW_LENGTH,
    CIRCUIT_BREAKER_REQUEST_VOLUME_THRESHOLD and CIRCUIT_BREAKER_ERROR_THRESHOLD_PERCENTAGE */
    STATISTICAL_WINDOW_LENGTH: 10000,
    // number of buckets within the statistical window
    STATISTICAL_WINDOW_NUMBER_OF_BUCKETS:10,
     // number of buckets within the percentile window
    PERCENTILE_WINDOW_NUMBER_OF_BUCKETS: 6,
    // length of the window to keep track of execution times
    PERCENTILE_WINDOW_LENGTH: 60000
  }
};