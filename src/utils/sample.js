{
  const sample1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const sample2 = [0, 0, 0, 0, 0, 0, 5, 5, 10, 35]
  const sample3 = [5.5, 5.5, 5.5, 5.5, 5.5, 5.5, 5.5, 5.5, 5.5, 5.5]

  // 引数の配列の要素を全て足し合わせる関数
  const add = arr => arr.reduce((acc, cur) => acc + cur)

  // 引数の配列の要素を全て掛け合わせる関数
  const mul = arr => arr.reduce((acc, cur) => acc * cur)

  // 正則化する関数
  const normalize = arr => {
    const total = add(arr)
    return arr.map(n => 1 + (n / total))
  }

  const result1 = mul(normalize(sample1))
  const result2 = mul(normalize(sample2))
  const result3 = mul(normalize(sample3))

  console.table({ result1, result2, result3 })
}
