const get = (key) => {
    return sourceObject[key]
}

function(key, value) {
    sourceObject[key] = value
    return value
}