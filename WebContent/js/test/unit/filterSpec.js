describe('filter spec', function() {

    //var avg;

    /*
    beforeEach(inject(function(average) {
        avg = average;
    }));
    */
    beforeEach(module('dartsApp.filters'));

    describe('test average filter', function() {
        it('should calculate average', inject(function(averageFilter) {
            expect(averageFilter([])).toBe("");
        }));
    });
});





