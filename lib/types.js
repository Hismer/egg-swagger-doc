'use strict';

module.exports.DATE = function(entity) {
  if (entity[this.key] instanceof Date) {
    const time = entity[this.key].getTime();
    return parseInt(time / 1000);
  }
};
