import linebot from 'linebot'
// 引用linebot套件
import dotenvf from 'dotenv'
// 引用dotenv套件

dotenvf.config()
// 讀取.env檔

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessTokon: process.env.CHANNEL_ACCESS_TOKON
})

bot.on('message', event => {
  // 當收到訊息時
  console.log(event)
})

bot.listen('/', process.env.PORT, () => {
  console.log('機器人已啟動')
})
// 在port啟動
