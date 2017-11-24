const random = (low, height) => {
    if (low !== undefined && height !== undefined) {
        return ~~(Math.random() * (height - low) + low)
    } else if (low !== undefined) {
        return ~~(Math.random() * low)
    } else {
        return Math.random()
    }
}

const pos = (low, height) => random(low, height)

const deg = () => ~~(Math.random() * 30 * (random() > 0.5 ? 1 : -1))

export default {
    pos,
    deg,
    random
}