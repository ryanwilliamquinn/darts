'use strict';

/* Controllers */

angular.module("dartsApp.controller", []);
function mainController($scope, $http, $log, practiceNameService) {
    $scope.round = {"number" : 1};
    $scope.results = [];
    $scope.numRoundsAvailable = [{id : "5", rounds : "five", num : 5}, {id : "10", rounds : "ten", num : 10}];
    $scope.numRounds = $scope.numRoundsAvailable[1];
    $scope.isShowRounds = false;
    $scope.initialNumGames = 10;

    $scope.games = [];
    $scope.allGames = [];
    $scope.needsShowAll = true;
    $scope.allDataLoaded = false;
    $scope.displayShowAll = "hide";
    $scope.predicate = '-dateMillis';

    //$scope.targetTypes = [{id : "bull", label : "bullseye"}, {id : "t20", label : "triple 20"}, {id : "d20", label : "double 20"}, {id : "20", label :"20"},
    //                        {id : "t19", label : "triple 19"}, {id : "d19", label : "double 19"}, {id : "19", label : "19"}];

    $scope.targetTypes = [{id : "bull", label : "bullseye"}, {id : "20", label :"20"}, {id : "19", label :"19"}, {id : "18", label :"18"}, {id : "17", label :"17"},
                            {id : "16", label :"16"}, {id : "15", label :"15"}]

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
        $scope.reset();
        $scope.getData();
    }

    $scope.reset = function() {
        $scope.games = [];
        $scope.allGames = [];
        $scope.results = [];
    }

    // cancel a game
    $scope.cancelGame = function() {
        $scope.results = [];
        $scope.round.number = 1;
        $scope.isShowRounds = false;
    }

    // record a single round/turn
    $scope.recordResult = function(result) {
        if (result && isNumber(result.score)) {
            var newResult = {score : result.score, round : $scope.round.number};
            $scope.results.push(newResult);
            $scope.round.number++;
            result.score = "";
        }
    }

    // method for hiding rounds input once we finish the correct number of turns
    $scope.checkRoundsComplete = function() {
        return $scope.round.number > $scope.numRounds.num;
    }

    // save data to database, push it into games
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
                        // console.log(data);
                        var newResult = {'date' : data.displayDateTime, 'score' : data.score, 'dateMillis' : data.dateMilliseconds, 'numRounds' : data.numRounds};
                        newResult.avg = (newResult.score / newResult.numRounds);
                        $scope.games.push(newResult);
                        $scope.allGames.push(newResult);
                    }
                    $scope.isShowRounds = false;
                }).
                error(function(data, status) {
                    console.log("post results failed");
                    $scope.data = data || "Request failed";
                    $scope.status = status;
                });
        }

    };

    // called from "show all" button click
    $scope.showAll = function() {
        $scope.games = [];
        if ($scope.allGames.length == 0) {
            $scope.getResults($scope.loadAllUrl, $scope.games);
        } else if ($scope.allGames.length > 0) {
            console.log("are we getting in here somehow?  wtfs?");
            $scope.games = $scope.allGames.slice();
        }
        $scope.needsShowAll = false;
    }

    $scope.loadAll = function() {
        $scope.getResults($scope.loadAllUrl, $scope.allGames);
        if ($scope.allGames.length > 0) {
            // flip the switch to show historical averages and stuff
            $scope.allDataLoaded = true;
        }
    }

    // gamesContainer is where we store the games that we parse from the response.  for the first request
    // we store them in the view container, for the lifetime stats we store them in a hidden container
    $scope.getResults = function(url, gamesContainer) {
        $http.get(url).
                success(function(data, status) {
                    // $log.info(data);
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
                            oldRound.dateMillis = tempdata.dateMilliseconds;
                            oldRound.numRounds = tempdata.numRounds;
                            oldRound.avg = (oldRound.score / oldRound.numRounds);
                            if (tempdata.score && tempdata.displayDateTime) {
                                gamesContainer.push(oldRound);
                            }
                        }
                        // if there are more results than we show, we need the show all button, and we also need to load up the rest of the data for calculating averages
                        if ($scope.initialNumGames <= resultsLength && resultsLength < $scope.numResults) {
                            $scope.needsShowAll = true;
                            $scope.loadAll();
                            console.log("here?");
                        // if there are fewer total results than we ask for, then just copy the data over into the structure for calculating averages.
                        } else if ($scope.initialNumGames >= resultsLength && resultsLength >= $scope.numResults) {
                            $scope.needsShowAll = false;
                            $scope.allGames = $scope.games.slice();
                            console.log("in here");
                            console.log($scope.allGames.length);
                        } else {
                            // if we get here, do we have to set allGames?
                            console.log("cant be here right?");
                        }
                    }
                }).
                error(function(data, status) {
                    $log.error("failed")
                })
    }

    $scope.getData = function() {
        // first, load the last 10 results, show this right away
        $scope.getResults($scope.loadUrl, $scope.games);
    }

    $scope.getData();

    $scope.$watch(
        function() {return $scope.allGames},
        function() {$log.info("all games loaded")}
    );

    $scope.gameClicked = function() {
        var url = "/data/gameDetails" + this.game.id;
        $log.info("url: " + url);
        // this.game.id gets us the game id.
        //$log.info(this.game);
        $http.get(url).
            success(function(data, status) {
                $log.info(data);
            }).
            error(function(data, status) {
                $log.error("failed")
            })

    }

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
