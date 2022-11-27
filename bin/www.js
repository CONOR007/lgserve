#! /usr/bin/env node

// commander 对命令行参数做处理
const {program} = require('commander')

console.log('执行了')
// lgserve --help查看命令行 -p 设置web服务的端口号  
// program.option('-p --port', 'set server port')
// program.parse(process.argv)


// 配置信息
let options = {
  '-p --port <dir>': {
    'description': 'init server port',
    'example': 'lgserve -p 3306'
  },
  '-d --directory <dir>': {
    'description': 'init server directory',
    'example': 'lgserve -d c:'
  }
}

function formatConfig (configs, cb) {
  Object.entries(configs).forEach(([key, val]) => {
    cb(key, val)
  })
}

// 读取配置信息
formatConfig(options, (cmd, val) => {
  program.option(cmd, val.description)
})

// 展示示例
program.on('--help', () => {
  console.log('Examples: ')
  formatConfig(options, (cmd, val) => {
    console.log(val.example)
  })
})
// 显示命令名称
program.name('lgserve')

// 显示版本号
let version = require('../package.json').version
program.version(version)


let cmdConfig = program.parse(process.argv)
// 执行lgserve -p 1234 -d c:
// console.log(cmdConfig)

let Server = require('../main.js')
new Server(cmdConfig).start()
