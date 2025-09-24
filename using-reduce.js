function adder(arr, value) {
    return arr.reduce(
        (acc, item) => acc + item,
        value === undefined ? 0 : value
    );
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
