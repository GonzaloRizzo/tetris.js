import { XBLOCKS, YBLOCKS } from './constants'

export default class Sheet {
    constructor(){
        this._buffer = new Array(XBLOCKS)
        for(let column = 0; column < XBLOCKS; column++){
            this._buffer[column] = new Array(YBLOCKS).fill(null)
        }
    }

    get(x, y){
        return this._buffer[x][y]
    }

    set(x, y, value){
        return this._buffer[x][y] = value
    }

    iterate(f){
        for(let x = 0; x < XBLOCKS; x++){
            for(let y = YBLOCKS - 1; y >= 0; y--){
                if(f(x,y)){
                    break
                }
            }
        }

    }

    print(){
        console.log(this._buffer.map(line=>line.map(e=>e||'_')).join('\n'))
    }
}