'use strict';

/* Services */

angular.module('dartsApp.services', []).
  //factory('practiceNameService', ['$location', function(loc) {
  factory('practiceNameService', ['$location', '$log', function($location, $log) {
    //$log.info($location);
    var substring = "/practice/";
    var path = $location.absUrl();
    //$log.info("path is: " + path);
    var value = path.substring(path.indexOf(substring) + substring.length, path.length);
    //$log.info(value);
    var returnValue = { practiceUrl : value };
    //$log.info("location return value: " + returnValue.practiceUrl);
  return returnValue;

}]);

/*
angular.module('dartsApp.services.watchLocation', []).
    factory('watchTheLocation', ['$location', '$log', '$rootScope', function($location, $log, $rootScope) {
        var scope = $rootScope;
        scope.$watch(function() {return $location.path()}, function() {$log.info("location changed")}
        );
        return null;
    }]);


angular.module('dartsApp.services.interceptor', []).
  factory('authenticationHttpInterceptor', function($q, $log, $location) {
     return function(promise) {
        return promise.then(function(response) {
            $log.info("in teh interceptor");
            window.location = "/";
            return null;
        }, function(response) {
            $log.info("in the error section?");
            return $q.reject(response);
        });
     }
  });


  // We have to add the interceptor to the queue as a string because the interceptor depends upon service instances that are not available in the config block.
  angular.module('dartsApp.services.interceptor').config(['$httpProvider', function($httpProvider) {
    $httpProvider.responseInterceptors.push('authenticationHttpInterceptor');
  }]);
  */
