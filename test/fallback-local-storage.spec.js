import { expect } from 'chai';
import FallbackLocalStorage from '../index.js';

describe('Given an instance of my library', function() {
    let lib;
    before(function() {
        lib = new FallbackLocalStorage();
    });
    describe('when I need the name', function() {
        it('should return the name', () => {
            expect(lib.name).to.be.equal('FallbackLocalStorage');
        });
    });
});