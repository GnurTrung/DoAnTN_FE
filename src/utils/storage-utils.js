export const saveData = (key, data) => {
    if (!key) return
    localStorage.setItem(key, (typeof data === 'string' ? data : JSON.stringify(data)))
}

export const getData = (key) => {
    if (!key) return
    return localStorage.getItem(key);
}

export const deleteData = (key) => {
    localStorage.removeItem(key)
}

