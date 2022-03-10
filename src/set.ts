import { and, cBool, False, or, True } from "./booleans";
import { eq } from "./predicates";

export type cSet<T> = (equalityFunc: (a: T) => (b: T) => cBool) => (x: T) => cBool;
export const emptySet: cSet<any> = (_x) => (_x) => False;
export const fullSet: cSet<any> = (_x) => (_x) => True;
export const setContains = <T>(set: cSet<T>) => (x: T): cBool => set(x);
export const singletonSet = <T>(x: T): cSet<T> => undefined;
export const setUnion = <T>(set1: cSet<T>) => (set2: cSet<T>): cSet<T> => (x: T) => and(set1(x))(set2(x));
export const setAdd = <T>(set: cSet<T>) => (x: T): cSet<T> => (y: T) => or
    //@ts-ignore    
    (eq(y)(x))
    (set(y))


export const setOfBools: cSet<cBool> = setAdd(setAdd(emptySet)(True))(False)