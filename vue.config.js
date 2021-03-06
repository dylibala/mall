/* module.export = {
configureWebpack: {
    resolve: {
      alias: {
        assets: '@/assets',
        components: '@/components',
        network: '@/network'
      }
    }
  }

} */

const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir); //__dirname是当前模块的目录名
} 
module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias
      .set("assets", resolve("./src/assets"))
      .set("components", resolve("./src/components"))
      .set("network", resolve("./src/network"))
  },
};
