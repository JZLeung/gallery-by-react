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
    /**
     * 初始化函数，在这里就开始初始化每一张图片的初始位置和信息。
     */
    constructor(props) {
        super(props)
        this.state = {
            imgRange: ImageArray.map(() => {
                return {
                    pos: {
                        top: 0,
                        left: 0
                    },
                    rotate: 0,
                    isInverse: false,
                    isCenter: false
                }
            })
        }
        this.inverse = this.inverse.bind(this)
    }

    /**
     * 当组件完成挂载后，将初始化 CONSTANTS 常量变量组。
     */
    componentDidMount() {
        console.log('componentDidMount')
        let stage = DOM.findDOMNode(this.refs.stage),
            image = DOM.findDOMNode(this.refs.image0)
        console.log(stage.scrollWidth, stage.scrollHeight, image.offsetWidth, image.offsetHeight)
        let _self = this
        // 此处要等第一张图片完全加载完成后才能拿到每个 figure 的真正高度，再初始化。
        image.querySelector('img').onload = function() {
            console.log(stage.scrollWidth, stage.scrollHeight, image.offsetWidth, image.offsetHeight)
            CONSTANTS = GenerateConstant(stage.scrollWidth, stage.scrollHeight, image.offsetWidth, image.offsetHeight)
            _self.resetImagePosition(0)
            console.log(CONSTANTS)
        }
    }

    /**
     * 重置所有图片位置的函数
     * @param   centerIndex 需要居中的图片索引下标
     */
    resetImagePosition(centerIndex) {
        let allImages = this.state.imgRange
        // 处理正中的元素
        let centerImages = allImages.splice(centerIndex, 1)
        centerImages[0] = {
            pos: CONSTANTS.center,
            rotate: 0,
            isInverse: false,
            isCenter: true
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

    /**
     * 翻转图片
     * @param   reverseIndex    需要翻转的图片的索引下标
     * @return  闭包函数，可同时供 ImageFigure 和 ControllerUtil 调用，并缓存需要翻转的图片。
     */
    inverse(reverseIndex) {
        return function() {
            console.log(this)
            let imgRange = this.state.imgRange
            imgRange[reverseIndex].isInverse = !imgRange[reverseIndex].isInverse
            this.setState({
                imgRange
            })
        }.bind(this)
    }

    resetPos(centerIndex) {
        return function() {
            this.resetImagePosition(centerIndex)
        }.bind(this)
    }

    // 渲染函数
    render() {

        const images = ImageArray.map((image, index) => {

            return <Image 
                data={image} 
                key={index} 
                range={this.state.imgRange[index]} 
                ref={'image' + index} 
                inverse={this.inverse(index)}
                center={this.resetPos(index)}/>
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