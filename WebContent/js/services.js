'use strict';

/* Services */

angular.module('dartsApp.services', []).
  //factory('practiceNameService', ['$location', function(loc) {
  factory('practiceNameService', ['$location', '$log', function($location, $log) {
    //$log.info(loc);
    var substring = "/practice/";
    var path = $location.absUrl();
    //$log.info("path is: " + path);
    var value = path.substring(path.indexOf(substring) + substring.length, path.length);
    //$log.info(value);
    var returnValue = { practiceUrl : value };
    //$log.info("location return value: " + returnValue.practiceUrl);
  return returnValue;
}]);

