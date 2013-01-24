'use strict';

/* Controllers */

angular.module("dartsApp.controller", []);
function mainController($scope, $http, $log, practiceNameService) {
    $scope.round = {"number" : 1};
    $scope.results = [];
    $scope.numRoundsAvailable = [{id : "5", rounds : "five", num : 5}, {id : "10", rounds : "ten", num : 10}];
    $scope.numRounds = $scope.numRoundsAvailable[1];
    $scope.isShowRounds = false;

    $scope.games = [];
    $scope.displayShowAll = "hide";
    $scope.predicate = '-dateMillis';

    $scope.targetTypes = [{id : "bull", label : "bullseye"}, {id : "t20", label : "triple 20"}, {id : "d20", label : "double 20"}, {id : "20", label :"20"},
                            {id : "t19", label : "triple 19"}, {id : "d19", label : "double 19"}, {id : "19", label : "19"}];

    $scope.target = $scope.targetTypes[0];

    $scope.setUpUrls = function() {
        $scope.games = [];
        $scope.practiceType = $scope.target.id;
        $scope.urlPracticeType = capitaliseFirstLetter($scope.practiceType)
        $scope.postUrl = "/data/" + $scope.practiceType;
        $scope.loadUrl = "/data/load" + $scope.urlPracticeType;
        $scope.loadAllUrl = "/data/loadAll" + $scope.urlPracticeType;
    }

    $scope.setUpUrls();

    $scope.showRounds = function() {
        $scope.isShowRounds = true;
    }

    $scope.changedTarget = function() {
        $scope.setUpUrls();
        $scope.getResults($scope.loadUrl);
    }

    $scope.cancelRound = function() {
        $scope.results = [];
        $scope.round.number = 1;
        $scope.isShowRounds = false;
    }

    $scope.recordResult = function(result) {
        if (result && isNumber(result.score)) {
            var newResult = {score : result.score, round : $scope.round.number};
            $scope.results.push(newResult);
            $scope.round.number++;
            result.score = "";
        }
    }

    $scope.checkRoundsComplete = function() {
        return $scope.round.number > $scope.numRounds.num;
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
                        var newResult = {'date' : data.displayDateTime, 'score' : data.score, 'dateMillis' : data.dateMilliseconds};
                        $scope.games.push(newResult);
                    }
                    $scope.isShowRounds = false;
                }).
                error(function(data, status) {
                    $scope.data = data || "Request failed";
                    $scope.status = status;
                });
        }

    };

    $scope.showAll = function() {
        $scope.games = [];
        $scope.displayShowAll = "hide";
        $scope.getResults($scope.loadAllUrl);
    }

    $scope.getResults = function(url) {
        $http.get(url).
                success(function(data, status) {
                    //$log.info(data);
                    $scope.numResults = data.totalNumResults;
                    var tempResults = data.dartsResults;
                    //$log.info(tempResults);
                    if (tempResults) {
                        var resultsLength = tempResults.length;
                        //$log.info("results length: " + resultsLength + ", total number of results: " + $scope.numResults);
                        if (resultsLength < $scope.numResults) {
                            $scope.displayShowAll = "block";
                        } else {
                            $scope.displayShowAll = "hide";
                        }
                        for (var i=0; i < resultsLength; i++) {
                            var tempdata = tempResults[i];
                            var oldRound = {};
                            oldRound.date = tempdata.displayDateTime;
                            oldRound.score = tempdata.score;
                            oldRound.dateMillis = tempdata.dateMilliseconds;
                            if (tempdata.score && tempdata.displayDateTime) {
                                $scope.games.push(oldRound);
                            }
                        }
                    }
                }).
                error(function(data, status) {
                    $log.error("failed")
                })
    }


    $scope.getResults($scope.loadUrl);

    //$scope.watcher = watchTheLocation;



    var replacer = function(key, value) {
        if (key=="$$hashKey") {
            return undefined;
        } else {
            return value;
        }
    }
}

//mainController.$inject = [];

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
