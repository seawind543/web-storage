
# webStorage

A simple, JavaScript API for handling localStorage/sessionStorage with automatic JSON serialization.

## Installation

TBD

## Usage

The API is identical to the standard [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage). The only difference is that the items we put/get are automatically serialized/unserialized with JSON.stringify() and JSON.parse().

## API

### Constructer
```javascript
import webStorage from '{{PATH}}/lib/webStorage';
const storage = webStorage(options);
/**
 * @ options.namespace
 * Type: string
 * Required: false
 * Default: 'default'
 * Description: The namespace for set/get item into/from target storage.
 */ 

/**
 * @ options.sessionStorage
 * Type: bool
 * Required: false
 * Default: false
 * Description: Apply the target storage (One of [window.localStorage, window.sessionStorage]) for set/get item. 
 ** false: Will take window.localStorage
 ** true: Will take window.sessionStorage
 ** If target storage not avlible, then in-memory object will be used. For example sofari do not support localStorage/sessionStorage in private browsing mode.
 */ 
```
### setItem
```javascript
const storage = webStorage();
storage.setItem(key, value);
/**
 * @ key
 * Type: string
 * Required: true
 * Description: The key for set item into target storage.
 */ 

/**
 * @ value
 * Type: Any valid type. Such as number, string, object, array
 * Required: true
 * Description: The value ned to set into target storage. 
 */ 
```

### getItem
```javascript
const storage = webStorage();
storage.getItem(key, defaultValue);
/**
 * @ key
 * Type: string
 * Required: true
 * Description: The key for get item from target storage.
 */ 

/**
 * @ defaultValue
 * Type: Any valid type. Such as number, string, object, array
 * Required: false
 * Default: undefined
 * Description: The default value returned when try to get value failed.
 */ 
```
### removeItem
```javascript
const storage = webStorage();
storage.removeItem(key);
/**
 * @ key
 * Type: string
 * Required: true
 * Description: The key for remove item from target storage.
 */ 
```

## Example

### Basic
```javascript
import webStorage from '{{PATH}}/lib/webStorage';
const storage = webStorage();

// Set number
storage.setItem('num', 123);
const num = storage.getItem('num');
console.log(typeof num) // => number
console.log(num) // => 123

// set string
storage.setItem('str', 'example');
const str = storage.getItem('str');
console.log(typeof str) // => string
console.log(num) // => example

// Set Object
storage.setItem('obj', { value: 'example' });
const obj = storage.getItem('obj');
console.log(typeof obj) // => object
console.log(obj.value) // => example
```

### Set value
```javascript
import webStorage from '{{PATH}}/lib/webStorage';
const storage = webStorage();
storage.setItem('obj', { value: 'example' });
```

### Get value
```javascript
import webStorage from '{{PATH}}/lib/webStorage';
const storage = webStorage();
const obj = storage.getItem('obj');

// Try to get value, return defalut value if cannot get value correctly
const value = storage.getItem('nun', 'I am default value');
```

### Apply namespace
```javascript
import webStorage from '{{PATH}}/lib/webStorage';
const storage = webStorage('test');
storage.setItem('num', 123.45);
```
### Apply sessionStorage
```javascript
import webStorage from '{{PATH}}/lib/webStorage';
const storage = webStorage('test', window.sessionStorage);
storage.setItem('num', 123.45);
```

## License

MIT
