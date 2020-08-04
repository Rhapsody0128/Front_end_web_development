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
import FTPStorage from 'multer-ftp'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config()

const MongoStore = connectMongo(session)
const app = express()

// 讓 express 使用 body-parser，並把收到的資料轉 json
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(express.static('files'))

app.use(session({
  // 密鑰，加密認證資料用，無特定值
  secret: 'vanessa',
  // 登入狀態有效毫秒
  store: new MongoStore({
    // 使用 mongoose 的資料庫連接
    mongooseConnection: database.connection,
    // 設定存入的 collection
    collection: process.env.COLLECTION_SESSION
  }),
  cookie: {
    maxAge: 1000 * 60 * 30
  },
  // 是否保存沒有被修改過的連線狀態
  saveUninitialized: false,
  // 是否每次重新計算過期時間
  rolling: true
  // 存入mongodb
}))
// ---檔案上傳FTP
let storage
if (process.env.FTP === false) {
  storage = multer.diskStorage({
    destination (req, file, cb) {
      cb(null, './images')
    },
    filename (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname))
    }
  })
} else {
  // heroku 將上傳檔案放伺服器
  storage = new FTPStorage({
    // 上傳伺服器的路徑
    basepath: '/',
    // FTP 設定
    ftp: {
      host: process.env.FTP_HOST,
      secure: false,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD
    },
    destination (req, file, options, cb) {
      cb(null, options.basepath + Date.now() + path.extname(file.originalname))
    }
  })
}
// ---圖檔存入
const upload = multer({
  storage,
  fileFilter (req, file, cb) {
    if (!file.mimetype.includes('image')) {
      // 觸發 multer 錯誤，不接受檔案
      // LIMIT_FORMAT 是自訂的錯誤 CODE，跟內建的錯誤 CODE 格式統一
      cb(new multer.MulterError('LIMIT_FORMAT'), false)
    } else {
      cb(null, true)
    }
  },
  limits: {
    fileSize: 1024 * 1024
  }
})

