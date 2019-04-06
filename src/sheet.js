import { XBLOCKS, YBLOCKS } from './constants'
import { applyMatrix } from './utils'

export default class Sheet {
    constructor(buffer){
        this._buffer = buffer || this.buildBuffer()
    }

    buildBuffer(){
        const buffer = new Array(XBLOCKS)
        for(let column = 0; column < XBLOCKS; column++){
            buffer[column] = new Array(YBLOCKS).fill(null)
        }
        return buffer
    }

    get(x, y){
        return this._buffer[x][y]
    }

    set(x, y, value){
        return this._buffer[x][y] = value
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

    cleanLines(){
        let completedLines = 0
        this.iterateLines((line, y) => {
            if(line.every(elt=> elt != null)){
                completedLines += 1
                line.forEach((_elt, x) => this.set(x, y, null))
            }
        })

        if(completedLines > 0){
            this.iterateSymbols((x, y, symbol)=>{
                if(y+completedLines >= YBLOCKS){
                    return
                }
                this.set(x, y, null)
                this.set(x, y+completedLines, symbol)
            })
        }
    }

    positionIsEmpty(x, y){
        const isOffGrid = x < 0 || x >= XBLOCKS || y < 0 || y >= YBLOCKS
        if(isOffGrid){
            return false
        }

        const isFilled = this.get(x, y) != null
        if(isFilled){
            return false
        }

        return true
    }

    iterateSymbols(f){
        this.iterate((x, y)=>{
            const symbol = this.get(x, y)

            if(symbol == null){
                return
            }

            return f(x, y, symbol)
        })
    }

    applyMatrix(matrix, centerPoint=[0, 0]){
        const draftBuffer = this.buildBuffer()

        this.iterateSymbols((x, y, symbol) => {
            const [newX, newY] = applyMatrix([x, y], matrix, centerPoint)

            const isOffGrid = newX < 0 || newX >= XBLOCKS || newY < 0 || newY >= YBLOCKS
            if (isOffGrid) {
                throw new Error("Transformation goes offgrid")
            }

            draftBuffer[newX][newY] = symbol
        })

        return draftBuffer
    }
}