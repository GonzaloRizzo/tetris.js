import Sheet from './sheet';
import { YBLOCKS } from './constants'
import { dropRandom } from './shapes'

export default class LiveSheet extends Sheet {
    constructor(p, staticSheet){
        super()
        this._p = p
        this._staticSheet = staticSheet
        setInterval(() => this.update(), 100)
    }

    update(){
        let bufferIsEmpty = true

        this.iterate((x, y)=>{
            const symbol = this.get(x, y)
            if(symbol == null){
                return
            }
            bufferIsEmpty = false

            const nextY = y + 1

            this.set(x, y, null)

            if(nextY >= YBLOCKS || this._staticSheet.get(x, nextY) != null){
                this._staticSheet.set(x, y, symbol)
                return
            }

            this.set(x, nextY, symbol)
        })

        if(bufferIsEmpty){
            dropRandom(this)
        }
    }
}