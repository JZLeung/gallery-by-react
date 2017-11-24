import React, {Component} from 'react'
import DOM from 'react-dom'

import Image from './components/figure'

import GenerateImage from './utils/image'
import GenerateConstant from './utils/constant'
import Random from './utils/random'

const ImageArray = GenerateImage([1,2,3,4,5,6,1,2,3,4,5,6].map(number => `${number}.jpg`))
console.log(ImageArray)
var CONSTANTS = {
    center: {
        left: 0,
        top: 0
    },
    top: {
        x: [0, 0],
        y: [0, 0]
    },
    aside: {
        leftX: [0, 0],
        rightX: [0, 0],
        y: [0, 0]
    }
}

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            imgRange: ImageArray.map(() => {
                return {
                    pos: {
                        top: 0,
                        left: 0
                    },
                    rotate: 0
                }
            })
        }
    }

    componentDidMount() {
        console.log('componentDidMount')
        let stage = DOM.findDOMNode(this.refs.stage),
            image = DOM.findDOMNode(this.refs.image0)
        console.log(stage.scrollWidth, stage.scrollHeight, image.offsetWidth, image.offsetHeight)
        let _self = this
        image.querySelector('img').onload = function() {
            console.log(stage.scrollWidth, stage.scrollHeight, image.offsetWidth, image.offsetHeight)
            CONSTANTS = GenerateConstant(stage.scrollWidth, stage.scrollHeight, image.offsetWidth, image.offsetHeight)
            _self.resetImagePosition(0)
            console.log(CONSTANTS)
        }
    }

    resetImagePosition(centerIndex) {
        let allImages = this.state.imgRange
        // 处理正中的元素
        let centerImages = allImages.splice(centerIndex, 1)
        centerImages[0] = {
            pos: CONSTANTS.center,
            rotate: 0
        }

        // 处理上方的元素，个数为一个或没有
        let topImageNum = Random.random(2),
            topIndex = Random.random(allImages.length - 1)
        let topImages = allImages.splice(topIndex, topImageNum)
        // console.log(topImages)
        topImages = topImages.map(() => {
            return {
                pos: {
                    top: Random.pos(CONSTANTS.top.y[0], CONSTANTS.top.y[1]),
                    left: Random.pos(CONSTANTS.top.x[0], CONSTANTS.top.x[1])
                },
                rotate: Random.deg()
            }
        })

        // 处理两边的元素
        let splitIndex = allImages.length / 2
        let positionY = CONSTANTS.aside.y
        allImages = allImages.map((img, index) => {
            let positionX = index < splitIndex ? CONSTANTS.aside.leftX : CONSTANTS.aside.rightX
            // console.log(index < splitIndex ? 'left' : 'right')
            return {
                pos: {
                    top: Random.pos(positionY[0], positionY[1]),
                    left: Random.pos(positionX[0], positionX[1])
                },
                rotate: Random.deg()
            }
        })
        
        // 合并居中元素
        allImages.splice(centerIndex, 0, centerImages[0])
        // 合并上方元素
        if (topImages && topImages.length > 0 && topImages[0]) {
            // console.log('top', topImages[0])
            allImages.splice(topIndex, 0, topImages[0])
        }
        // console.log(allImages)
        this.setState({
            imgRange: allImages
        })
    }

    render() {

        const images = ImageArray.map((image, index) => {

            return <Image data={image} key={index} range={this.state.imgRange[index]} ref={'image' + index} />
        })

        return (
            <div className="stage" ref="stage">
                <section className="img-sec">
                    {images}
                </section>
                <nav className="controller-sec">
                </nav>
            </div>
        )
    }
}

require('./style/index.scss')
export default App