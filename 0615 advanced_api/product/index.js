import express from 'express'
import bodyParser from 'body-parser'
// 檔案上傳套件
import multer from 'multer'
// Nodejs 預設的路徑套件
import path from 'path'
// Nodejs 預設的檔案套件
import fs from 'fs'
// express處理跨域要求
import cors from 'cors'

// 驗證登入狀態
import session from 'express-session'
// 將登入狀態存入資料庫，若沒過期，使用者不會被登出
import connectMongo from 'connect-mongo'

import db from './db.js'

const MongoStore = connectMongo(session)
const app = express()

app.use(session({
  // 密鑰，加密認證資料用，無特定值
  secret: 'asdasdasdas',
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
    mongooseConnection: db.connection
  })
}))

app.use(cors({
  // origin來源網域
  // callback(錯誤,是否允許)
  origin (origin, callback) {
    callback(null, true)
  },
  credentials: true
}))

app.use(bodyParser.json())

// 檔案上傳設定
const upload = multer({
  // 檔案儲存
  // multer.diskStorage 代表存在電腦上
  storage: multer.diskStorage({
    // 儲存路徑
    // req 代表使用者丟進來的資料
    // file 代表使用者上傳的檔案
    // cb 代表回應
    destination (req, file, cb) {
      // cb(錯誤訊息，沒有就是 null, 路徑)
      cb(null, 'images/')
    },
    // 檔名
    filename (req, file, cb) {
      // 目前時間
      const now = Date.now()
      // 副檔名
      // 使用 path 套件取得上傳檔案原始檔名的副檔名
      const ext = path.extname(file.originalname)
      // cb(錯誤訊息，沒有就是 null, 檔名)
      cb(null, now + ext)
    }
  }),
  limits: {
    // 限制:檔案大小
    fileSize: 1024 * 1024
  },
  // 檔案類型
  fileFilter (req, file, cb) {
    // 沒有錯誤 接受檔案
    // cb(錯誤訊息,是否接受檔案)
    if (file.mimetype.includes('image')) {
      cb(null, true)
    } else {
      // 觸發multer錯誤，部接受檔案
      // 自訂錯誤訊息，跟內建錯誤訊息格式統一
      cb(new multer.MulterError('LIMIT_FORMAT', false))
    }
  }
})

app.post('/new', async (req, res) => {
  if (!req.headers['content-type'].includes('multipart/form-data')) {
    res.status(400)
    res.send({ success: false, message: '資料格式錯誤' })
    return
  }
  // 有一個上傳進來的檔案，欄位是 image
  // req，進來的東西
  // res，要出去的東西
  // err，檔案上傳的錯誤
  // upload.single(欄位)(req, res, 上傳完畢的 function)
  upload.single('image')(req, res, async err => {
    if (err instanceof multer.MulterError) {
      const message = (err.code === 'LIMIT_FILE_SIZE') ? '檔案太大' : '格式不符'
      res.status(400)
      res.send({ success: false, message })
    } else if (err) {
      // 不是上傳的錯誤
      res.send(500)
      res.send({ success: false, message: '伺服器發生錯誤' })
    } else {
      try {
        console.log(req.file)
        const result = await db.product.create(
          {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            count: req.body.count,
            image: req.file.filename
          }
        )
        res.status(200)
        res.send({ success: true, message: '', id: result._id })
      } catch (error) {
        console.log(error)
        const key = Object.keys(error.errors)[0]
        const message = error.errors[key].message
        res.status(400)
        res.send({ success: false, message })
      }
    }
  })
})

app.get('/product', async (req, res) => {
  if (req.session.user) {
    let products = await db.product.find()
    products = products.map(product => {
      product.image = 'http://localhost:3000/image/' + product.image
      return product
    })
    res.status(200)
    res.send({ success: true, message: '', products })
  } else {
    res.status(401)
    res.send({ success: false, message: '請登入' })
  }
})

app.get('/image/:file', async (req, res) => {
  // fs.existsSync()可以檢查檔案在不在，只能用絕對路徑
  // 預設是從根目錄找檔案，所以要設定跟目錄與目前資料夾
  // process.cwd可以知道目前運作的js檔在哪
  const path = process.cwd() + '/images/' + req.params.file
  const exists = fs.existsSync(path)
  if (exists) {
    res.status(200)
    res.sendFile(path)
  } else {
    res.status(404)
    res.send({ success: false, message: '檔案不存在' })
  }
})

app.post('/login', async (req, res) => {
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400)
    res.send({ success: false, message: '格式錯誤' })
    return
  }
  try {
    const result = await db.user.find(
      {
        account: req.body.account,
        password: req.body.password
      }
    )
    if (result.length > 0) {
      const account = result[0].account
      req.session.user = result[0]
      res.status(200)
      res.send({ success: true, message: '', account })
    } else {
      res.status(200)
      res.send({ success: false, message: '帳號密碼錯誤' })
    }
  } catch (error) {
    res.status(400)
    res.send({ success: false, message: '帳號密碼錯誤' })
  }
})

app.get('/checksession', async (req, res) => {
  res.status(200)
  res.send({ success: true, message: '', user: req.session.user })
})
app.get('/logout', async (req, res) => {
  req.session.destroy((error) => {
  // 刪除時出錯
    if (error) {
      res.status(500)
      res.send({ success: false, message: '伺服器發生錯誤' })
    } else {
      res.clearCookie()
      res.send({ success: true, message: '' })
    }
  })
})

app.listen(3000, () => {
  console.log('http://localhost:3000')
})
