import "babel-polyfill";
import p5 from 'p5'
import { BSIZE, XBLOCKS, YBLOCKS, COLORS } from './constants'
import Sheet from './sheet'
import LiveSheet from './liveSheet'
import { dropRandom } from './shapes'

const coor = pos => pos * BSIZE

new p5(p => {
    const staticSheet = new Sheet()
    const liveSheet = new LiveSheet(p, staticSheet)

    p.setup = () => {
        p.createCanvas(XBLOCKS * BSIZE, YBLOCKS * BSIZE)
        dropRandom(liveSheet)
        window.a = { staticSheet, liveSheet}
    };

    p.draw = () => {
        p.background(0);
        liveSheet.iterate((x, y) => {
            const blockSymbol = liveSheet.get(x, y) || staticSheet.get(x, y)

            if (blockSymbol == null) {
                return
            }

            p.fill(COLORS[blockSymbol])
            p.rect(coor(x), coor(y), BSIZE, BSIZE)
        })
    };

    p.keyPressed = event => {
        if(event.key == 'a') {
            liveSheet.moveLeft()
        }else if(event.key=='d'){
            liveSheet.moveRight()
        }else if (event.key == 'w'){
            liveSheet.rotate()
        }else if (event.key == 'W'){
            liveSheet.rotate(false)
        }
    }
})