// 引用驗證工具
import validator from 'validator'
// 引用 mongoose
import mongoose from 'mongoose'
// 引用 dotenv
import dotenv from 'dotenv'
// 引用重複驗證錯誤訊息插件
import beautifyUnique from 'mongoose-beautiful-unique-validation'
// 引用將 _id 欄位顯示為 id 的插件
import idPlugin from 'mongoose-id'

dotenv.config()
const Schema = mongoose.Schema

// 連接資料庫
mongoose.connect(process.env.dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })

// 引用插件
mongoose.plugin(beautifyUnique)
mongoose.plugin(idPlugin)

// 編寫資料表綱要
const userSchema = new Schema(
  {
    // 欄位名稱
    name: {
      // 資料類型是文字
      type: String,
      // 最小長度，自訂錯誤訊息
      minlength: [1, '使用者名稱最小 1 個字'],
      // 最大長度，自訂錯誤訊息
      maxlength: [20, '使用者名稱最大 20 個字'],
      // 必填欄位，自訂錯誤訊息
      required: [true, '使用者名稱必填'],
      // 避免重複，只能設定 true，無法自訂錯誤訊息，除非使用插件
      unique: '使用者名稱重複'
    },
    account: {
      type: String,
      maxlength: [20, '使用者密碼最大 20 個字'],
      required: [true, '密碼必填'],
      unique: '使用者名稱重複'
    },
    password: {
      type: String,
      maxlength: [20, '使用者密碼最大 20 個字'],
      required: [true, '密碼必填']
    },
    phone: {
      type: Number,
      // 最小值，自訂錯誤訊息
      min: [6, '必須大於 6 碼'],
      // 最大值，自訂錯誤訊息
      required: [true, '電話必填']
    }
  },
  {
    // 不要紀錄資料修改次數
    versionKey: false
  }
)

// 建立 Model
// mongoose.model('資料表名稱', Schema)
// 資料表名稱必須為複數，結尾加 s
const users = mongoose.model('users', userSchema)

// 匯出變數
export default {
  users
}
