import { randomItem } from './utils';
import { XBLOCKS } from './constants';

export const dropStick = (buffer) => {
    const x = Math.round(XBLOCKS/2)
    const y = 0;
    buffer.set(x, y, 'I')
    buffer.set(x, y+1, 'I')
    buffer.set(x, y+2, 'I')
    buffer.set(x, y+3, 'I')
    buffer.centerPoint = [x, y+1]
}

export const dropBlock = (buffer) => {
    const x = Math.round(XBLOCKS/2)
    const y = 0;
    buffer.set(x, y, 'O')
    buffer.set(x+1, y, 'O')
    buffer.set(x, y+1, 'O')
    buffer.set(x+1, y+1, 'O')
    buffer.centerPoint = [x, y]
}

export const dropRandom = sheet => {
    randomItem([dropStick])(sheet)
}