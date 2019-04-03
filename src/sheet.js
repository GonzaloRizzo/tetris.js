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

    iterateLeft(f){
        for(let x = 0; x < XBLOCKS; x++){
            for(let y = YBLOCKS - 1; y >= 0; y--){
                if(f(x,y)){
                    break
                }
            }
        }
    }

    iterateRight(f){
        for(let x = XBLOCKS - 1; x >= 0; x--){
            for(let y = YBLOCKS - 1; y >= 0; y--){
                if(f(x,y)){
                    break
                }
            }
        }
    }

    iterateLines(f){
        for(let y = YBLOCKS - 1; y >= 0; y--){
            let line = []
            for(let x = 0; x < XBLOCKS; x++){
                line.push(this._buffer[x][y])
            }
            if(f(line, y)){
                break
            }
        }
    }

    iterate(f){
        return this.iterateLeft(f)
    }

    print(){
        console.log(this._buffer.map(line=>line.map(e=>e||'_')).join('\n'))
    }

    // TODO: Probaly we could merge this with the code in the update function of LiveSheet
    cleanLines(){
        let completedLines = 0
        this.iterateLines((line, y)=>{
            if(line.every(elt=> elt != null)){
                completedLines += 1
                line.forEach((_elt, x) => this.set(x, y, null))
            }
        })
        if(completedLines > 0){
            this.iterate((x, y)=>{
                if(y+completedLines >= YBLOCKS){
                    return
                }
                const symbol = this.get(x, y)
                this.set(x, y, null)
                this.set(x, y+completedLines, symbol)
            })
        }
    }
}