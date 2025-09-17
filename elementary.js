const multiply = (a, b) => {
    let result = 0
    let isNegative = false

    if((a < 0 && b > 0) || (a > 0 && b < 0)) {
        isNegative = true
    }

    for(let i = 1; i <= Math.abs(b); i++) {
        result += Math.abs(a)
    }
    if(isNegative) {
        return -result
    }
    return result
}

const divide = (a, b) => {
    if(Math.abs(b) > Math.abs(a)) {
        return 0
    }

    let result = Math.abs(a)
    let isNegative = false

    if((a < 0 && b > 0) || (a > 0 && b < 0)) {
        isNegative = true
    }

    let count = 0
    for(let i = 1; i <= Math.abs(b); i++) {
        result -= Math.abs(b)
        count++
        if((result-Math.abs(b)) < 0) {
            break
        }
    }

    if(isNegative) {
        return -result
    }

    return count
}

function modulo(a, b) {
    if(Math.abs(b) > Math.abs(a)) {
        return Math.abs(a)
    }

    let result = Math.abs(a)
    let isNegative = false

    if((a < 0 && b > 0) || (a > 0 && b < 0)) {
        isNegative = true
    }
    
    for(let i = 1; i <= Math.abs(b); i++) {
    
        result -= Math.abs(b)
        if((result-Math.abs(b)) < 0) {
            break
        }
    }

    if(isNegative) {
        return -result
    }

    return result
}

console.log(multiply(5, -4))
console.log(divide(21, -4))
console.log(modulo(21, -5))
console.log(modulo(34, 78))
console.log(divide(78, 34))

