##  Gallary-by-React

该项目是来自慕课网的实战项目，原实战教程中，所用到的脚手架为 [yeoman](http://yeoman.io/) 中的 [generator-react-webpack](https://github.com/react-webpack-generators/generator-react-webpack#readme) 进行搭建，但是该脚手架已经快一年没有更新，而且其 2.0 版本也与食品教程中的项目结构都不一致，因此在该项目中使用了 React 官方团队维护的 [creat-react-app](https://github.com/facebookincubator/create-react-app) 作为脚手架搭建项目。

项目中使用 es6 的语法，并且对各个组件和功能模块进行了拆分，实现可复用，高定制的效果。

### 技术栈
- ES6
- React(version: 16.1)
- webpack(version: 3)
- creat-react-app
- sass / scss suport

### 踩坑
1.  create-react-app 原本是不支持 sass、scss、less 等预处理器的，需要自己手动添加：

    查看 `package.json` 可以得知，运行的实际脚本是 `react-script` ，进入该 module 发现，webpack 的配置文件就是在脚本里面。

    因此每次需要手动修改 webpack 的配置，该配置文件为： `./node_modules/react-scripts/config/webpack.config.dev.js` 和 `./node_modules/react-scripts/config/webpack.config.dev.js`。在该俩文件中的 添加下列代码：
    ```javascript
    module.exports = {
        ...
        module: {
            rules: [{
                test: /\.scss$/,
                use: [
                    require.resolve('style-loader'),
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: require.resolve('postcss-loader'),
                        options: {
                            // Necessary for external CSS imports to work
                            // https://github.com/facebookincubator/create-react-app/issues/2677
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-flexbugs-fixes'),
                                autoprefixer({
                                    browsers: [
                                        '>1%',
                                        'last 4 versions',
                                        'Firefox ESR',
                                        'not ie < 9', // React doesn't support IE8 anyway
                                    ],
                                    flexbox: 'no-2009',
                                }),
                            ],
                        },
                    },
                    {
                        loader: require.resolve('sass-loader')
                    }
                ]
            }]
        }
    }
    ```
    同时在 `./node_module/react-scripts` 下安装相对应的依赖：
    ```bash
    $ npm i --save-dev node-sass sass-loader
    ```
    如果是 less 或者 stylus 则自行安装相应的 loader 并相对应的修改配置文件。

2.  图片文件应放在 public 文件夹中，若放在 src 则有可能出现 `can not find module` 的错误。具体原因我也不太清楚。若知道如何解决的同学可以项目交流下，谢谢。
3.  点击事件中 this 指向问题
    
    在老师的教程中，只需要为闭包函数绑定 this 就可以实现，但是在新版的 React 中，则需要在 `constuctor` 中手动为点击事件进行绑定 this，要不然，点击后点击事件绑定的 this 是指向 Component，即 ImageFigure 组件。
    
