const express = require('express')

const bodyParser = require('body-parser')
const { Data } = require('./data')
const app = express()
app.unsubscribe(bodyParser.urlencoded({extend:true}))
app.use(bodyParser.json())

app.all('*',function (req,res,next) {
  res.header('Access-Control-Allow-Origin','*')
  res.header('Access-Control-Allow-methods','POST,GET')
  next()
})
const resdata = {
  data:null,
  code:200
}

app.get('/api/list',function (req,res) {
  console.log(req.query,'testeeee')
  res.send({...resdata,data:Data(req.query.pageSize)})
})

app.get('/api/table',function (req,res) {
  res.send({...resdata,data:Data(req.query.pageSize)})
})
app.listen(8081,function () {
  console.log('启动了服务!端口8080')
})
