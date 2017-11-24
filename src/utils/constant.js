export default (stageWidth, stageHeight, imgWidth, imgHeight) => {
    let stageHalfWidth = stageWidth / 2,
        stageHalfHeight = stageHeight / 2,
        imgHalfWidth = imgWidth / 2,
        imgHalfHeight = imgHeight / 2
    let top = {
        x: [
            stageHalfWidth - imgHalfWidth,
            stageHalfWidth + imgHalfWidth
        ],
        y: [
            0 - imgHalfHeight,
            stageHalfHeight - imgHeight
        ]
    },
    center = {
        left: stageHalfWidth - imgHalfWidth,
        top: stageHalfHeight - imgHalfHeight
    },
    aside = {
        leftX: [
            0 - imgHalfWidth,
            stageHalfWidth - imgHalfWidth * 3
        ],
        rightX: [
            stageHalfWidth + imgHalfWidth * 2,
            stageWidth - imgHalfWidth
        ],
        y: [
            0 - imgHalfHeight,
            stageHeight - imgHalfHeight
        ]
    }
    return {
        top,
        center,
        aside
    }
}