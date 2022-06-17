'use strict';

let Error = {};

Error.getErrorObject = function (errType, errMessage) {
  return {
    err_type: errType,
    err_message: errMessage
  };
};

module.exports = Error;