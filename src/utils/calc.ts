// 同じ配列を指定された数だけ複製し、全てを結合した新しい配列を返す関数
export const amplify = (arr: number[], count: number): number[] => {
  const newArr = []
  for (let i = 0; i < count; i++) {
    newArr.push(...arr)
  }
  return newArr
}

// 引数の配列の要素を全て足し合わせる関数
export const add = (arr: number[]): number => arr.reduce((acc, cur) => acc + cur)

// 引数の配列の要素を全て掛け合わせる関数
export const mul = (arr: number[]): number => arr.reduce((acc, cur) => acc * cur)

// 正則化する関数
export const normalize = (arr: number[]): number[] => {
  const total = add(arr)
  return arr.map(n => 1 + (n / total))
}
