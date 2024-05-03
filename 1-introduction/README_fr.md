# Introduction

----

## Quick JS tour

Webkit browser utilisation: V8 pour google chrome (supporte aussi WASM), SpiderMonkey pour Mozilla (
et aussi
GNOME), JavaScriptCore (Safari)
Standalone usage : Node, Deno (les deux utilises V8), Bun (utilise JavaScriptCore)

Package Manager: NPM, yarn, pnpm
Build Tool: webpack, rollup, esbuild, ...

----

## Js Standard

Js est basé sur le standart [ECMAScript](https://github.com/tc39) (ECMA262 precisement)
Tout les moteurs ne supporte pas les dernieres specs ecma et on a parfois besoin de build tools
comme babel pour translate vers d'ancienne version

> https://en.wikipedia.org/wiki/ECMAScript

----

## What about typescript

Typescript est un 'superset' de Javascript, babel traduit la nouvelle syntax vers l'ancienne syntax,
Typescript traduit du code typé vers du non typé compréhensible par tout les moteurs.  
Typescript est un outil de build !

----

## Why using it then ?

Typescript apporte la Types safety, la compilation va verifier qu'une variable porte un type et un
seul et nous assure que le type du contenu est le meme

----

## Types

Primitives: `string`, `number`, `boolean`, `bigint` (!minuscule), array avec `[]` et `any` (booo
bad)
Functions : `() => void`, `(arg1: primitive) => number`

```ts
function f(param1: string): void {
    return;
}
```

Objects   : `{var1: number, var2: string[]}`

----

## Advanced types

Union : `string | number`, `(string | number)[]`, `string | number[]` 
Type  :

```ts
type QueryParam = string | string[];
const q: QueryParam = useRoute().query["q"];
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

Les interface ne peuvent pas servir d'alias pour les primitives !

Extension:

```ts
type TAnimal = {
    name: string
}

//same
interface IAnimal {
    name: string
}

interface IDog extends IAnimal {
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

// Lorsquon utiliser IAnimal le type sera:
// { name: string, other: string }
```

----

## Special primitive types

any : connait pas l'objet, permet tout les manipulation
unknown : connait pas l'objet, ne permet aucun mouvement tant que aucun type n'est inferré
void: comme en java
null, undefined: comme JS, peut simplement etre utilisé comme types

----

## Assertion

? : si undefined, return undefined et ne lance pas d'erreur undefined `myUndefinedVar?.tab?[0]?.id`
! : assert au compilo que la variable est non null, si elle l'est ca casse
