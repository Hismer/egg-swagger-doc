'use strict';

module.exports.DATE = function(entity) {
  if (entity[this.key] instanceof Date) {
    return entity[this.key].toLocaleString();
  }
};
