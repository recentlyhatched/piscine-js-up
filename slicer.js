const slice = (item, i, end) => {
    end = end || item.length
    let result

    if(Array.isArray(item) === true) {
        result = []
        for(i; i < end; i++) {
            result.push(item[i])
        }
    }

    if(typeof item === "string") {
        result = ""
        for(i; i < end; i++) {
            result += item[i]
        }
    }
    
    return result
}
