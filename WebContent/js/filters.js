'use strict';

/* Filters */
angular.module('dartsApp.filters', []).
    filter('average', function() {
        return function(input) {
            //$log.info(input);
            var sum = 0;
            var length = input.length;
            if (length < 1) {
                return "";
            }
            for (var i=0; i<length; i++) {
                sum += Number(input[i].score);
            }
            //$log.info(sum);
            var average = sum/length;
            return average.toFixed(1);
        }
    });
