module.exports = {
  // 根据环境区分 生产服务器production比如php服务器的地址  和 开发服务器dev的地址
  // npm run serve是开发环境develope     npm run build是生产环境production
  // publicPath: process.env.NODE_ENV === "production" ? "/mail/" : "/",
  // 打包时(生产环境下)关闭JS源代码调试功能
  productionSourceMap: false,
  // 开发环境下，是否开启css的调试功能。不会影响项目的打包
  css: {
    sourceMap: true
  },
  configureWebpack: {
    resolve: {
      alias: {
        assets: "@/assets",
        components: '@/components',
        views: '@/views',
        common: '@/common',
        network: '@/network'
      }
    }
  },
  parallel: require('os').cpus().length > 1, // 构建时开启多进程处理babel编译
  pluginOptions: { // 第三方插件配置
  },
  pwa: { // 单页插件相关配置 https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  },
  // devServer: {
  //   open: true,
  //   host: 'localhost',
  //   port: 8080,
  //   https: false,
  //   hotOnly: false,
  //   proxy: { // 配置跨域
  //     '/api': {
  //       target: 'http://localhost:3000/api/',
  //       ws: true,
  //       changOrigin: true,
  //       pathRewrite: {
  //         '^/api': ''
  //       }
  //     }
  //   },
  //   before: app => { }
  // }

}
