'use strict';
import AllergiesActions from '../../../../app/pulsetileui/pages/allergies/allergies-actions.js';
// import '../../../../app/index';

describe('Allergies Actions', function() {

    beforeEach(angular.mock.module('ripple-ui'));

    it("AllergiesActions exist", function() {
        expect(AllergiesActions).toBeDefined();
    });
});