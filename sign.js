const sign = (num) => {
    if (num > 0) {
        return 1
    } else if (num < 0) {
        return -1
    } else {
        return 0
    }
}

function sameSign(a, b) {
    if (a > 0 && b > 0) {
        return true
    }

    if (a < 0 && b < 0) {
        return true
    }

    if (a === 0 && b === 0) {
        return true
    }
}