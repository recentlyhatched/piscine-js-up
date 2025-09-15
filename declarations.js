const escapeStr = "\`\\\/\"\'"
const arr = [4, '2']
Object.freeze(arr)

const obj = {
    str: "string",
    num: 0,
    bool: false,
    undef: undefined,
}

Object.freeze(obj)

const nested = {
    arr: [4, undefined, '2'],
    obj: {
        str: "abc",
        num: 5,
        bool: true
    }
}
Object.deepFreeze(nested)
