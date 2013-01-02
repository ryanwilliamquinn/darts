'use strict';

/* Services */

angular.module('dartsApp.mockService', []).
  factory('practiceNameService', function() {
    var returnValue = { practiceUrl : "bulls" };
  return returnValue;
});

