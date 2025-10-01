function getJSON(path, ...params) {
    if(!params) {
        params = []
    }

    for(let i = 0; i < params.length; i++) {
        param[i] = `${params[i]}`
        path += params[i]
    }

    fetch(path)
     .then(response => response.json())
     .then(data => {
        return data})
     .catch(err => {
        throw new Error(err)
     })
}