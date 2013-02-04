'use strict';

/* Controllers */

angular.module("dartsApp.controller", []);
function mainController($scope, $http, $log) {
    $scope.round = {"number" : 1};
    $scope.initialNumGames = 10;
    $scope.isShowInputs = false;
    $scope.results = [];
    $scope.predicate = 'rank';
    $scope.postUrl = "/data/cricket";
    $scope.loadUrl = "/data/loadCricket";
    $scope.loadAllUrl = "/data/loadAllCricket";
    $scope.needsShowAll = false;
    $scope.predicate = '-dateMillis';

    $scope.games = [];
    $scope.allGames = [];

    $scope.acceptedInput = {
            "t20" : ["20","20","20"], "d20" : ["20","20"], "20" : ["20"], "t19" : ["19","19","19"], "d19" : ["19","19"], "19" : ["19"], "t18" : ["18","18","18"], "d18" : ["18","18"], "18" : ["18"],
            "t17" : ["17","17","17"], "d17" : ["17","17"], "17" : ["17"], "t16" : ["16","16","16"], "d16" : ["16","16"], "16" : ["16"], "t15" : ["15","15","15"], "d15" : ["15","15"], "15" : ["15"],
            "db" : ["b", "b"], "b" : ["b"],
            "t14" : [], "d14" : [], "14" : [], "t13" : [], "d13" : [], "13" : [], "t12" : [], "d12" : [], "12" : [], "t11" : [], "d11" : [], "11" : [], "t10" : [], "d10" : [], "10" : [], "t9" : [], "d9" : [], "9" : [],
            "t8" : [], "d8" : [], "8" : [], "t7" : [], "d7" : [], "7" : [], "t6" : [], "d6" : [], "6" : [], "t5" : [], "d5" : [], "5" : [], "t4" : [], "d4" : [], "4" : [], "t3" : [], "d3" : [], "3" : [], "t2" : [],
            "d2" : [], "2" : [], "t1" : [], "d1" : [], "1" : [], "0" : []
        };

    $scope.targets = [
        {"label" : "twenty", "num" : 0, "rank" : 1}, {"label" : "nineteen", "num" : 0, "rank" : 2}, {"label" : "eighteen", "num" : 0, "rank" : 3}, {"label" : "seventeen", "num" : 0, "rank" : 4},
        {"label" : "sixteen", "num" : 0, "rank" : 5}, {"label" : "fifteen", "num" : 0, "rank" : 6}, {"label" : "bull", "num" : 0, "rank" : 7}
    ];

    $scope.targetIndexes = {
        "20" : 0, "19" : 1, "18" : 2, "17" : 3, "16" : 4, "15" : 5, "b" : 6
    }







    $scope.cricket = { "twenty" : 0, "nineteen" : 0, "eighteen" : 0, "seventeen" : 0, "sixteen" : 0, "fifteen" : 0, "bullseye" : 0};

    // cancel a game
    $scope.cancelGame = function() {
        $scope.results = [];
        $scope.round.number = 1;
        $scope.isShowInputs = false;
    }

    $scope.showInputs = function() {
        $scope.isShowInputs = true;
    }

    $scope.gameFinished = function() {
        return false;
    }

    // record a single round/turn
    $scope.recordResult = function(result) {
        if ($scope.validateTurn(result)) {
            $scope.markTargets(result.firstDart, result.secondDart, result.thirdDart);
            var newResult = {"firstDart" : result.firstDart, "secondDart" : result.secondDart, "thirdDart" : result.thirdDart, "round" : $scope.round.number};
            $scope.results.push(newResult);
            $scope.round.number++;
            result.firstDart = "";
            result.secondDart = "";
            result.thirdDart = "";
            $("#firstDartInput").focus();
        }
    }

    $scope.validateTurn = function(result) {
        if (!result) {
            return false;
        }
        var darts = [result.firstDart, result.secondDart, result.thirdDart];

        // check for undefined darts  -- important if we start counting darts instead of rounds
        /*
        if ((!undefinedOrEmpty(result.firstDart) && undefinedOrEmpty(result.secondDart) && undefinedOrEmpty(result.thirdDart)) ||
            (!undefinedOrEmpty(result.firstDart) && !undefinedOrEmpty(result.secondDart) && undefinedOrEmpty(result.thirdDart))) {
            // if the game is over after marking the targets, fine, otherwise switch the undefineds to emptys?  crap for brains, just use emptys as darts for now
        } else if (!undefinedOrEmpty(result.firstDart) && !undefinedOrEmpty(result.secondDart) && !undefinedOrEmpty(result.thirdDart)) {
        } else {
            return false;
        }
        */

        // a turn should have at least one defined, not empty dart
        var isNotEmpty = false;
        var isValid = true;
        for (var i=0; i<darts.length;i++) {
            var dart = darts[i];
            if ((typeof dart != "undefined") && dart != "") {
                isNotEmpty = true;
            }
            isValid = $scope.validateDart(dart);
            if (!isValid) {
                return false;
            }
        }
        return isValid && isNotEmpty;
    }

    $scope.validateDart = function(dart) {
        return (undefinedOrEmpty(dart) || $scope.acceptedInput.hasOwnProperty(dart));
    }

    // arguments are strings that are in the acceptedInput object
    $scope.markTargets = function(firstDart, secondDart, thirdDart) {
        var darts = [firstDart, secondDart, thirdDart];
        for (var i=0; i<darts.length; i++) {
            var dart = darts[i];
            if (typeof dart != "undefined" && dart != "") {
                var hits = $scope.acceptedInput[dart];
                for (var j=0; j<hits.length; j++) {
                    var target = hits[j];
                    var targetIndex = $scope.targetIndexes[target];
                    if ($scope.targets[targetIndex].num < 3) {
                        $scope.targets[targetIndex].num++;
                    }
                }
            }
        }
    }

    $scope.gameFinished = function() {
        for(var i=0; i<$scope.targets.length; i++) {
            var target = $scope.targets[i];
            if (target.num < 3) {
                return false;
            }
        }
        return true;
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
                        var newResult = {'date' : data.displayDateTime, 'dateMillis' : data.dateMilliseconds, 'numRounds' : data.numRounds, 'score' : data.score, 'avg' : data.score};
                        $scope.games.unshift(newResult);
                        $scope.allGames.unshift(newResult);
                    }
                    $scope.isShowInputs = false;
                    $scope.reset();
                }).
                error(function(data, status) {
                    console.log("post results failed");
                    $scope.data = data || "Request failed";
                    $scope.status = status;
                });
        }
    };


    // gamesContainer is where we store the games that we parse from the response.  for the first request
    // we store them in the view container, for the lifetime stats we store them in a hidden container
    $scope.getResults = function(url, gamesContainer) {
        $http.get(url).
                success(function(data, status) {
                    $log.info(data);
                    $scope.numResults = data.totalNumResults;
                    var tempResults = data.dartsResults;
                    if (tempResults) {
                        var resultsLength = tempResults.length;
                        //$log.info("results length: " + resultsLength + ", total number of results: " + $scope.numResults);

                        for (var i=0; i < resultsLength; i++) {
                            var tempdata = tempResults[i];
                            var oldRound = {};
                            oldRound.id = tempdata.id;
                            oldRound.date = tempdata.displayDateTime;
                            oldRound.score = tempdata.score;
                            oldRound.avg = tempdata.score;
                            oldRound.dateMillis = tempdata.dateMilliseconds;
                            if (tempdata.score && tempdata.displayDateTime) {
                                gamesContainer.push(oldRound);
                            }
                        }
                        // if there are more results than we show, we need the show all button, and we also need to load up the rest of the data for calculating averages
                        if ($scope.initialNumGames <= resultsLength && resultsLength < $scope.numResults) {
                            $scope.needsShowAll = true;
                            $scope.loadAll();
                        // if there are fewer total results than we ask for, then just copy the data over into the structure for calculating averages.
                        } else if ($scope.initialNumGames >= resultsLength && resultsLength >= $scope.numResults) {
                            $scope.needsShowAll = false;
                            $scope.allGames = gamesContainer.slice();
                        // if we get all the results, load the data
                        } else {
                            // if we get here, do we have to set allGames?
                            $scope.allGames = gamesContainer.slice();
                        }
                    }
                }).
                error(function(data, status) {
                    $log.error("failed")
                })
    }

    // called from "show all" button click
    $scope.showAll = function() {
        $scope.games = [];
        if ($scope.allGames.length == 0) {
            $scope.getResults($scope.loadAllUrl, $scope.games);
        } else if ($scope.allGames.length > 0) {
            $scope.games = $scope.allGames.slice();
        }
        $scope.needsShowAll = false;
    }

    $scope.loadAll = function() {
        $scope.getResults($scope.loadAllUrl, $scope.allGames);
    }

    $scope.reset = function() {
        $scope.results = [];
        $scope.round.number = 1;
        for (var i=0; i<$scope.targets.length; i++) {
            $scope.targets[i].num = 0;
        }
    }

    $scope.getResults($scope.loadUrl, $scope.games);

    $scope.$watch(
    function() {return $scope.allGames.length},
    function() {
        if ($scope.allGames.length > 0) {
            var chart1; // globally available
            $(document).ready(function() {
                  var dates = [];
                  var scores = [];
                  var length = $scope.allGames.length-1;
                  for (var i=length; i > -1; i--) {
                    dates.push($scope.allGames[i].date);
                    scores.push($scope.allGames[i].avg);
                  }
                  chart1 = new Highcharts.Chart({
                     chart: {
                        renderTo: 'container',
                        type: 'line'
                     },
                     title: {
                        text: 'Darts!'
                     },
                     xAxis: {
                        categories: dates
                     },
                     yAxis: {
                        title: {
                           text: 'Avg'
                        }
                     },
                     series: [{
                        name: 'Average',
                        data: scores
                     }]
                  });
            });
        }
    });
}

