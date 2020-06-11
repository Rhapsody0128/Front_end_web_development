// 網頁伺服器
import express from 'express'
// 讓express可以讀取post資料
import bodyParser from 'body-parser'
// 密碼加密md5
import md5 from 'md5'
import db from './db.js'

const app = express()

// 讓express使用bodyParser，並把收到的資料轉成JSON
app.use(bodyParser.json())
app.post('/new', async (req, res) => {
  // 拒絕不是JSON的資料格式
  if (req.headers['content-type'] !== 'application/json') {
    // 會回傳錯誤狀態碼(400)
    res.status(400)
    res.send({ success: false, message: '格式不符' })
    return
  }

  if (req.body.name === undefined ||
    req.body.account === undefined ||
    req.body.password === undefined ||
    req.body.email === undefined
  ) {
    res.status(400)
    res.send({ success: false, message: '欄位不正確' })
    return
  }

  // 新增資料
  try {
    const result = await db.user.create(
      {
        name: req.body.name,
        account: req.body.account,
        password: md5(req.body.password),
        email: req.body.email
      }
    )
    res.status(200)
    res.send({ success: true, message: '', id: result._id })
  } catch (error) {
    // console.log(error);
    const key = Object.keys(error.errors)[0]
    const message = error.errors[key].message
    res.send({ success: false, message: message })
  }
})
app.get('/find', async (req, res) => {

  if (req.query.id === undefined) {
    res.status(400)
    res.send({ success: false, message: "欄位不正確" })
    return
  } try {
    // 使用ID尋找資料，只取account，去掉id
    const result = await db.user.findById(req.query.id, 'account -_id')
    console.log(result);
    res.status(200)
    res.send({ success: false, message: '', account: result.account })
  } catch (error) {
    // 找不到東西
    res.status(404)
    res.send({ success: false, message: '找不到' })
  }
})

app.patch('/update/:type', async (req, res) => {
  // 拒絕非JSON的資料格式
  if (req.headers['content-type'] !== 'application/json') {
    // 會回傳錯誤狀態碼(400)
    res.status(400)
    res.send({ success: false, message: '格式不符' })
    return
  }
  if (
    req.params.type !== 'account' &&
    req.params.type !== 'password' &&
    req.params.type !== 'name' &&
    req.params.type !== 'email'
  ) {
    res.status(400)
    req.send({ success: false, message: '更新欄位不符' })
  }
  try {
    // findByIdAndUpdate預設回來的result是更新前資料
    // 加上new true後可以回來新的資料
    const result = await db.user.findByIdAndUpdate(req.body.id, { [req.params.type]: req.body.data }, { new: true })
    console.log(result);
    res.status(200)
    res.send({ success: true, message: '' })
  } catch (error) {
    res.status(500)
    res.send({ success: false, message: '發生錯誤' })
  }
})


app.delete('/delete', async (req, res) => {
  // 拒絕非JSON的資料格式
  if (req.headers['content-type'] !== 'application/json') {
    // 會回傳錯誤狀態碼(400)
    res.status(400)
    res.send({ success: false, message: '格式不符' })
    return
  }
  try {
    const result = await db.user.findByIdAndDelete(req.body.id)
    if (result === null) {
      res.status(404)
      res.send({ success: false, message: '找不到資料' })
    } else {
      res.status(200)
      res.send({ success: true, message: '' })
    }
  } catch (error) {
    res.status(500)
    res.send({ success: false, message: '發生錯誤' })
    console.log(error);
  }
})

app.listen(3000, () => {
  console.log('網頁伺服器已啟動');
  console.log('http://localhost:3000');
})