import Sheet from './sheet';
import { YBLOCKS, XBLOCKS } from './constants'
import { dropRandom } from './shapes'
import { cloneBuffer, rotatePoint } from './utils'


export default class ProjectedSheet extends Sheet {
    projectLiveSheet(liveSheet, staticSheet){
        this._buffer = this.buildBuffer()

        const liveSheetDepthLevel = {}
        const staticSheetSurfaceLevel = {}

        liveSheet.iterate((x, y) => {
            const symbol = liveSheet.get(x, y)
            if(!symbol){
                return
            }

            if (!liveSheetDepthLevel[x] || liveSheetDepthLevel[x] < y){
                liveSheetDepthLevel[x] = y
            }
        })

        staticSheet.iterate((x, y) => {
            const symbol = staticSheet.get(x, y)
            if(!symbol || !liveSheetDepthLevel[x] || y < liveSheetDepthLevel[x]){
                return
            }

            if (!staticSheetSurfaceLevel[x] || staticSheetSurfaceLevel[x] > y){
                staticSheetSurfaceLevel[x] = y
            }
        })

        const shortestDistance = Object.keys(liveSheetDepthLevel).reduce((shortestDistance, x) => {
            const distance = (staticSheetSurfaceLevel[x] || YBLOCKS)- liveSheetDepthLevel[x]
            return distance < shortestDistance ? distance : shortestDistance
        }, YBLOCKS)

        liveSheet.iterate((x, y) => {
            const symbol = liveSheet.get(x, y)
            if(!symbol){
                return
            }
            this.set(x, y + shortestDistance - 1, symbol)
        })
    }
}