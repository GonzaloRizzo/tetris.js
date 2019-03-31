export const randomItem = arr => {
    const elt = Math.floor(Math.random()*arr.length)
    return arr[elt]
}