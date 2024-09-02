/// type Last<T extends any[]> = T[T['length']];

type Last<T extends any[]> = T extends [...infer _balek, infer R] ? R : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type test = Last<[1,2,3]>;

type cases = [
    Expect<Equal<Last<[]>, never>>,
    Expect<Equal<Last<[2]>, 2>>,
    Expect<Equal<Last<[3, 2, 1]>, 1>>,
    Expect<Equal<Last<[() => 123, { a: string }]>, { a: string }>>,
]
