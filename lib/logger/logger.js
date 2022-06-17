'use strict';

const _ = require('lodash');
let loggerInstance = require('@uc-engg/logging-repo').initLogger(process.env.LOG_INDEX_NAME);

const LOG_TYPE = 'armor';
let Logger = {};

Logger.info = function(key, message) {
  data.log_type = LOG_TYPE;
  if(key) data.key = key;
  if(message) data.message = message;
  loggerInstance.info(data);
};

Logger.error = function (error, key) {
  data.log_type = LOG_TYPE;
  data.error = error;
  if (key) data.key = key;
  loggerInstance.error(data);
};

module.exports = Logger;
