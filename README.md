

# webstoragejs

A simple, JavaScript API for handling localStorage/sessionStorage with **automatic JSON serialization** and **namespace** supported.

[![NPM](https://nodei.co/npm/webstoragejs.png?downloads=true&stars=true)](https://www.npmjs.com/package/webstoragejs/)

## Installation

1. Install the latest version of [webstoragejs](https://github.com/seawind543/web-storage):

```
  npm install --save webstoragejs
  ```

2. At this point you can import `webstoragejs` and its styles in your application as follows:

```javascript
import webStorage from 'webstoragejs';
```

## Usage

The API is identical to the standard [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage). The only difference is that the items we put/get are automatically serialized/unserialized with JSON.stringify() and JSON.parse().

## API

### Constructer
Build a new webStorage object for operator under specific namespace and storage.
```javascript
import webStorage from 'webstoragejs';
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
Set item into storage under specific namespace.
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
Get item from storage under specific namespace.
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
Remove item from storage under specific namespace.
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

### size
Get count of items from storage under specific namespace.
```javascript
const storage = webStorage();
const otherStorage = webStorage({ namespace: 'other' });

const size = storage.size();
const otherSize = otherStorage.size();
console.log(size) // => 0
console.log(otherSize) // => 0

storage.setItem('num', 123);
storage.setItem('str', 'example');

const newSize = storage.size();
const newOtherSize = otherSize.size();
console.log(newSize); // => 2
console.log(newOtherSize); // => 0
```

### clear
Clears all stored keys from storage under specific namespace.
```javascript
const storage = webStorage();
const otherStorage = webStorage({ namespace: 'other' });

storage.setItem('num', 123);
storage.setItem('str', 'example');

otherStorage.setItem('num', 123);
otherStorage.setItem('str', 'example');

console.log(storage.size()); // => 2
console.log(otherStorage.size()); // => 2

// Clears all stored keys from storage
storage.clear();

console.log(storage.size()); // => 0
console.log(otherStorage.size()); // => 2

```

## Example

### Basic
```javascript
import webStorage from 'webstoragejs';
const storage = webStorage();

// Set number
storage.setItem('num', 123);
const num = storage.getItem('num');
console.log(typeof num); // => number
console.log(num); // => 123

// set string
storage.setItem('str', 'example');
const str = storage.getItem('str');
console.log(typeof str); // => string
console.log(num); // => example

// Set Object
storage.setItem('obj', { value: 'example' });
const obj = storage.getItem('obj');
console.log(typeof obj); // => object
console.log(obj.value); // => example
```

### Set value
```javascript
import webStorage from 'webstoragejs';
const storage = webStorage();
storage.setItem('obj', { value: 'example' });
```

### Get value
```javascript
import webStorage from 'webstoragejs';
const storage = webStorage();
const obj = storage.getItem('obj');

// Try to get value, return defalut value if cannot get value correctly
const value = storage.getItem('nun', 'I am default value');
```

### Apply customize namespace
```javascript
import webStorage from 'webstoragejs';
const storage = webStorage({ namespace: 'test' });
storage.setItem('num', 123.45);
```
### Apply sessionStorage
```javascript
import webStorage from 'webstoragejs';
const storage = webStorage({ sessionStorage: true });
storage.setItem('num', 123.45);
```

## License

[MIT](https://github.com/seawind543/web-storage/blob/master/LICENSE)