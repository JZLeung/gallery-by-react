import Mock from 'mockjs'

const Random = Mock.Random

export default (imageArr) => {
    return imageArr.map((image, index) => {
        return {
            src: require(`../../public/images/0${image}`),
            title: Random.title(),
            desc: Random.paragraph()
        }
    })
}