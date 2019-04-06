import "babel-polyfill";
import p5 from 'p5'
import { BSIZE, XBLOCKS, YBLOCKS, COLORS } from './constants'
import Sheet from './sheet'
import LiveSheet from './liveSheet'
import ProjectedSheet from './projectedSheet'

const coor = pos => pos * BSIZE

new p5(p => {
    const staticSheet = new Sheet()
    const projectedSheet = new ProjectedSheet()
    const liveSheet = new LiveSheet(staticSheet, projectedSheet)

    p.setup = () => {
        p.createCanvas(XBLOCKS * BSIZE, YBLOCKS * BSIZE)
    };

    p.draw = () => {
        p.background(0);
        liveSheet.iterate((x, y) => {
            const blockSymbol = liveSheet.get(x, y) || staticSheet.get(x, y)
            const projectedSymbol = projectedSheet.get(x, y)

            if (blockSymbol) {
                p.stroke(0)
                p.fill(COLORS[blockSymbol])
                p.rect(coor(x), coor(y), BSIZE, BSIZE)
            } else if (projectedSymbol){
                p.stroke(COLORS[projectedSymbol])
                p.noFill()
                p.rect(coor(x), coor(y), BSIZE, BSIZE)
            }
        })
    };

    p.keyPressed = event => {
        if(event.key == 'a') {
            liveSheet.moveLeft()
        }else if(event.key == 'd'){
            liveSheet.moveRight()
        }else if (event.key == 'w'){
            liveSheet.rotate()
        }else if (event.key == 'W'){
            liveSheet.rotate(false)
        }
    }
})