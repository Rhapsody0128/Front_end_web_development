// 預設匯出
// 一個檔案裡面只能有一個預設匯出
const add = (num1, num2) => {
  return num1 + num2
}
export default add

// 具名匯出
// 一個檔案裡可以有好幾個

const num1 = 1
const num2 = 2
export const a = "a"
export const b = "b"
export const c = num1 + num2