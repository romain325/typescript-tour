type MyOmit<T, K extends keyof T> = { [k in keyof T as k extends K ? never : (k extends null ? never : k)]: T[k] } // the 'as' allow to interpret the key as on of the keyof T so a valid key
type MyOmit2<T, K> = Pick<T, Exclude<keyof T, K>>


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type test = MyOmit<Todo, 'description'>

type cases = [
    Expect<Equal<Expected1, MyOmit<Todo, 'description'>>>,
    Expect<Equal<Expected2, MyOmit<Todo, 'description' | 'completed'>>>,
    Expect<Equal<Expected3, MyOmit<Todo1, 'description' | 'completed'>>>,
]

// @ts-expect-error
type error = MyOmit<Todo, 'description' | 'invalid'>

interface Todo {
    title: string
    description: string
    completed: boolean
}

interface Todo1 {
    readonly title: string
    description: string
    completed: boolean
}

interface Expected1 {
    title: string
    completed: boolean
}

interface Expected2 {
    title: string
}

interface Expected3 {
    readonly title: string
}
