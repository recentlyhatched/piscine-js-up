const multiply = (a, b) => {
    let result = 0

    for(let i = 1; i <= b; i++) {
        result += a
    }
    return result
}

const divide = (a, b) => {
    let result = a
    let count = 0
    for(let i = 1; i <= b; i++) {
        if(result < 0) {
            break
        }
        result -= b
        count++
    }
    return count
}

function modulo(a, b) {
    let result = a

    for(let i = 1; i <= b; i++) {
    
        result -= b
        if((result-b) < 0) {
            break
        }
    }
    return result
}

console.log(multiply(5, 4))
console.log(divide(21, 4))
console.log(modulo(21, 5))