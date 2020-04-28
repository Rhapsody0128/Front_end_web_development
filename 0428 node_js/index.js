// const http = require('http')
// 從http套件引用變數，取名為http
// require是CommonJS的語法

import http from 'http'
// import只有在node.js>13.0且在package.json 加入 "type": "module"，否則會跳ERROR
// import是EMCAScript語法

const server = http.createServer((req, res) => {
    res.writeHead(200)
    // 回應狀態碼200成功
    res.write('hello')
    // 回應內容
    res.end()
    // 回應結束

})
server.listen(3237, () => {
    // 在port1237啟用，啟動後執行console.log
    console.log('網頁伺服器已啟用:http://localhost:3237');
})