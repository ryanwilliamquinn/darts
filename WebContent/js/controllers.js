'use strict';

/* Controllers */

function mainController($scope, $http) {
    $scope.round = {"number" : 1};
    $scope.results = [];
    $scope.url = "/data/twenties"
    $scope.recordResult = function(result) {
        if (result) {
            var newResult = {"score" : result.score, "round" : $scope.round.number}
            $scope.results.push(newResult);
            $scope.round.number++;
        }
    }
    $scope.postResult = function() {
        // Create the http post request
        // the data holds the keywords
        // The request is a JSON request.
        var myjson = JSON.stringify($scope.results, replacer);

        $http.post($scope.url, myjson).
        success(function(data, status) {
            $scope.status = status;
            $scope.data = data;
            $scope.postResult = data; // Show result from server in our <pre></pre> element
        }).
        error(function(data, status) {
            $scope.data = data || "Request failed";
            $scope.status = status;
        });

    };

    var replacer = function(key, value)
    {

      if (key=="$$hashKey") {
          return undefined;
      } else return value;


    }
}
