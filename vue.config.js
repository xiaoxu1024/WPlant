const path = require('path')
const { defineConfig } = require('@vue/cli-service')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = defineConfig({
  publicPath: './', // 解决web页面打包后本地打开页面空白的问题
  transpileDependencies: true,
  chainWebpack: (config) => {
    // 由于修改了渲染进程目录，修改@的alias
    config.resolve.alias.set('@', resolve('src'))
  },
  css: {
    loaderOptions: {
      sass: {
        // additionalData: // TODO: 这里存放全局变量
      }
    }
  },
})
