'use strict'

//angular.module('dartsApp', ['practiceNameService']);

describe('simple practice controllers', function() {

  describe('mainController', function(){

  var scope, ctrl, $httpBackend, practiceNameService;

    beforeEach(module('dartsApp.mockService'));

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {

        $httpBackend = _$httpBackend_;
        $httpBackend.expectGET('/data/loadBulls').
           respond({totalNumResults : 1,
                    dartsResults : [{displayDateTime : 'Dec 18, 2012', score : 6}]});

        scope = $rootScope.$new();
        ctrl = $controller(mainController, {$scope: scope});
    }));

    it('should set up some urls', function() {
      expect(scope.games.length).toBe(0);
      $httpBackend.flush();
      expect(scope.round.number).toBe(1);
      expect(scope.postUrl).toBe("/data/bulls");
      expect(scope.loadUrl).toBe("/data/loadBulls");
      expect(scope.loadAllUrl).toBe("/data/loadAllBulls");
      expect(scope.results.length).toBe(0);
      expect(scope.games.length).toBe(1);
    });
  });
});





