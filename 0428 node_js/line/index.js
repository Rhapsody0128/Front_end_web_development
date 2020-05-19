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
      const html = await rp('https://memes.tw/image/' + rand)
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

const wtf = async () => {
  let re = {}
  try {
    let found = ''
    while (found.length === 0) {
      const rand = Math.floor(Math.random() * 272177) + 1
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

const search = async (keyword) => {
  let re = []
  const array = []
  try {
    const html = await rp('https://memes.tw/maker?q=' + escape(keyword))

    const $ = cheerio.load(html)

    for (let i = 0; i < $('.-shadow.mt-3.mx-2').length; i++) {
      array.push($('.mt-3.mx-2').eq(i).find('img').attr('src'))
    }
    console.log($('.-shadow.mt-3.mx-2').eq(0).find('img').attr('src'))
  } catch (error) {
    console.log(error.message)
    if (error.name === 'StatusCodeError' && error.statusCode === 404) {
      search()
    } else {
      re = {
        type: 'text',
        text: '錯誤'
      }
    }
  }
  return re
}

search('貓')

const week = async () => {
  let re = []
  const array = []
  try {
    const html = await rp('https://memes.tw/wtf?sort=top-week')
    const $ = cheerio.load(html)
    for (let i = 0; i < $('.col-lg-8.text-center').length; i++) {
      array.push($('.col-lg-8.text-center').eq(i).find('img').attr('data-src'))
    }
    for (let i = 0; i < 5; i++) {
      re.push({
        type: 'image',
        originalContentUrl: array[i],
        previewImageUrl: array[i]
      })
    }
  } catch (error) {
    console.log(error)
    re = {
      type: 'text',
      text: '錯誤'
    }
  }
  console.log(re)
  return re
}

const month = async () => {
  let re = []
  const array = []
  try {
    const html = await rp('https://memes.tw/wtf?sort=top-month')
    const $ = cheerio.load(html)
    for (let i = 0; i < $('.col-lg-8.text-center').length; i++) {
      array.push($('.col-lg-8.text-center').eq(i).find('img').attr('data-src'))
    }

    for (let i = 0; i < 5; i++) {
      re.push({
        type: 'image',
        originalContentUrl: array[i],
        previewImageUrl: array[i]
      })
    }
  } catch (error) {
    re = {
      type: 'text',
      text: '錯誤'
    }
  }
  return re
}

const year = async () => {
  let re = []
  const array = []
  try {
  
    const html = await rp('https://memes.tw/wtf?sort=top-year')
    const $ = cheerio.load(html)
    for (let i = 0; i < $('.col-lg-8.text-center').length; i++) {
      array.push($('.col-lg-8.text-center').eq(i).find('img').attr('data-src'))
    }

    for (let i = 0; i < 5; i++) {
      re.push({
        type: 'image',
        originalContentUrl: array[i],
        previewImageUrl: array[i]
      })
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
  console.log(event)
  let reply = {}
  switch (event.message.text) {
    case '隨機':
      reply = await img()
      break
    case '網友隨機':
      reply = await wtf()
      break
    case '週':
      reply = await week()
      break
    case '月':
      reply = await month()
      break
    case '年':
      reply = await year()
      break
  }
  event.reply(reply)
})
