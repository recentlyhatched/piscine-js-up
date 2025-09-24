function adder(arr) {
    return arr.reduce((total, num) => total + num, 0)
}

// if even, multiply; if odd, add
function sumOrMul(arr) {
    return arr.reduce((total, num) => {
        if(num % 2 === 0) {
            return total*num
        } else {
            return total + num
        }
    })
}

function funcExec(funcs, initialValue) {
  return funcs.reduce((acc, fn) => fn(acc), initialValue);
}
