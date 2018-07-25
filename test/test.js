'use strict';

import { assert } from 'chai';
import webStorage from '../lib/webStorage';
const storage = webStorage();

describe('JSON Web Storage', function() {
    describe('webStorage default case', function() {
        it('should provide the exact same API with automatic JSON serialization', function() {
            let number;
            number = storage.getItem('number');
            assert.isNull(number);
            storage.setItem('number', 123.45);
            number = storage.getItem('number');
            assert.isNumber(number);
            assert.strictEqual(number, 123.45);

            let object;
            object = storage.getItem('object');
            assert.isNull(object);
            storage.setItem('object', { name: 'Manu' });
            object = storage.getItem('object');
            assert.isObject(object);
            assert.deepEqual(object, { name: 'Manu' });

            let temporary;
            temporary = storage.getItem('temporary');
            assert.isNull(temporary);
            storage.setItem('temporary', 'string');
            temporary = storage.getItem('temporary');
            assert.isString(temporary);
            assert.strictEqual(temporary, 'string');
            storage.removeItem('temporary');
            temporary = storage.getItem('temporary');
            assert.isNull(temporary);

            let key;
            key = storage.key(0);
            assert.equal(key, 'number');
            key = storage.key(1);
            assert.equal(key, 'object');
            key = storage.key(2);
            assert.isNull(key);
        });
    });
});
