import { multiplyMatrix } from './math'
export const randomItem = arr => {
    const elt = Math.floor(Math.random()*arr.length)
    return arr[elt]
}

export const cloneBuffer = buffer => {
    return buffer.map(column => column.slice())
}

export const rotatePoint = (point, centerPoint, clockwise=true)=>{
    const rotationMatrix = clockwise ? [[0, -1, 0], [1, 0, 0], [0, 0, 1]] :  [[0, 1, 0], [-1, 0, 0], [0, 0, 1]]
    const [centerX, centerY] = centerPoint
    let [x, y] = point

    x -= centerX
    y -= centerY

    let [[newX], [newY], [_]] = multiplyMatrix(rotationMatrix, [[x], [y], [1]])

    newX += centerX
    newY += centerY

    return [newX, newY]
}