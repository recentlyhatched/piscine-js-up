function currify(fn) {
    return function (a) {
        return function (b) {
            return fn(a, b)
        }
    }
}