angular.module('dartsApp.directives', []).
  directive('contenteditable', function() {
    return {
      restrict: 'A', // only activate on element attribute
      require: 'ngModel', // get a hold of NgModelController
      link: function(scope, element, attrs, ngModel) {
        if(!ngModel) return; // do nothing if no ng-model

        // Specify how UI should be updated
        ngModel.$render = function() {
          element.html(ngModel.$viewValue || '');
        };

        // Listen for change events to enable binding
        element.bind('keyup', function() {
          scope.$apply(read());
        });
        read(); // initialize

        // Write data to the model
        function read() {
          console.log("element: ");
          console.log(element);
          ngModel.$setViewValue(element.html());
        }
      }
    };
  });



  /*
angular.module('dartsApp.directives', []).
    directive('contenteditable', function() {
    return {
        link: function(scope, elm, attrs) {
        */
            /*
            // view -> model
            elm.bind('blur', function() {
                scope.$apply(function() {
                    ctrl.$setViewValue(elm.html());
                });
            });

            // model -> view
            ctrl.render = function(value) {
                elm.html(value);
            };

            // load init value from DOM
            ctrl.$setViewValue(elm.html());
            */
            /*
            elm.bind('keydown', function(event) {
                console.log("keydown " + event.which);
                var esc = event.which == 27,
                    el = event.target;
                var enter = event.which == 13,
                    el = event.target;
                var number = /[0-9]/

                var el = event.target;
                var keypress = event.which;
                // acceptedInputPattern is keycodes for all numbers and delete/backspace
                var acceptedInputPattern = /^(37|38|39|40|46|48|49|50|51|52|53|54|55|56|57|8)$/;
                var escapeOrEnter = /13|27/;
                console.log("element");
                console.log(el);
                if (acceptedInputPattern.test(keypress)) {
                    console.log("do your thing");
                    console.log(scope.result);
                    //scope.$apply("updateRounds(1,");
                    console.log(scope.result);
                } else if (escapeOrEnter.test(keypress)) {
                    console.log("esc");
                    el.blur();
                    event.preventDefault();
                } else {
                    event.preventDefault();
                }

            });

        }
    };
});
*/