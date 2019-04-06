import Sheet from './sheet';
import { dropRandom } from './shapes'
import { applyMatrix } from './utils'

export default class LiveSheet extends Sheet {
    constructor(staticSheet, overlaySheet){
        super()
        this._staticSheet = staticSheet
        this._overlaySheet = overlaySheet
        this.centerPoint = [0, 0]
        this.reset()

        setInterval(() => this._applyGravity(), 150)
    }

    applyMatrix(matrix){
        let transformIsValid = true

        let newSheet = null
        try {
            newSheet = new Sheet(super.applyMatrix(matrix, this.centerPoint))
        } catch {
            return false
        }

        newSheet.iterateSymbols((x, y) => {
            if(!this._staticSheet.positionIsEmpty(x, y)){
                transformIsValid = false
            }
        })

        if(transformIsValid){
            this.centerPoint = applyMatrix(this.centerPoint,matrix, this.centerPoint)
            this._buffer = newSheet._buffer
        }

        this._overlaySheet.projectLiveSheet(this, this._staticSheet)

        return transformIsValid
    }

    _applyGravity(){
        const didMove = this._move(0, 1)
        if(!didMove){
            this.iterateSymbols((x, y, symbol) => {
                this._staticSheet.set(x, y, symbol)
            })

            this._staticSheet.cleanLines()
            this.reset()
        }
    }

    reset(){
        this._buffer = this.buildBuffer()
        dropRandom(this)
        this._overlaySheet.projectLiveSheet(this, this._staticSheet)
    }

    _move(xOffset=0, yOffset=0){
        const matrix = [[1, 0, xOffset],
                        [0, 1, yOffset],
                        [0, 0, 1]]
        return this.applyMatrix(matrix)
    }

    moveRight(){
        return this._move(1, 0)
    }

    moveLeft(){
        return this._move(-1, 0)
    }

    rotate(clockwise=true){
        const rotationMatrix = clockwise
            ? [[0, -1, 0],
               [1,  0, 0],
               [0,  0, 1]]
            : [[ 0, 1, 0],
               [-1, 0, 0],
               [ 0, 0, 1]]
        return this.applyMatrix(rotationMatrix)
    }
}