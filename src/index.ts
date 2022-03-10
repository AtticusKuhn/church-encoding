import { decodeBoolean, True } from "./booleans";
import { eq } from "./predicates";
import { setContains, setOfBools } from "./set";

// console.log(
//     decodeNumeral(factorial(five))
// )
//@ts-ignore
console.log(decodeBoolean(eq(True)(True)))
console.log(decodeBoolean(setContains(setOfBools)(True)))