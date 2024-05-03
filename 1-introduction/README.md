# Introduction

----

## Quick JS tour

Webkit browser usage: V8 for google chrome (also support WASM), SpiderMonkey for Mozilla (and
GNOME), JavaScriptCore (Safari)
Standalone usage : Node, Deno (both uses V8 under the hood), Bun (JavaScriptCore)

Package Manager: NPM, yarn, pnpm
Build Tool: webpack, rollup, esbuild, ...

----

## Js Standard

Js is based on the [ECMAScript](https://github.com/tc39) standard (ECMA262 precisely)
But all the engine doesn't support the same specs or the newest specs so you'll need build tools to
translate to an older version with build tools like babel

> https://en.wikipedia.org/wiki/ECMAScript

----

## What about typescript

Typescript can be seen as a 'superset' of Javascript, like babel translate new syntax to old syntax,
Typescript translate typed to non typed javascript that can be understood by engines.  
It is a compile tool

----

## Why using it then ?

Typescript provide Types safety, the compile will check that a given variable stay the same type and
then provide safety that a variable will always be a string for example

----

## Types

Primitives: `string`, `number`, `boolean`, `bigint` (!lowercase), array with `[]` and `any` (booo bad)
Functions : `() => void`, `(arg1: primitive) => number` 
```ts
function f(param1: string) : void { 
    return; 
}
```

Objects   : `{var1: number, var2: string[]}`

----

## Advanced types

Union : `string | number`, `(string | number)[]`, `string | number[]` check with typeof or Array.isArray
Type  : 
```ts
type QueryParam = string | string[];
const q : QueryParam = useRoute().query["q"];
```
Interface:
```ts
type QueryParam = {
    x: string
}
//same
interface QueryParam {
    x: string
}
```

----

## Type VS Interface

Interface can't aliases primitives, only for object

Extension:
```ts
type TAnimal = {
    name: string
}
//same
interface IAnimal {
    name: string
}

interface IDog extends IAnimal{
    owner: IAnimal[]
}
type TDog = TAnimal & {
    owner: TAnimal[]
}
```

Declaration: 
```ts
type TAnimal = {
    name: string
}
interface IAnimal {
    name: string
}

// ERROR
type TAnimal = {
    other: string
}

interface IAnimal {
    other: string
}
// When using IAnimal it'll equal:
// { name: string, other: string }
```

----

## Special primitive types

any : don't know the object, allow any manipulation
unknown : don't know the object, doesn't allow anything until the type is inferred
void: Just like java
null, undefined: Same as JS, can be used as types 

----

## Assertion

? : if undefined return undefined and doesn't throw undefined error `myUndefinedVar?.tab?[0]?.id`
! : assert that at this point the value can't be undefined, if it's undefined will break
