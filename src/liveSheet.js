import Sheet from './sheet';
import { YBLOCKS } from './constants'
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

        }else {
            this._buffer = draftBuffer
        }

        if(bufferIsEmpty) {
            dropRandom(this)
        }

    }
}