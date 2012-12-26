'use strict';

var dartsApp = angular.module('dartsApp', []);

/* Controllers */

dartsApp.controller("mainController", function mainController($scope, $http) {
    $scope.round = {"number" : 1};
    $scope.results = [];
    $scope.postUrl = "/data/twenties";
    $scope.loadUrl = "/data/loadTwenties";
    $scope.loadAllUrl = "/data/loadAllTwenties";
    $scope.games = [];


    $scope.recordResult = function(result) {
        if (result && isNumber(result.score)) {
            var newResult = {"score" : result.score, "round" : $scope.round.number}
            $scope.results.push(newResult);
            $scope.round.number++;
            result.score = "";

        }
    }
    $scope.postResult = function() {
        if ($scope.results && $scope.results.length > 0) {
            // Create the http post request
            // the data holds the keywords
            // The request is a JSON request.
            var myjson = JSON.stringify($scope.results, replacer);

            $http.post($scope.postUrl, myjson).
                success(function(data, status) {
                    //$scope.status = status;
                    //$scope.data = data;
                    //$scope.postResult = data; // Show result from server in our <pre></pre> element
                    $scope.results = [];
                    $scope.round.number = 1;
                    if (data) {
                        var newResult = {'date' : data.displayDateTime, 'score' : data.score};
                        $scope.games.push(newResult);
                    }
                }).
                error(function(data, status) {
                    $scope.data = data || "Request failed";
                    $scope.status = status;
                });
        }

    };

    $scope.showAll = function() {
        $scope.games = [];
        $scope.getTwenties($scope.loadAllUrl);
    }

    $scope.getTwenties = function(url) {
        $http.get(url).
                success(function(data, status) {
                    for (var i=0; i < data.length; i++) {
                        var tempdata = data[i];
                        var oldRound = {};
                        oldRound.date = tempdata.displayDateTime;
                        oldRound.score = tempdata.score;
                        $scope.games.push(oldRound);
                    }
                }).
                error(function(data, status) {
                    console.log("failed")
                })
    }



    $scope.getTwenties($scope.loadUrl);



    var replacer = function(key, value) {
        if (key=="$$hashKey") {
            return undefined;
        } else {
            return value;
        }
    }
});

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
