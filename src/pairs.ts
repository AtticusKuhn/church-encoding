// `pair` takes two values which are effectively stored as a two-tuple that can then be accessed by `first` and `second` detailed below. This is the V combinator
// ```javascript
// pair('first value')('second value')
// // => pair('first value')('second value')
// ```
export type cPair<A, B> = (x: (a: A) => (B: B) => A | B) => A | B;
export const pair = <A, B>(a: A) => (b: B): cPair<A, B> => c => c(a)(b)

// when a pair is applied with `first` the first value in the pair is returned. This is TK in combinatory logic
// ```javascript
// pair('first value')('second value')(first)
// // => 'first value'
// ```
//@ts-ignore
export const first = <A, B>(a: cPair<A, B>): A => a((b: A) => (_: B) => b)

// when a pair is applied with `second` the first value in the pair is returned. This is TKI in combinatory logic
// ```javascript
// pair('first value')('second value')(second)
// // => 'second value'
// ```
//@ts-ignore
export const second = <A, B>(a: cPair<A, B>): B => a(_ => b => b)