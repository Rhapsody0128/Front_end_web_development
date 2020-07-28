// 網頁伺服器
import express from 'express'
// 讓 express 可以讀取 Body 資料
import bodyParser from 'body-parser'
// 跨域套件
import cors from 'cors'
// MD5 加密
import md5 from 'md5'
// 資料庫檔案
import database from './database.js'
import session from 'express-session'
import connectMongo from 'connect-mongo'

const MongoStore = connectMongo(session)
const app = express()

// 讓 express 使用 body-parser，並把收到的資料轉 json
app.use(bodyParser.json())

app.use(session({
  // 密鑰，加密認證資料用，無特定值
  secret: 'vanessa',
  // 登入狀態有效毫秒
  cookie: {
    maxAge: 1000 * 60 * 30
  },
  // 是否保存沒有被修改過的連線狀態
  saveUninitialized: false,
  // 是否每次重新計算過期時間
  rolling: true,
  // 存入mongodb
  store: new MongoStore({
    mongooseConnection: database.connection
  })
}))

// 設定跨域套件
app.use(cors({
  // origin來源網域
  // callback(錯誤,是否允許)
  origin (origin, callback) {
    callback(null, true)
  },
  credentials: true
}))

// ----註冊
app.post('/registering', async (req, res) => {
  // 拒絕不是JSON的資料格式
  if (!req.headers['content-type'].includes('application/json')) {
    // 會回傳錯誤狀態碼(400)
    res.status(400)
    console.log(req.headers['content-type'])
    res.send({ success: false, message: '格式不符' })
    return
  }
  if (req.body.name === '' ||
    req.body.account === '' ||
    req.body.password === '' ||
    req.body.phone === '' ||
    req.body.email === ''
  ) {
    res.status(400)
    res.send({ success: false, message: '欄位不正確' })
  }
  // 新增資料
  try {
    const result = await database.users.create(
      {
        name: req.body.name,
        account: req.body.account,
        password: md5(req.body.password),
        phone: req.body.phone,
        email: req.body.email
      }
    )
    console.log(result)
    res.status(200)
    res.send({ success: true, message: '', id: result._id })
  } catch (error) {
    console.log(error)
    const key = Object.keys(error.errors)[0]
    const message = error.errors[key].message
    res.send({ success: false, message: message })
  }
})
// ---登入
app.post('/login', async (req, res) => {
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400)
    res.send({ success: false, message: '格式錯誤' })
    return
  }
  try {
    const result = await database.users.find(
      {
        account: req.body.account,
        password: md5(req.body.password)
      }
    )
    console.log(result)
    if (result.length > 0) {
      const account = result[0].account
      const name = result[0].name
      req.session.user = result[0]
      res.status(200)
      res.send({ success: true, message: '', account, name })
    } else {
      res.status(300)
      res.send({ success: false, message: '帳號密碼錯誤' })
    }
  } catch (error) {
    res.status(400)
    res.send({ success: false, message: '帳號密碼錯誤' })
  }
})
// ---
app.post('/getuserinfo', async (req, res) => {
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400)
    res.send({ success: false, message: '格式錯誤' })
    return
  }
  try {
    const result = await database.users.find({
      account: req.body.account
    })
    if (result !== null) {
      res.status(200)
      res.send({ success: true, message: '', result })
    } else {
      res.status(404)
      res.send({ success: false, message: '不存在使用者資料' })
    }
  } catch (error) {
    res.status(500)
    res.send({ success: false, message: error })
  }
})
// ---訂位
app.post('/order', async (req, res) => {
  // 拒絕不是JSON的資料格式
  if (!req.headers['content-type'].includes('application/json')) {
    // 會回傳錯誤狀態碼(400)
    res.status(400)
    res.send({ success: false, message: '格式不符' })
    return
  }
  if (req.body.name === '' ||
    req.body.account === '' ||
    req.body.peoplecount === '' ||
    req.body.phone === '' ||
    req.body.time === '' ||
    req.body.date === ''
  ) {
    res.status(400)
    res.send({ success: false, message: '欄位填寫不完整' })
  }
  // 新增資料
  try {
    const result = await database.orders.create(
      {
        name: req.body.name,
        account: req.body.account,
        phone: req.body.phone,
        peoplecount: req.body.peoplecount,
        date: req.body.date.substr(0, 10),
        time: req.body.time,
        remarks: req.body.remarks
      }
    )
    res.status(200)
    res.send({ success: true, message: '', id: result._id, result })
  } catch (error) {
    console.log(error.errors)
    const key = Object.keys(error.errors)[0]
    const message = error.errors[key].message
    res.send({ success: false, message: message })
  }
})
// ---取消定位
app.post('/cancelorder', async (req, res) => {
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400)
    res.send({ success: false, message: '格式錯誤' })
    return
  }
  try {
    const result = await database.orders.findOneAndRemove({ account: req.body.account })
    console.log(result)
    if (result !== null) {
      res.status(200)
      res.send({ success: true, message: '' })
    } else {
      res.status(404)
      res.send({ success: false, message: '不存在訂單資訊' })
    }
  } catch (error) {
    res.status(500)
    console.log(error)
    res.send({ success: false, message: error })
  }
})
// ---找到定位
app.post('/checkorder', async (req, res) => {
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400)
    res.send({ success: false, message: '格式錯誤' })
    return
  }
  try {
    const result = await database.orders.find({ account: req.body.account })
    console.log(result)
    if (result !== null) {
      res.status(200)
      res.send({ success: true, message: '', result })
    } else {
      res.status(404)
      res.send({ success: false, message: '不存在訂單資訊' })
    }
  } catch (error) {
    res.status(500)
    console.log(error)
    res.send({ success: false, message: error })
  }
})
// ---訂位清單
app.post('/allorder', async (req, res) => {
  try {
    const result = await database.orders.find()
    console.log(result)
    if (result !== null) {
      res.status(200)
      res.send({ success: true, message: '', result })
    } else {
      res.status(404)
      res.send({ success: false, message: '不存在訂單資訊' })
    }
  } catch (error) {
    res.status(500)
    console.log(error)
    res.send({ success: false, message: error })
  }
})

// 啟動網頁伺服器
app.listen(3000, () => {
  console.log('網頁伺服器已啟動')
  console.log('http://localhost:3000')
})
