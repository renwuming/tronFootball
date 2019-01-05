import key from './key'
const config = {
  env: process.env.NODE_ENV,
  testURL: "http://localhost:8899",
  // testURL: "http://www.renwuming.cn/nanjing",
  pubURL: "http://www.renwuming.cn/nanjing",
  URL: function() {
    return this.env === "production" ? this.pubURL : this.testURL;
  },
  privateKey: key.privateKey,
}
export default config;
