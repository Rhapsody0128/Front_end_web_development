import express from 'express'
import badyParser from 'bady-parser'
import cors from 'cors'
import connectMongo from 'connect-mongo'
import session from 'express-session'
import md5 from 'md5'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

import db from './db'

dotenv.config()
const MongoStroe = connectMongo(session)

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
      callback(new Error('not allwoed'), true)
      // 不是從開發也不是從github過來，拒絕
    }
  },
  credentials: true
  // 允許認證資訊
}))
app.use(session({
  secret: 'album',
  store: new MongoStroe({
    mongooseConnection: db.connectMongo,
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
