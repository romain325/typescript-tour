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

----

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

## Generics

```ts

type Nullable<T> = T | undefined

interface Producer<T, U> {
    produce(properties: U): T
}

```
Créer une interface héritant de celle ci prenant un object ayant pour clé des strings et des valeurs de sting

---

```ts

interface ProducerWithProperties<T> extends Producer<T, {[k: string]: string}> {}
interface ProducerWithProperties<T> extends Producer<T, Record<string, string>> {}

```

----

## Commencer a chauffer la tete

Avec l'acces au type generique on peut commencer a faire des choses "chaotique"

```ts
type WhatAmIDoing<T extends readonly any[]> = T['length'];

// ???? FIXME ????
type test = WhatAmIDoing<[0,1,2,3,4,5,6]>
```

----

## encore des generique

Créer un type pour un instantiateur de classe capable de faire `new MaClasse()`
Je veux pouvoir ecrire `createInstance(MonType)` et recevoir mon instance typé!
attention je peux rajouter des classes dans le futur

```ts
class Wizard {
    spell: string
}
class Berzerk {
    weapon: string
}
```

----

```ts

function createInstance<T>(toCreate: (new () => T)) {
    return new toCreate();
}

const first = createInstance(Wizard);
const second = createInstance(Berzerk);

```

----

## Promis c'est la derniere

Créer une fonction `getProperty` qui prends un objet et une clé en parametre
Son typage doit faire en sorte que si la clé n'existe pas dans l'objet ts soit pas content 

> C'est bien le typage qui doit bloquer et non le runtime !

----

```ts
function getProperty<T, U extends keyof T>(arr: T, key: U) {
    return arr[key];
}

const test = {a: 1, d:5}
const res = getProperty(test, "a");

```

----

## Declare keywords & .d.ts

Dans un monde deja en .js, on peut quand meme rajouté du typage avec deux méthodes
le mot clé `declare` va donnez un typage a un objet js deja existant:

`declare const window = Window;`

On peut aussi créer des fichier avec l'extension .d.ts pour typer un fichier js

> Pro tips: Ces typages seront utilisable dans votre JsDoc ;) 

----

## Type utilitaires

Partial<Type> -> Type but all props are optional
Required<Type> -> Opposite of partial
ReadOnly<Type> -> Prefix all by readonly
Record<K,V> -> Objet avec type des clés et des valeurs
InstanceType<Type> ->  crée un type pour une isntance a partir de son constructeur

----

## infer

On peut créer des Objet generique c'est cool ! mais on peut avoir besoin de connaitre ce generique quand on recoit un autre objet, on a donc le mot clé infer !
Dans le cas d'un tableau, on veut recupérer le type contenu par exemple

```ts
type Flatten<T> = T extends Array<infer V> ? V : never; 
type Flatten<T> = T extends any[] ? T[number] : never; 

type Return<T> = T extends (...args: any) => infer R ? R : never;
```

---- 

## Distribution

Avec ce qu'on a vu on est capable de faire aussi l'inverse, passer d'un type a un tableau de type
Mais si je fais ca sur un type d'union que ce passe-t-il ?

```ts

type ToArray<T> = T[];
type test1 = ToArray<string | number>;

// test1 = (string | number)[];
//alors que

type ToArray<T> = T extends any ? T[] : never;
type test2 = ToArray<string | number>;

// test2 = string[] | number[]
// et pour finir 

type ToArray<T> = [T] extends [any] ? T[] : never;
// retournera (string|number)[];
```

----

## Objets

On peut aussi attaquer les objets et surtout leur clés
imaginons: Je veux créer un objets composé de getter a partir d'une structure que l'on m'a donné

```ts
type Getters<T> = {
    [k in keyof T as `get${k & string}`]: () => T[k];
} 

type TestType = {
    test: 'oui',
    non: string
}

type v = Getters<TestType>;
```

----

## Predicat

Defois on veut specialiser mais comment peut on faire sans caster comme un cochon: les predicats

```ts
type Human = {
    think: (...args: any[]) => void;
}


function isHuman(obj: any) : obj is Human {
    return (obj as Human).think !== undefined;
} 

if(isHuman(human)) {
    // cast en humain
} else {
    //tjr any
}
```

----

Si on est tres confiant on peut se faire confiance et caster violemment: 

```ts
const moi = <Human> obj;
```

----

## Enum (retour de la tranquilité)

```ts
enum  MonEnum{
    VAL
    OJ
}
enum SuperEnum {
    VAL = "incroybale",
    AZZE = 1234
}
```

> Honnetement autant utiliser des Const avec des Typeof :)

----

## Namespace

on peut faire des namespace, voila c'est tout

```ts
namespace Utils {
    type Test = () => void
}

const val : Utils.Test = () => {
    console.log("hyaou")
};
```

---- 

## Bonus

Pour ceux qui veulent se faire du mal: <https://github.com/type-challenges/type-challenges>

----

## Bonus 2

On veut currifier des fonctions !
en gros passer de cette signature:

```ts
type test = (a: string, b:number, c: boolean) => string
type test2 = (a: string) => (b: number) => (c: boolean) => string
// donc deduire automatiquement test2 a partir de test 
```

----

```ts
// infer les types
type Extract<T extends any[]> = T extends [any, ...infer R]
    // retourne le premier type
    ? T extends [...infer F, ...R]
        ? F
        : never
    : never

// infer all types
type Currified<F> = F extends (...args: infer Args) => infer Return
    // si plus d'arguments alors on retourne le type final
    ? Args['length'] extends 0 | 1
        ? F
        // sinon on extrait le prochaine argument et currifie recursivement
        : Args extends [any, ...infer Rest]
            ? (...args: Extract<Args>) => Currified<(...rest: Rest) => Return>
            : never
    : never

type test = (a: string, b:number, c: boolean) => string
type test2 = Currified<test>
```

---- 

Bien joué :)
plus qu'a écrire le js mtn :)
