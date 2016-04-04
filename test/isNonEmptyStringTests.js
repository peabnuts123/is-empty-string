require('blanket');

var assert = require('assert');
var isNonEmptyString = require('../index.js')({ direct: true, prototype: true });

describe('isNonEmptyString', function() {
    describe('direct mode', function() {
        it('should be referenced correctly', function() {
            assert.notEqual(typeof isNonEmptyString, 'undefined');
        }) 
        
        it('returns false for empty string', function() {
            assert.equal(isNonEmptyString(''), false);
        });
        
        it('returns false for spaces', function() {
            assert.equal(isNonEmptyString('      '), false); 
        });
        
        it('returns false for tabs', function() {
            assert.equal(isNonEmptyString('\t\t\t\t\t\t\t'), false);
        });
        
        it('returns false for newline characters', function() {
            assert.equal(isNonEmptyString('\r\n\r\n'), false); 
        });
        
        it ('returns false for non-breaking space', function() {
            assert.equal(isNonEmptyString('\xa0\xa0\xa0\xa0'), false);
        })
        
        it('returns false for a mixed bag', function() {
            assert.equal(isNonEmptyString('        \t\t\t\n\n\n \n\r\r \r\r \r\t \t\t\t    '), false); 
        });
        
        it('returns false for null', function() {
            assert.equal(isNonEmptyString(null), false);
        });
        
        it('returns false for undefined', function() {
            assert.equal(isNonEmptyString(undefined), false);
        });
        
        it('returns false for a NaN', function() {
            assert.equal(isNonEmptyString(NaN), false);
        });
        
        it('returns false for a Number', function() {
            assert.equal(isNonEmptyString(0), false); 
        });
        
        it('returns false for an empty array', function() {
            assert.equal(isNonEmptyString([]), false);
        });
        
        it('returns false for an empty object', function() {
            assert.equal(isNonEmptyString({}), false); 
        });
        
        it('returns false for a boolean', function() {
            assert.equal(isNonEmptyString(true), false); 
        });
        
        it('returns true for a non-whitespace string', function() {
            assert.equal(isNonEmptyString("_"), true); 
        });
        
        it('returns true for a sparse but non-empty string', function() {
            assert.equal(isNonEmptyString('                \t\t\t\t\t\r\r\r\r\r\r\n\n\n\xa0\xa0.\t\t\t\t            '), true); 
        });
    });
    
    describe('prototype mode', function() {
        it('returns false for empty string', function() {
            assert.equal(''.isNonEmpty(), false);
        });
        
        it('returns false for spaces', function() {
            assert.equal('      '.isNonEmpty(), false); 
        });
        
        it('returns false for tabs', function() {
            assert.equal('\t\t\t\t\t\t\t'.isNonEmpty(), false);
        });
        
        it('returns false for newline characters', function() {
            assert.equal('\r\n\r\n'.isNonEmpty(), false); 
        });
        
        it ('returns false for non-breaking space', function() {
            assert.equal('\xa0\xa0\xa0\xa0'.isNonEmpty(), false);
        })
        
        it('returns false for a mixed bag', function() {
            assert.equal('        \t\t\t\n\n\n \n\r\r \r\r \r\t \t\t\t    '.isNonEmpty(), false); 
        });
        
        it('returns true for a non-whitespace string', function() {
            assert.equal("_".isNonEmpty(), true); 
        });
        
        it('returns true for a sparse but non-empty string', function() {
            assert.equal('                \t\t\t\t\t\r\r\r\r\r\r\n\n\n\xa0\xa0.\t\t\t\t            '.isNonEmpty(), true); 
        });
    });
    
    describe('setup', function() {
        function createCallWithOptions(options) {
            return function testFunction() {
                return require('../index.js')(options);
            }
        }
        
        it('returns a function', function() {
           assert.equal(typeof createCallWithOptions({}), 'function'); 
        });
        
        it('throws no error with no parameters', function() {
            assert.doesNotThrow(createCallWithOptions());
        });
        
        it('throws no error when specifying just direct true', function() {
            assert.doesNotThrow(createCallWithOptions({ direct: true })); 
        });
        
        it('throws no error when specifying just prototype true', function() {
            assert.doesNotThrow(createCallWithOptions({ prototype: true })); 
        });
        
        it('throws no error when specifying just prototype false', function() {
            assert.doesNotThrow(createCallWithOptions({ prototype: false }));
        });
        
        it('throws no error when specifying direct true and prototype false', function() {
            assert.doesNotThrow(createCallWithOptions({ direct: true, prototype: false })); 
        });
        
        it('throws no error when specifying direct false and prototype true', function() {
            assert.doesNotThrow(createCallWithOptions({ direct: false, prototype: true }));
        });
        
        it('throws no error when specifying direct AND prototype true', function() {
            assert.doesNotThrow(createCallWithOptions({ direct: true, prototype: true })); 
        });
        
        it('throws an error when specifying direct AND prototype false', function() {
            assert.throws(createCallWithOptions({ direct: false, prototype: false }), "Can't invoke is-nonempty-string with all modes disabled!");
        });
        
        it('throws an error when specifying just direct false', function() {
            assert.throws(createCallWithOptions({ direct: false }), "Can't invoke is-nonempty-string with all modes disabled!");
        });
        
        it('throws an error when specifying an invalid parameter', function() {
            assert.throws(createCallWithOptions({ notReal: true }), "Invalid option for isNonEmptyString:");
        });
        
        it('throws an error when specifying direct as a non-boolean value', function() {
            assert.throws(createCallWithOptions({ direct: 1 }), "Invalid option for isNonEmptyString, 'direct' must be a boolean value"); 
        });
        
        it('throws an error when specifying prototype as a non-boolean value', function() {
            assert.throws(createCallWithOptions({ prototype: 1 }), "Invalid option for isNonEmptyString, 'prototype' must be a boolean value");
        });
        
        it('throws an error when a non-object parameter is passed in', function() {
           assert.throws(createCallWithOptions("hello!"), "Invalid options supplied for isNonEmptyString. Options must be an object"); 
        });
    });
});