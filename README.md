# Putkonen

Utility functions for the working man.

Note that this is mainly for personal use, however if you want to try it out in
your own code, feel free to do so.

## Usage

```bash
npm install --save putkonen
```

```js
import { flatten } from 'putkonen'

flatten(['foo', ['bar', ['baz']]]) // ['foo', 'bar', 'baz']
```
