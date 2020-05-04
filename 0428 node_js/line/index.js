import linebot from 'linebot'
// 引用linebot套件
import dotenvf from 'dotenv'
// 引用dotenv套件
import rp from 'request-promise'
import cheerio from 'cheerio'

dotenvf.config()
// 讀取.env檔

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

const img = async () => {
  let re = {}
  try {
    let found = ''
    while (found.length === 0) {
      const rand = Math.floor(Math.random() * 6704) + 1
      const html = await rp({ uri: 'https://memes.tw/image/' + rand, json: true })
      const $ = cheerio.load(html)
      if ($('.text-center.mt-3 img').attr('src') !== undefined) {
        found = $('.text-center.mt-3 img').attr('src')
      }
    }
    re = {
      type: 'image',
      originalContentUrl: found,
      previewImageUrl: found
    }
  } catch (error) {
    re = {
      type: 'text',
      text: '錯誤'
    }
  }
  return re
}
const month = async () => {
  let re = {}
  try {
    let found = ''
    // while (found.length === 0) {
    // const rand = Math.floor(Math.random() * 271302) + 1
    const html = await rp({ uri: 'https://memes.tw/wtf?sort=top-week', json: true })
    const $ = cheerio.load(html)
    for (let i = 0; i < $('.mb-3.border-bottom.pb-3').length; i++) {
      console.log($('.mb-3.border-bottom.pb-3').eq(i).find('img').eq(0).attr('data-src'))
    }

    if ($('.text-center.mb-2 img').attr('src') !== undefined) {
      found = $('.text-center.mb-2 img').attr('src')
    }
    // }

    re = {
      type: 'image',
      originalContentUrl: found,
      previewImageUrl: found
    }
  } catch (error) {
    re = {
      type: 'text',
      text: '錯誤'
    }
  }
  return re
}
month()
const wtf = async () => {
  let re = {}
  try {
    let found = ''
    while (found.length === 0) {
      const rand = Math.floor(Math.random() * 271302) + 1
      const html = await rp({ uri: 'https://memes.tw/wtf/' + rand, json: true })
      const $ = cheerio.load(html)

      console.log($('.text-center.mb-2 img').attr('src'))
      if ($('.text-center.mb-2 img').attr('src') !== undefined) {
        found = $('.text-center.mb-2 img').attr('src')
      }
    }

    re = {
      type: 'image',
      originalContentUrl: found,
      previewImageUrl: found
    }
  } catch (error) {
    re = {
      type: 'text',
      text: '錯誤'
    }
  }
  return re
}

bot.listen('/', process.env.PORT, () => {
  // 在port啟動
  console.log('機器人已啟動')
})

bot.on('message', async (event) => {
  // 當收到訊息時

  let reply = {}
  switch (event.message.text) {
    case '隨機':
      reply = await img()
      break
    case 'wtf':
      reply = await wtf()
      break
    case 'month':
      reply = await month()
      break
  }
  event.reply(reply)
})
