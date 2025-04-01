# callsites

> Get callsites from the [V8 stack trace API](https://v8.dev/docs/stack-trace-api)

## Install

```sh
npm install callsites
```

## Usage

```js
import callsites from 'callsites';

function unicorn() {
	console.log(callsites()[0].getFileName());
	//=> '/Users/sindresorhus/dev/callsites/test.js'
}

unicorn();
```

## API

Returns an array of callsite objects with the following methods:

- `getThis`: Returns the value of `this`.
- `getTypeName`: Returns the type of `this` as a string. This is the name of the function stored in the constructor field of `this`, if available, otherwise the object's `[[Class]]` internal property.
- `getFunction`: Returns the current function.
- `getFunctionName`: Returns the name of the current function, typically its `name` property. If a name property is not available an attempt will be made to try to infer a name from the function's context.
- `getMethodName`: Returns the name of the property of `this` or one of its prototypes that holds the current function.
- `getFileName`: If this function was defined in a script returns the name of the script.
- `getLineNumber`: If this function was defined in a script returns the current line number.
- `getColumnNumber`: If this function was defined in a script returns the current column number
- `getEvalOrigin`: If this function was created using a call to `eval` returns a string representing the location where `eval` was called.
- `isToplevel`: Returns `true` if this is a top-level invocation, that is, if it's a global object.
- `isEval`: Returns `true` if this call takes place in code defined by a call to `eval`.
- `isNative`: Returns `true` if this call is in native V8 code.
- `isConstructor`: Returns `true` if this is a constructor call.
- `isAsync()`: 	Returns `true` if this call is asynchronous (i.e. `await`, `Promise.all()`, or `Promise.any()`).
- `isPromiseAll()`: Returns `true` if this is an asynchronous call to `Promise.all()`.
- `getPromiseIndex()`: Returns the index of the promise element that was followed in `Promise.all()` or `Promise.any()` for async stack traces, or `null` if the `CallSite` is not an asynchronous `Promise.all()` or `Promise.any()` call.
