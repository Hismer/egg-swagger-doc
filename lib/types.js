'use strict';

module.exports.DATE = function(entity) {
  return entity[this.key].toLocaleString();
};