// 設定跨域套件
app.use(cors({
  origin (origin, callback) {
    // 直接開網頁，不是 ajax 時，origin 是 undefined
    if (origin === undefined) {
      callback(null, true)
    } else {
      if (process.env.ALLOW_CORS === true) {
        // 開發環境，允許
        callback(null, true)
      } else if (origin.includes('github')) {
        // 非開發環境，但是從 github 過來，允許
        callback(null, true)
      } else {
        // 不是開發也不是從 github 過來，拒絕
        callback(new Error('Not allowed'), false)
      }
    }
  },
  credentials: true
}))
// ---獲取圖片
app.get('/images/:src', async (req, res) => {
  if (process.env.FTP === false) {
    const path = process.cwd() + '/images/' + req.params.src
    const exists = fs.existsSync(path)
    if (exists) {
      res.status(200)
      res.sendFile(path)
    } else {
      res.status(404)
      res.send({ success: false, message: '找不到圖片' })
    }
  } else {
    res.redirect('http://' + process.env.FTP_HOST + '/' + process.env.FTP_USER + '/' + req.params.src)
  }
})
// ----註冊
app.post('/registering', async (req, res) => {
  // 拒絕不是JSON的資料格式
  if (!req.headers['content-type'].includes('application/json')) {
    // 會回傳錯誤狀態碼(400)
    res.status(400)
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
// ---用戶資訊(byaccount)
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
// ---用戶清單
app.post('/alluser', async (req, res) => {
  try {
    const result = await database.users.find()
    console.log(result)
    if (result !== null) {
      res.status(200)
      res.send({ success: true, message: '', result })
    } else {
      res.status(404)
      res.send({ success: false, message: '不存在用戶資訊' })
    }
  } catch (error) {
    res.status(500)
    console.log(error)
    res.send({ success: false, message: error })
  }
})
// ---刪除用戶
app.post('/deleteuser', async (req, res) => {
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400)
    res.send({ success: false, message: '格式錯誤' })
    return
  }
  try {
    const result = await database.users.findOneAndRemove({ account: req.body.account })
    console.log(result)
    if (result !== null) {
      res.status(200)
      res.send({ success: true, message: '' })
    } else {
      res.status(404)
      res.send({ success: false, message: '不存在用戶資訊' })
    }
  } catch (error) {
    res.status(500)
    console.log(error)
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
// ---菜單上傳
app.post('/addmeal', async (req, res) => {
  if (!req.headers['content-type'].includes('multipart/form-data')) {
    res.status(400)
    res.send({ success: false, message: '格式不符' })
    return
  }
  upload.single('src')(req, res, async error => {
    if (error instanceof multer.MulterError) {
      // 上傳錯誤
      let message = ''
      if (error.code === 'LIMIT_FILE_SIZE') {
        message = '檔案太大'
      } else {
        message = '格式不符'
      }
      res.status(400)
      res.send({ success: false, message })
    } else if (error) {
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤' })
    } else {
      try {
        let src = ''
        if (process.env.FTP === false) {
          src = req.file.filename
        } else {
          src = path.basename(req.file.path)
        }

        const result = await database.menus.create(
          {
            title: req.body.title,
            value: req.body.value,
            type: req.body.type,
            src,
            description: req.body.description
          }
        )
        res.status(200)
        res.send({ success: true, message: '', result })
      } catch (error) {
        if (error.name === 'ValidationError') {
          // 資料格式錯誤
          const key = Object.keys(error.errors)[0]
          const message = error.errors[key].message
          res.status(400)
          res.send({ success: false, message })
        } else {
          console.log(error)
          // 伺服器錯誤
          res.status(500)
          res.send({ success: false, message: '伺服器錯誤' })
        }
      }
    }
  })
})
// ---特餐更新
app.post('/specialmeal', async (req, res) => {
  if (!req.headers['content-type'].includes('multipart/form-data')) {
    res.status(400)
    res.send({ success: false, message: '格式不符' })
    return
  }
  upload.single('src')(req, res, async error => {
    if (error instanceof multer.MulterError) {
      // 上傳錯誤
      let message = ''
      if (error.code === 'LIMIT_FILE_SIZE') {
        message = '檔案太大'
      } else {
        message = '格式不符'
      }
      res.status(400)
      res.send({ success: false, message })
    } else if (error) {
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤' })
    } else {
      try {
        let src = ''
        if (process.env.FTP === false) {
          src = req.file.filename
        } else {
          src = path.basename(req.file.path)
        }
        let result = await database.menus.findOneAndUpdate(
          { type: req.body.type },
          {
            title: req.body.title,
            value: req.body.value,
            src: req,
            description: req.body.description
          }
        )

        if (result === null) {
          result = await database.menus.create(
            {
              title: req.body.title,
              value: req.body.value,
              type: req.body.type,
              src,
              description: req.body.description
            }
          )
        }
        console.log(result)
        res.status(200)
        res.send({ success: true, message: '', result })
      } catch (error) {
        if (error.name === 'ValidationError') {
          // 資料格式錯誤
          const key = Object.keys(error.errors)[0]
          const message = error.errors[key].message
          res.status(400)
          res.send({ success: false, message })
        } else {
          console.log(error)
          // 伺服器錯誤
          res.status(500)
          res.send({ success: false, message: '伺服器錯誤' })
        }
      }
    }
  })
})
// ---菜單清單
app.post('/allmenu', async (req, res) => {
  try {
    const result = await database.menus.find().sort({ type: 1 })
    if (result !== null) {
      res.status(200)
      res.send({ success: true, message: '', result })
    } else {
      res.status(404)
      res.send({ success: false, message: '沒有菜單' })
    }
  } catch (error) {
    res.status(500)
    console.log(error)
    res.send({ success: false, message: error })
  }
})
// ---更動菜單
app.post('/changemeal', async (req, res) => {
  // 拒絕不是JSON的資料格式
  if (!req.headers['content-type'].includes('application/json')) {
    // 會回傳錯誤狀態碼(400)
    res.status(400)
    res.send({ success: false, message: '格式不符' })
    return
  }
  // 新增資料
  try {
    const result = await database.menus.findByIdAndUpdate(
      { _id: req.body.id },
      {
        title: req.body.title,
        value: req.body.value,
        type: req.body.type,
        description: req.body.description
      }
    )
    console.log(result)
    res.status(200)
    res.send({ success: true, message: '', id: result._id, result })
  } catch (error) {
    console.log(error)
    const key = Object.keys(error.errors)[0]
    const message = error.errors[key].message
    res.send({ success: false, message: message })
  }
})
// ---刪除菜單
app.post('/deletemeal', async (req, res) => {
  // 拒絕不是JSON的資料格式
  if (!req.headers['content-type'].includes('application/json')) {
    // 會回傳錯誤狀態碼(400)
    res.status(400)
    res.send({ success: false, message: '格式不符' })
    return
  }
  // 新增資料
  try {
    const result = await database.menus.findByIdAndRemove(
      { _id: req.body.id }
    )
    console.log(result)
    res.status(200)
    res.send({ success: true, message: '', id: result._id, result })
  } catch (error) {
    console.log(error)
    const key = Object.keys(error.errors)[0]
    const message = error.errors[key].message
    res.send({ success: false, message: message })
  }
})
// ---新增活動
app.post('/addevent', async (req, res) => {
  if (!req.headers['content-type'].includes('multipart/form-data')) {
    res.status(400)
    res.send({ success: false, message: '格式不符' })
    return
  }
  upload.single('src')(req, res, async error => {
    if (error instanceof multer.MulterError) {
      // 上傳錯誤
      let message = ''
      if (error.code === 'LIMIT_FILE_SIZE') {
        message = '檔案太大'
      } else {
        message = '格式不符'
      }
      res.status(400)
      res.send({ success: false, message })
    } else if (error) {
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤' })
    } else {
      let src = ''
      if (process.env.FTP === false) {
        src = req.file.filename
      } else {
        src = path.basename(req.file.path)
      }
      try {
        const result = await database.events.create(
          {
            title: req.body.title,
            color: req.body.color,
            startyear: req.body.startyear,
            startmonth: req.body.startmonth,
            startday: req.body.startday,
            endyear: req.body.endyear,
            endmonth: req.body.endmonth,
            endday: req.body.endday,
            src,
            description: req.body.description
          }
        )
        res.status(200)
        res.send({ success: true, message: '', result })
      } catch (error) {
        if (error.name === 'ValidationError') {
          // 資料格式錯誤
          const key = Object.keys(error.errors)[0]
          const message = error.errors[key].message
          res.status(400)
          res.send({ success: false, message })
        } else {
          // console.log(error)
          // 伺服器錯誤
          res.status(500)
          res.send({ success: false, message: '伺服器錯誤' })
        }
      }
    }
  })
})
// ---活動清單
app.post('/allevent', async (req, res) => {
  try {
    const result = await database.events.find().sort({ startday: 1 }).sort({ startmonth: 1 }).sort({ startyear: 1 })
    if (result !== null) {
      res.status(200)
      res.send({ success: true, message: '', result })
    } else {
      res.status(404)
      res.send({ success: false, message: '沒有活動' })
    }
  } catch (error) {
    res.status(500)
    console.log(error)
    res.send({ success: false, message: error })
  }
})
// ---更動活動
app.post('/changeevent', async (req, res) => {
  // 拒絕不是JSON的資料格式
  if (!req.headers['content-type'].includes('application/json')) {
    // 會回傳錯誤狀態碼(400)
    res.status(400)
    res.send({ success: false, message: '格式不符' })
    return
  }
  // 新增資料
  try {
    const result = await database.events.findByIdAndUpdate(
      { _id: req.body.id },
      {
        title: req.body.title,
        startyear: req.body.startyear,
        startmonth: req.body.startmonth,
        startday: req.body.startday,
        endyear: req.body.endyear,
        endmonth: req.body.endmonth,
        endday: req.body.endday,
        description: req.body.description
      }
    )
    res.status(200)
    res.send({ success: true, message: '', id: result._id, result })
  } catch (error) {
    console.log(error)
    const key = Object.keys(error.errors)[0]
    const message = error.errors[key].message
    res.send({ success: false, message: message })
  }
})
// ---刪除活動
app.post('/deleteevent', async (req, res) => {
  // 拒絕不是JSON的資料格式
  if (!req.headers['content-type'].includes('application/json')) {
    // 會回傳錯誤狀態碼(400)
    res.status(400)
    res.send({ success: false, message: '格式不符' })
    return
  }
  // 新增資料
  try {
    const result = await database.events.findByIdAndRemove(
      { _id: req.body.id }
    )
    console.log(result)
    res.status(200)
    res.send({ success: true, message: '', id: result._id, result })
  } catch (error) {
    console.log(error)
    const key = Object.keys(error.errors)[0]
    const message = error.errors[key].message
    res.send({ success: false, message: message })
  }
})
// ---商品上傳
app.post('/additem', async (req, res) => {
  if (!req.headers['content-type'].includes('multipart/form-data')) {
    res.status(400)
    res.send({ success: false, message: '格式不符' })
    return
  }
  upload.single('src')(req, res, async error => {
    if (error instanceof multer.MulterError) {
      // 上傳錯誤
      let message = ''
      if (error.code === 'LIMIT_FILE_SIZE') {
        message = '檔案太大'
      } else {
        message = '格式不符'
      }
      res.status(400)
      res.send({ success: false, message })
    } else if (error) {
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤' })
    } else {
      let src = ''
      if (process.env.FTP === false) {
        src = req.file.filename
      } else {
        src = path.basename(req.file.path)
      }
      try {
        const result = await database.markets.create(
          {
            title: req.body.title,
            value: req.body.value,
            type: req.body.type,
            src,
            description: req.body.description,
            stock: req.body.stock
          }
        )
        res.status(200)
        res.send({ success: true, message: '', result })
      } catch (error) {
        if (error.name === 'ValidationError') {
          // 資料格式錯誤
          const key = Object.keys(error.errors)[0]
          const message = error.errors[key].message
          res.status(400)
          res.send({ success: false, message })
        } else {
          console.log(error)
          // 伺服器錯誤
          res.status(500)
          res.send({ success: false, message: '伺服器錯誤' })
        }
      }
    }
  })
})
// ---商品清單
app.post('/allmarket', async (req, res) => {
  try {
    const result = await database.markets.find().sort({ type: 1 })
    if (result !== null) {
      res.status(200)
      res.send({ success: true, message: '', result })
    } else {
      res.status(404)
      res.send({ success: false, message: '沒有菜單' })
    }
  } catch (error) {
    res.status(500)
    console.log(error)
    res.send({ success: false, message: error })
  }
})
// ---更動商品
app.post('/changeitem', async (req, res) => {
  // 拒絕不是JSON的資料格式
  if (!req.headers['content-type'].includes('application/json')) {
    // 會回傳錯誤狀態碼(400)
    res.status(400)
    res.send({ success: false, message: '格式不符' })
    return
  }
  // 新增資料
  try {
    const result = await database.markets.findByIdAndUpdate(
      { _id: req.body.id },
      {
        title: req.body.title,
        value: req.body.value,
        type: req.body.type,
        description: req.body.description
      }
    )
    console.log(result)
    res.status(200)
    res.send({ success: true, message: '', id: result._id, result })
  } catch (error) {
    console.log(error)
    const key = Object.keys(error.errors)[0]
    const message = error.errors[key].message
    res.send({ success: false, message: message })
  }
})
// ---刪除商品
app.post('/deleteitem', async (req, res) => {
  // 拒絕不是JSON的資料格式
  if (!req.headers['content-type'].includes('application/json')) {
    // 會回傳錯誤狀態碼(400)
    res.status(400)
    res.send({ success: false, message: '格式不符' })
    return
  }
  // 新增資料
  try {
    const result = await database.markets.findByIdAndRemove(
      { _id: req.body.id }
    )
    console.log(result)
    res.status(200)
    res.send({ success: true, message: '', id: result._id, result })
  } catch (error) {
    console.log(error)
    const key = Object.keys(error.errors)[0]
    const message = error.errors[key].message
    res.send({ success: false, message: message })
  }
})
// ---上傳購物車
app.post('/addcart', async (req, res) => {
  if (!req.headers['content-type'].includes('application/json')) {
    // 會回傳錯誤狀態碼(400)
    res.status(400)
    res.send({ success: false, message: '格式不符' })
    return
  }

  try {
    let result = await database.carts.findOneAndUpdate(
      { buying: req.body.buying, account: req.body.account, itemid: req.body.itemid },
      {
        $inc: { number: +req.body.number }
      }
    )
    if (result === null) {
      result = await database.carts.create(
        {
          itemid: req.body.itemid,
          account: req.body.account,
          title: req.body.title,
          number: req.body.number,
          value: req.body.value,
          src: req.body.src,
          buying: req.body.buying
        }
      )
    }
    res.status(200)
    res.send({ success: true, message: '', result })
  } catch (error) {
    if (error.name === 'ValidationError') {
      // 資料格式錯誤
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400)
      res.send({ success: false, message })
    } else {
      console.log(error)
      // 伺服器錯誤
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤' })
    }
  }
})
// ---購物車清單(byaccount)
app.post('/getusercart', async (req, res) => {
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400)
    res.send({ success: false, message: '格式錯誤' })
    return
  }
  try {
    const result = await database.carts.find({
      account: req.body.account
    })
    if (result !== null) {
      res.status(200)
      res.send({ success: true, message: '', result })
    } else {
      res.status(404)
      res.send({ success: false, message: '不存在購物車資料' })
    }
  } catch (error) {
    res.status(500)
    res.send({ success: false, message: error })
  }
})
// ---更動購物車
app.post('/changecart', async (req, res) => {
  // 拒絕不是JSON的資料格式
  if (!req.headers['content-type'].includes('application/json')) {
    // 會回傳錯誤狀態碼(400)
    res.status(400)
    res.send({ success: false, message: '格式不符' })
    return
  }
  // 新增資料
  try {
    const result = await database.carts.findByIdAndUpdate(
      { _id: req.body.id },
      { number: req.body.number }
    )
    console.log(result)
    res.status(200)
    res.send({ success: true, message: '', id: result._id, result })
  } catch (error) {
    console.log(error)
    const key = Object.keys(error.errors)[0]
    const message = error.errors[key].message
    res.send({ success: false, message: message })
  }
})
// ---刪除購物車
app.post('/deletecart', async (req, res) => {
  // 拒絕不是JSON的資料格式
  if (!req.headers['content-type'].includes('application/json')) {
    // 會回傳錯誤狀態碼(400)
    res.status(400)
    res.send({ success: false, message: '格式不符' })
    return
  }
  // 新增資料
  try {
    const result = await database.carts.findByIdAndRemove(
      { _id: req.body.id }
    )
    console.log(result)
    res.status(200)
    res.send({ success: true, message: '', id: result._id, result })
  } catch (error) {
    console.log(error)
    const key = Object.keys(error.errors)[0]
    const message = error.errors[key].message
    res.send({ success: false, message: message })
  }
})
// 清空購物車(byaccount)
app.post('/clearcart', async (req, res) => {
  // 拒絕不是JSON的資料格式
  if (!req.headers['content-type'].includes('application/json')) {
    // 會回傳錯誤狀態碼(400)
    res.status(400)
    res.send({ success: false, message: '格式不符' })
    return
  }
  // 新增資料
  try {
    const result = await database.carts.findOneAndRemove(
      { account: req.body.account, buying: req.body.buying }
    )
    console.log(result)
    res.status(200)
    res.send({ success: true, message: '', result })
  } catch (error) {
    console.log(error)
    const key = Object.keys(error.errors)[0]
    const message = error.errors[key].message
    res.send({ success: false, message: message })
  }
})
// ---購物車轉清單
app.post('/buyingcart', async (req, res) => {
  try {
    const result = await database.carts.findByIdAndUpdate(
      { _id: req.body.id }, {
        buying: req.body.buying
      })
    console.log(result)
    if (result !== null) {
      res.status(200)
      res.send({ success: true, message: '', result })
    } else {
      res.status(404)
      res.send({ success: false, message: '沒有菜單' })
    }
  } catch (error) {
    res.status(500)
    console.log(error)
    res.send({ success: false, message: error })
  }
})
// ---訂單送出
app.post('/cartorder', async (req, res) => {
  try {
    const result = await database.cartorders.create(
      req.body)
    // console.log(result)
    if (result !== null) {
      res.status(200)
      res.send({ success: true, message: '', result })
    } else {
      res.status(404)
      res.send({ success: false, message: '沒有菜單' })
    }
  } catch (error) {
    res.status(500)
    console.log(error)
    res.send({ success: false, message: error })
  }
})
// ---取消購物車清單
app.post('/cancelcartorder', async (req, res) => {
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400)
    res.send({ success: false, message: '格式錯誤' })
    return
  }
  try {
    const result = await database.cartorders.findOneAndRemove({ _id: req.body.id })
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
// ---結案購物車清單
app.post('/finishcartorder', async (req, res) => {
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400)
    res.send({ success: false, message: '格式錯誤' })
    return
  }
  try {
    const result = await database.cartorders.findByIdAndUpdate({ _id: req.body.id }, {
      finish: req.body.finish
    })
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
// ---訂單清單
app.post('/allcartorder', async (req, res) => {
  try {
    const result = await database.cartorders.find()
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
// ---訂單清單(byaccount)
app.post('/getusercartorder', async (req, res) => {
  try {
    const result = await database.cartorders.find({
      account: req.body.account
    })
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
app.listen(process.env.PORT, () => {
  console.log('網頁伺服器已啟動')
})
