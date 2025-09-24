function adder(arr, value) {
    return arr.reduce(
        (acc, item) => acc + item,
        value === undefined ? 0 : value
    );
}

// if even, multiply; if odd, add
function sumOrMul(arr, value) {
    return arr.reduce(
        (acc, item) => {
            if (item % 2 === 0) {
                return acc * item;
            } else {
                return acc + item;
            }
        },
        value === undefined ? 0 : value
    );
}

function funcExec(funcs, initialValue) {
  return funcs.reduce((acc, fn) => fn(acc), initialValue);
}
