// 預設匯入時名字可以自己設定
// import apple from "./export.js"
// let apple2 = apple(3, 3)
// console.log(apple2);

// 具名個別匯入
// 匯入時變數名稱必須一樣
// import {}放要引用的變數
// 如果怕變數名稱跟檔案內的重複，可以用as來給命名
// import { a as aaa, b } from "./export.js"
// console.log(aaa);
// console.log(b);

// 具名一次全部匯入
// 匯入時變數名稱必須一樣
// import {}放要引用的變數
// 如果怕變數名稱跟檔案內的重複，可以用as來給命名
// import * as apple from "./export.js"
// console.log(apple);
// console.log(apple.a);
// console.log(apple.b);
// console.log(apple.c);

// 預設和具名同時
// import 預設 ,具名 from 檔案
import apple, * as banana from "./export"
console.log(apple(1, 2));
console.log(banana.c);