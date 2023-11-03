const Mock = require('mockjs')
const Random = Mock.Random

const Data = (pagrsize=10) => {
  return  Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    [`list|${pagrsize}`]: [{
      // 属性 id 是一个自增数，起始值为 1，每次增 1
      'key|+1': 1,
      'name':'@cname',
      'domain':'@domain',
      'area':'@region',
      'age|12-18':12,
    }]
  })
}
module.exports = {
  Data
}
