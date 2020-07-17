// 網頁伺服器
import express from 'express'
// 讓 express 可以讀取 Body 資料
import bodyParser from 'body-parser'
// 跨域套件
import cors from 'cors'
// MD5 加密
import md5 from 'md5'
// 資料庫檔案
import db from './db.js'

const app = express()

// 讓 express 使用 body-parser，並把收到的資料轉 json
app.use(bodyParser.json())

// 設定跨域套件
app.use(cors({
  // origin 為請求來源網域, callback 為是否允許的回應
  origin (origin, callback) {
    // 允許任何來源網域的請求
    callback(null, true)
    // 若要拒絕請求則是
    // callback(new Error('cors error'), false)
  },
  // 允許跨域認證
  credentials: true
}))

app.post('/users', async (req, res) => {
  // 拒絕不是 json 的資料格式
  if (!req.headers['content-type'].includes('application/json')) {
    // 回傳錯誤狀態碼
    res.status(400)
    res.send({ success: false, message: '格式不符' })
    return
  }

  // 新增資料
  try {
    const result = await db.users.create(
      {
        name: req.body.name,
        password: md5(req.body.password),
        age: req.body.age,
        email: req.body.email
      }
    )
    res.status(200)
    res.send({
      success: true,
      message: '',
      id: result.id,
      name: result.name,
      age: result.age,
      email: result.email
    })
  } catch (error) {
    // 資料格式錯誤
    if (error.name === 'ValidationError') {
      // 錯誤的訊息的 key 值為欄位名稱，不固定
      // 所以用 Object.keys(err.errors)[0] 取得第一個 key 值
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400)
      res.send({ success: false, message })
    } else {
      res.status(500)
      res.send({ success: false, message: '伺服器發生錯誤' })
      console.log(error)
    }
  }
})

// 啟動網頁伺服器
app.listen(3000, () => {
  console.log('網頁伺服器已啟動')
  console.log('http://localhost:3000')
})