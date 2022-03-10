// This is how numerals are encoded. They take a function and a value then apply that function to the value or the previous result of application n times where n is the number being encoded.

import { If } from "./booleans";
import { eq } from "./predicates";
import { lazy, maybeLazy, strict } from "./utils";

// ## General

// zero is the KI combinator just like False - not very type safe!
export type cNat = <T>(f: (a: T) => T) => (x: T) => T;
export const zero: cNat = _ => x => x
// and one is the I* combinator
export const one: cNat = f => x => f(x)
export const two: cNat = f => x => f(f(x))
export const three: cNat = f => x => f(f(f(x)))
export const four: cNat = f => x => f(f(f(f(x))))
export const five: cNat = f => x => f(f(f(f(f(x)))))
export const six: cNat = f => x => f(f(f(f(f(f(x))))))
export const seven: cNat = f => x => f(f(f(f(f(f(f(x)))))))
export const eight: cNat = f => x => f(f(f(f(f(f(f(f(x))))))))
export const nine: cNat = f => x => f(f(f(f(f(f(f(f(f(x)))))))))
export const ten: cNat = f => x => f(f(f(f(f(f(f(f(f(f(x))))))))))

// `succ` takes a numeral and returns its successor
// ```javascript
// succ(three) // => four
// succ(four) // => five
// ```
export const succ = (a: cNat): cNat => (b) => (c) => a(b)(b(c))
// `pred` takes a numeral and returns its predecessor. There is a catch here, if the number supplied is zero then zero will be returned
// ```javascript
// pred(five) // => four
// pred(four) // => three
// pred(zero) // => zero
// ```
//@ts-ignore
export const pred = (a: cNat): cNat => b => (c) => a(d => e => e(d(b)))(_ => c)(a => a);

// `add` takes two numerals and returns their sum
// ```javascript
// add(four)(three) // => seven
// ```
export const add = (a: cNat) => (b: cNat): cNat => c => d => b(c)(a(c)(d))

// `sub` takes two numerals and returns their difference. Again there is catch in that if the difference is negative then zero will be returned
// ```javascript
// sub(three)(one) // => two
// sub(three)(two) // => one
// sub(three)(three) // => zero
// sub(three)(four) // => zero
// ```
export const sub = (a: cNat) => (b: cNat): cNat => b(pred)(a)

// `mult` takes two numerals and returns their product. This is the B combinator
// ```javascript
// mult(two)(five) // => ten
// ```
export const mult = (a: cNat) => (b: maybeLazy<cNat>): cNat => c => a(strict(b)(c))

// `exp` takes two numerals and returns the first to the power of the second. This is the T combinator
// ```javascript
// exp(ten)(zero) // => one
// exp(two)(two) // => four
// exp(three)(two) // => nine
// ```
export const exp = (a: cNat) => (b: cNat): cNat => b(a)

// ## Encoding & Decoding

// `encodeNumeral` takes a JS number and returns the corresponding Church encoded numeral
// ```javascript
// encodeNumeral(3) // => three
// ```
//@ts-ignore
export const encodeNumeral = (n: number): cNat => f => x => Array.apply(null, { length: n }).reduce(f, x)

// `decodeNumeral` takes a Church encoded numeral and returns the corresponding JS number
// ```javascript
// decodeNumeral(three) // => 3
// ```
export const decodeNumeral = (a: cNat): number => a<number>(b => b + 1)(0)
export const factorial = (n: cNat): cNat => If<cNat>(eq(n)(zero))
    (zero)
    (mult(n)
        (lazy(() => factorial(pred(n)))))