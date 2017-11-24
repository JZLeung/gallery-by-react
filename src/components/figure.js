import React, { Component } from 'react';

class imgFigure extends Component {
    constructor(props) {
        super(props)
        this.state = {
            styleObj: {}
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
        return (
            <figure  className="img-figure" style={styleObj}>
                <img src={this.props.data.src} alt={this.props.data.title}/>
                <figcaption>
                    <h2 className="img-title">{this.props.data.title}</h2>
                </figcaption>
                <section className="img-desc">
                    {this.props.data.desc}
                </section>
            </figure>
        )
    }
}

export default imgFigure
