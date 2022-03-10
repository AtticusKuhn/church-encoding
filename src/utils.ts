// Store the original
// var origCall = Function.prototype.call;
// Function.prototype.call = function () {
//     // If console.log is allowed to stringify by itself, it will
//     // call .call 9 gajillion times. Therefore, lets do it by ourselves.


//     // The call. Apply is the only way we can pass all arguments, so don't touch that!
//     //@ts-ignore
//     origCall.apply(this, arguments);
// };
type Lazy<T> = {
    value: T;
    isLazy: boolean;
}
export type maybeLazy<T> = T | Lazy<T>;
//@ts-ignore
export const strict = <T>(x: maybeLazy<T>): T => "isLazy" in x ? x.value : x;
export const lazy = <T>(a: () => T): Lazy<T> => {
    const handler = {
        apply: function (target: () => T, _thisArg: any, argumentsList: any) {
            console.log(`Calculate sum: ${argumentsList}`);
            // expected output: "Calculate sum: 1,2"

            return target();
        },
        get: function (target: () => T, prop: string, __receiver: any) {
            if (prop === 'isLazy') {
                return true
            }
            return target()
        },
        has(target: () => T, key: string) {
            if (key === 'isLazy') {
                return true;
            }
            return key in target;
        }

    };


    const proxy1 = new Proxy(a, handler);
    //@ts-ignore
    return proxy1;
}