const escapeStr = "\`\\\/\"\'"
const arr = [4, '2']
const obj = {
    str: "string",
    num: 0,
    bool: false,
    undef: undefined,
}

const nested = {
    arr: [4, undefined, '2'],
    obj: {
        str: "abc",
        num: 5,
        bool: true
    }
}
Object.freeze(nested)
Object.freeze(arr)
Object.freeze(obj)
