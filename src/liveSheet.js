import Sheet from './sheet';
import { YBLOCKS, XBLOCKS } from './constants'
import { dropRandom } from './shapes'
import { cloneBuffer } from './utils'

export default class LiveSheet extends Sheet {
    constructor(p, staticSheet){
        super()
        this._p = p
        this._staticSheet = staticSheet
        setInterval(() => this.update(), 100)
    }

    update(){
        let shouldFreezeBuffer = false
        let bufferIsEmpty = true
        const draftBuffer = cloneBuffer(this._buffer)

        this.iterate((x, y) => {
            const symbol = draftBuffer[x][y]

            if(symbol == null){
                return
            }
            bufferIsEmpty = false

            const nextY = y + 1

            draftBuffer[x][y] = null

            if(nextY >= YBLOCKS || this._staticSheet.get(x, nextY) != null){
                shouldFreezeBuffer = true
                return true  // Stops iterating
            }

            draftBuffer[x][nextY] = symbol
        })

        if(shouldFreezeBuffer){
            this.iterate((x, y)=>{
                const symbol = this.get(x, y)

                if(symbol == null){
                    return
                }

                this.set(x, y, null)
                this._staticSheet.set(x, y, symbol)
            })
            this._staticSheet.cleanLines()

        }else {
            this._buffer = draftBuffer
        }

        if(bufferIsEmpty) {
            dropRandom(this)
        }

    }

    moveRight(){
        this._moveX(1)
    }

    moveLeft(){
        this._moveX(-1)
    }

    _moveX(xOffset){
        // todo, don't clone it, just create a new one and place translated blocks there
        const draftBuffer = cloneBuffer(this._buffer)
        let isLegal = true
        const iterator = xOffset < 0 ? this.iterateLeft : this.iterateRight
        iterator((x, y) => {
            const symbol = this.get(x, y)
            if(symbol == null){
                return
            }
            const nextX = x + xOffset

            draftBuffer[x][y] = null

            if(nextX < 0 || nextX >= XBLOCKS || this._staticSheet.get(nextX, y) != null){
                isLegal = false
                return true  // Stop iterating
            }

            draftBuffer[nextX][y] = symbol
        })

        if(isLegal){
            console.log("moving")
            this._buffer=draftBuffer
        }

    }
}