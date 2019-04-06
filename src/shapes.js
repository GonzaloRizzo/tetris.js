import { randomItem } from './utils';
import { XBLOCKS } from './constants';

export const dropI = (buffer) => {
    const x = Math.round(XBLOCKS/2)
    const y = 0;
    buffer.set(x-1, y, 'I')
    buffer.set(x,   y, 'I')
    buffer.set(x+1, y, 'I')
    buffer.set(x+2, y, 'I')
    buffer.centerPoint = [x, y]
}

export const dropO = (buffer) => {
    const x = Math.round(XBLOCKS/2)
    const y = 0;
    buffer.set(x, y, 'O')
    buffer.set(x+1, y, 'O')
    buffer.set(x, y+1, 'O')
    buffer.set(x+1, y+1, 'O')
    buffer.centerPoint = [x, y]
}

export const dropT = (buffer) => {
    const x = Math.round(XBLOCKS/2)
    const y = 0;
    buffer.set(x, y, 'T')
    buffer.set(x, y+1, 'T')
    buffer.set(x-1, y+1, 'T')
    buffer.set(x+1, y+1, 'T')
    buffer.centerPoint = [x, y+1]
}
export const dropS = (buffer) => {
    const x = Math.round(XBLOCKS/2)
    const y = 0;
    buffer.set(x, y, 'S')
    buffer.set(x+1, y, 'S')
    buffer.set(x, y+1, 'S')
    buffer.set(x-1, y+1, 'S')
    buffer.centerPoint = [x, y+1]
}

export const dropZ = (buffer) => {
    const x = Math.round(XBLOCKS/2)
    const y = 0;
    buffer.set(x, y, 'Z')
    buffer.set(x-1, y, 'Z')
    buffer.set(x, y+1, 'Z')
    buffer.set(x+1, y+1, 'Z')
    buffer.centerPoint = [x, y+1]
}

export const dropJ = (buffer) => {
    const x = Math.round(XBLOCKS/2)
    const y = 0;
    buffer.set(x-1, y, 'J')
    buffer.set(x-1, y+1, 'J')
    buffer.set(x, y+1, 'J')
    buffer.set(x+1, y+1, 'J')
    buffer.centerPoint = [x, y+1]
}

export const dropL = (buffer) => {
    const x = Math.round(XBLOCKS/2)
    const y = 0;
    buffer.set(x+1, y, 'L')
    buffer.set(x-1, y+1, 'L')
    buffer.set(x, y+1, 'L')
    buffer.set(x+1, y+1, 'L')
    buffer.centerPoint = [x, y+1]
}


export const dropRandom = sheet => {
    randomItem([
        dropI,
        dropO,
        dropT,
        dropS,
        dropZ,
        dropJ,
        dropL,
    ])(sheet)
}