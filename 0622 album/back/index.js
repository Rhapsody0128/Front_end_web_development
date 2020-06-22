import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import connectMongo from 'connect-mongo'
import session from 'express-session'
import multer from 'multer'
import md5 from 'md5'
import dotenv from 'dotenv'

import db from './db.js'

dotenv.config()
const MongoStore = connectMongo(session)

const app = express()

app.use(bodyParser.json())
app.use(cors({
  origin (origin, callback) {
    if (process.env.DEV) {
      // 開發環境。允許
      callback(null, true)
    } else if (origin.includes('github')) {
      // 非開發環境，但是從githib過來，允許
      callback(null, true)
    } else {
      callback(new Error('Not allwoed'), true)
      // 不是從開發也不是從github過來，拒絕
    }
  },
  credentials: true
  // 允許認證資訊
}))
app.use(session({
  secret: 'album',
  // 將 session 存入 mongodb
  store: new MongoStore({
    // 使用 mongoose 的資料庫連接
    mongooseConnection: db.connection,
    // 設定存入的 collection
    collection: process.env.COLLECTION_SESSION
  }),
  cookie: {
    // Session有效期間
    maxAge: 1000 * 60 * 30
    // 1000*60*30毫秒
  },
  saveUnintitialize: false,
  // 是否保存未修改的session
  rolling: true
  // 是否每次登入都重計過期時間

}))

app.listen(process.env.PORT, () => {
  console.log('已啟動')
})

app.post('/users', async (req, res) => {
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400)
    res.send({ success: false, message: '格式不符' })
    return
  }
  try {
    await db.users.create({
      account: req.body.account,
      password: md5(req.body.password)
    })
    res.status(200)
    res.send({ success: true, message: '' })
  } catch (error) {
    if (error.name === 'ValidatorError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400)
      res.send({ success: false, message })
    } else {
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤' })
    }
  }
})
