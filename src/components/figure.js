import React, { Component } from 'react';

class imgFigure extends Component {
    constructor(props) {
        super(props)
        this.state = {
            styleObj: {}
        }
        this.handleClick = this.handleClick.bind(this)
    }

    // 处理图片点击事件
    handleClick(ev) {
        ev.stopPropagation()
        ev.preventDefault()
        if (this.props.range.isCenter) {
            this.props.inverse()
        } else {
            this.props.center()
        }
    }
    // componentWillUpdate() {
    //     return true
    // }
    render() {
        let styleObj = {}
        // console.log(this.props.range)
        if (this.props.range.pos) {
            styleObj.left = this.props.range.pos.left
            styleObj.top = this.props.range.pos.top
        }
        if (this.props.range.rotate) {
            (['MosTransform', 'msTransform', 'WebkitTransform', 'transform']).forEach(prefix => {
                styleObj[prefix] = `rotate(${this.props.range.rotate}deg)`
            })
        }

        if (this.props.range.isCenter) {
            styleObj['zIndex'] = 11
        }

        let className = ['img-figure', this.props.range.isInverse ? 'is-inverse' : ''].join(' ')

        return (
            <figure  className={className} style={styleObj} onClick={this.handleClick}>
                <img src={this.props.data.src} alt={this.props.data.title}/>
                <figcaption>
                    <h2 className="img-title">{this.props.data.title}</h2>
                </figcaption>
                <section className="img-desc"  onClick={this.handleClick}>
                    {this.props.data.desc}
                </section>
            </figure>
        )
    }
}

export default imgFigure
