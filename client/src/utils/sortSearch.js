
export function sortCollection(collection, sortBy, direction) {
    if (direction === 'asc') {
        return collection.sort((a, b) => {
            if (typeof a[sortBy] === 'string') {
                return a[sortBy].localeCompare(b[sortBy])
            }
            return a[sortBy] - b[sortBy]
        })
    } else {
        return collection.sort((a, b) => {
            if (typeof a[sortBy] === 'string') {
                return b[sortBy].localeCompare(a[sortBy])
            }
            return b[sortBy] - a[sortBy]
        })
    }
}

export function search(collection, filterBy, term) {
    return collection.filter(item => item[filterBy].startsWith(term.toLowerCase()))
}