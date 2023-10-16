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

app.get('/api/list',function (req,res) {
  console.log(req,res,'testeeee')
  res.send(Data)
})

app.listen(8081,function () {
  console.log('启动了服务!端口8080')
})
