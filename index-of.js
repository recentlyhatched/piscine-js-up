function indexOf(arr, val, index = 0) {
    for(index; index < arr.length-1; index++) {
        if(arr[index] === val) {
            return index
        }
    }
    return -1
}
const lastIndexOf = (arr, val, index) => {
    index = index || arr.length-1

    for(index; index >= 0; index--) {
        if(arr[index] === val) {
            return index
        }
    }
    return -1
}

function includes(arr, val) {
    for(let i = 0; i < arr.length-1; i++) {
        if(arr[i] === val) {
            return true
        }
    }
}
