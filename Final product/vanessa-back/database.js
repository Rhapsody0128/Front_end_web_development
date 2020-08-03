// 引用驗證工具
// import validator from 'validator'
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

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useNewUrlParser', true)
mongoose.set('useUnifiedTopology', true)

// 連接資料庫
mongoose.connect(process.env.DBURL, { useNewUrlParser: true, useUnifiedTopology: true })

// 引用插件
mongoose.plugin(beautifyUnique)
mongoose.plugin(idPlugin)

// 編寫資料表綱要

// ---會員資料庫
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
      required: [true, '使用者名稱必填']
      // 避免重複，只能設定 true，無法自訂錯誤訊息，除非使用插件
    },
    account: {
      type: String,
      minlength: [8, '使用者帳號最小 8 個字'],
      maxlength: [20, '使用者帳號最大 20 個字'],
      required: [true, '帳號必填'],
      unique: '使用者帳號重複'
    },
    password: {
      type: String,
      required: [true, '密碼必填']
    },
    phone: {
      type: String,
      // 最小值，自訂錯誤訊息
      min: [6, '必須大於 6 碼'],
      // 最大值，自訂錯誤訊息
      required: [true, '電話必填']
    },
    email: {
      type: String,
      required: [true, '信箱必填'],
      unique: '此信箱已經被註冊'
    }
  },
  {
    // 不要紀錄資料修改次數
    versionKey: false
  }
)

// ---訂位資料庫
const orderSchema = new Schema(
  {
    // 欄位名稱
    account: {
      type: String,
      required: [true, 'BUG_ERROR_USER_NOT_LOGIN_BUT_ORDER'],
      unique: '此帳號已訂過位，如需重新定位請先行取消'
    },
    name: {
      // 資料類型是文字
      type: String,
      // 最小長度，自訂錯誤訊息
      required: [true, '會員名稱必填']
      // 避免重複，只能設定 true，無法自訂錯誤訊息，除非使用插件
    },
    phone: {
      type: String,
      minlength: [6, '電話最小 6 碼'],
      required: [true, '電話必填']
    },
    date: {
      type: String,
      required: [true, '未輸入日期']
    },
    peoplecount: {
      type: String,
      required: [true, '請選擇人數']
    },
    time: {
      type: String,
      required: [true, '請選擇用餐時間']
    },
    remarks: {
      type: String,
      maxlength: [200, '最大 200 個字']
    }
  },
  {
    // 不要紀錄資料修改次數
    versionKey: false
  }
)

const menuSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, '餐點名稱未填']
    },
    src: {
      type: String,
      required: [true, '圖片未上傳']
    },
    description: {
      type: String,
      required: [true, '餐點描述未填']
    },
    type: {
      type: String,
      required: [true, '類型必填']
    },
    value: {
      type: Number,
      required: [true, '定價未填']
    }
  },
  {
    // 不要紀錄資料修改次數
    versionKey: false
  }
)

const marketSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, '餐點名稱未填']
    },
    src: {
      type: String,
      required: [true, '圖片未上傳']
    },
    description: {
      type: String,
      required: [true, '餐點描述未填']
    },
    type: {
      type: String,
      required: [true, '類型必填']
    },
    value: {
      type: Number,
      required: [true, '定價未填']
    },
    stock: {
      type: Number,
      required: [true, '庫存必填']
    }
  },
  {
    // 不要紀錄資料修改次數
    versionKey: false
  }
)
const cartSchema = new Schema(
  {
    itemid: {
      type: String,
      required: [true, '沒有商品品項']
    },
    account: {
      type: String,
      required: [true, 'BUG_ERROR_USER_NOT_LOGIN_BUT_ORDER']
    },
    title: {
      type: String,
      required: [true, '商品名稱未選擇']
    },
    number: {
      type: Number,
      required: [true, '數量未填']
    },
    value: {
      type: Number,
      required: [true, '定價未填']
    },
    src: {
      type: String,
      required: [true, '沒有圖片']
    },
    buying: {
      type: Boolean
    }
  },
  {
    // 不要紀錄資料修改次數
    versionKey: false
  }
)

const cartorderSchema = new Schema(
  {
    itemid: {
      type: Array,
      required: [true, '沒有商品品項']
    },
    account: {
      type: String,
      required: [true, 'BUG_ERROR_USER_NOT_LOGIN_BUT_ORDER']
    },
    title: {
      type: Array,
      required: [true, '餐點名稱未填']
    },
    number: {
      type: Array,
      required: [true, '數量未填']
    },
    value: {
      type: Array,
      required: [true, '定價未填']
    },
    src: {
      type: Array,
      required: [true, '沒有圖片']
    },
    buying: {
      type: Boolean
    },
    finish: {
      type: Boolean
    }
  },
  {
    // 不要紀錄資料修改次數
    versionKey: false
  }
)

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, '活動標題未填']
    },
    src: {
      type: String,
      required: [true, '圖片未上傳']
    },
    description: {
      type: String,
      required: [true, '活動描述未填']
    },
    startyear: {
      type: Number,
      required: [true, '活動日期未輸入']
    },
    startmonth: {
      type: Number,
      required: [true, '活動日期未輸入']
    },
    startday: {
      type: Number,
      required: [true, '活動日期未輸入']
    },
    endyear: {
      type: Number,
      required: [true, '活動日期未輸入']
    },
    endmonth: {
      type: Number,
      required: [true, '活動日期未輸入']
    },
    endday: {
      type: Number,
      required: [true, '活動日期未輸入']
    },
    color: {
      type: String,
      required: [true, '圓點顏色未選']
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
const orders = mongoose.model('orders', orderSchema)
const menus = mongoose.model('menus', menuSchema)
const events = mongoose.model('events', eventSchema)
const markets = mongoose.model('markets', marketSchema)
const carts = mongoose.model('carts', cartSchema)
const cartorders = mongoose.model('cartorders', cartorderSchema)
const connection = mongoose.connection

// 匯出變數
export default {
  users,
  orders,
  menus,
  events,
  markets,
  carts,
  cartorders,
  connection
}
