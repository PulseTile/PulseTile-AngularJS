angular.module('ripple-ui.filters', [])
  .filter('formatNHSNumber', function() {
    /* istanbul ignore next  */
    return function(number) {
      if (number === undefined) {
        return;
      }

      return number.slice(0,3) + " " + number.slice(3,6) + " " + number.slice(6);
    };
  })
  .filter('formatMoment', function() {
    /* istanbul ignore next  */
    return function(date) {
      var m = moment(date);
      return m.format('h:mma');
    };
  });