# Putkonen

Utility functions for the working man.

Note that this is mainly for personal use, however if you want to try it out in
your own code, feel free to do so.

## Usage

```bash
npm install --save putkonen
```

```js
import { each, flatten } from 'putkonen'

let flat = flatten(['foo', [ 'bar', [ 'baz' ] ]])
console.log(flat)
// ['foo', 'bar', 'baz']
```
