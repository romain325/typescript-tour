type If<C extends boolean, T, F> = C extends true ? T : F;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
    Expect<Equal<If<true, 'a', 'b'>, 'a'>>,
    Expect<Equal<If<false, 'a', 2>, 2>>,
    Expect<Equal<If<boolean, 'a', 2>, 'a' | 2>>,
]

// don't get this one even with type check and shit
// ts-expect-error
type error = If<null, 'a', 'b'>
