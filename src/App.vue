<template>
  <form
    id="top"
    @submit.prevent="submit"
  >
    <fieldset>
      <legend>データ分析</legend>

      <table v-if="display.n">
        <tr>
          <th />
          <th class="heading empty" />
          <th
            v-for="(data, index) in display.labels"
            :key="`h-${data}-${index}`"
            class="heading"
          >
            {{ data }}
          </th>
          <th class="heading empty" />
          <th class="heading">
            合計
          </th>
        </tr>
        <tr>
          <th>値</th>
          <td class="empty" />
          <td
            v-for="(data, index) in display.numbers"
            :key="`h-${data}-${index}`"
            :class="{ minus: isMinus(data) }"
          >
            {{ data }}
          </td>
          <td class="empty" />
          <td>{{ display.totalValue }}</td>
        </tr>
        <tr>
          <th>偏差</th>
          <td class="empty" />
          <td
            v-for="(data, index) in display.deviation"
            :key="`i-${data}-${index}`"
            :class="{ minus: isMinus(data) }"
          >
            {{ data }}
          </td>
          <td class="empty" />
          <td>{{ display.totalDeviation }}</td>
        </tr>
        <tr>
          <th>偏差値</th>
          <td class="empty" />
          <td
            v-for="(data, index) in display.deviationValue"
            :key="`j-${data}-${index}`"
            :class="{ minus: isMinus(data) }"
          >
            {{ data }}
          </td>
          <td class="empty" />
          <td class="slash" />
        </tr>
      </table>

      <fieldset>
        <legend>分散・標準偏差</legend>
        <label>
          <span>標本数</span>: {{ display.n }}
        </label>
        <label>
          <span>分散</span>: {{ display.variance }}
        </label>
        <label>
          <span>標準偏差</span>: {{ display.standardDeviation }}
        </label>
      </fieldset>

      <fieldset>
        <legend>代表値</legend>
        <label>
          <span>平均値</span>: {{ display.average }}
        </label>
        <label>
          <span>中央値</span>: {{ display.median }}
        </label>
        <label>
          <span>最頻値</span>: {{ display.mode }}
        </label>
      </fieldset>

      <div class="chart">
        <Chart
          :srcData="display.numbers"
          :labels="display.labels"
        />
      </div>

      <label class="input">
        <div class="box">
          <AppInputText
            ref="inputRef"
            v-model:modelValue="state.input"
            placeholder="数字を入力！"
            class="input"
          />
          <AppButton
            class="button -fill -night -bold"
            v-on="eventListener"
          >
            OK
          </AppButton>
        </div>
      </label>
    </fieldset>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from 'vue'
import AppInputText from './components/AppInputText.vue'
import Chart from './components/Chart.vue'
import AppButton from './components/AppButton.vue'

// タッチイベントのサポートの有無
export const IS_SUPPORT_TOUCH = 'ontouchend' in document

// (マウス／タッチ)系イベント
export const MOUSE_TOUCH_EVENT = {
  START: IS_SUPPORT_TOUCH ? 'touchstart' : 'mousedown',
  MOVE : IS_SUPPORT_TOUCH ? 'touchmove'  : 'mousemove',
  END  : IS_SUPPORT_TOUCH ? 'touchend'   : 'mouseup',
  LEAVE: IS_SUPPORT_TOUCH ? 'touchleave' : 'mouseleave',
}

export default defineComponent({
  name: 'App',
  components: {
    Chart,
    AppInputText,
    AppButton,
  },
  setup() {
    const numbers: number[] = []
    // const numbers = Array(999999).fill(9.999)
    // numbers.push(10)

    const state = reactive({
      input: '',
      numbers,
      normStandardDeviation: 10,
      normAverage: 50,
    }) as {
      input: string
      numbers: number[]
      normStandardDeviation: number,
      normAverage: number,
    }

    // 数値(数字)かどうか
    const isNumeric = (data: number | string): boolean =>
      !!(typeof(data) === 'number' || data.match(/^[0-9０-９]+(\.[0-9０-９]+)?$/))

    // 負の値かどうか
    const isMinus = (data: number | null): boolean =>
      data !== null && data < 0

    // 四捨五入
    const round = (num: number | null, digit = 2) =>
      num === null ? null : Math.round(num * Math.pow(10, digit)) / Math.pow(10, digit)

    // 昇順に並べ替えたもの
    const sortedData = computed(() => state.numbers.concat().sort((a, b) => a - b))

    // 標本数
    const n = computed(() => state.numbers.length)

    const labels = computed(() => (
      [...Array(n.value).keys()].map(num => String.fromCharCode(65 + (num % 26)))
    ))

    // 合計値
    const totalValue = computed(() => (
      n.value ? state.numbers.reduce((acc, cur) => acc + cur) : 0
    ))

    // 偏差の合計
    const totalDeviation = computed(() => (
      n.value ? deviation.value.reduce((acc, cur) => acc + cur, 0) : 0
    ))

    // 平均値 μx
    const average = computed(() => n.value ? totalValue.value / n.value : null)

    // 中央値 m
    const median = computed(() => {
      if (n.value === 0) return null
      const idx = Math.floor(n.value / 2)
      const arr = sortedData.value
      return n.value % 2 ? arr[idx] : (arr[idx - 1] + arr[idx]) / 2
    })

    // 最頻値
    const mode = computed(() => {
      if (n.value === 0) return null
      const arr: { value: number, count: number }[] = []
      const data = sortedData.value.reduce((acc, cur) => {
        const same = acc.find(obj => obj.value === cur)
        if (same) {
          same.count++
        } else {
          acc.push({ value: cur, count: 1 })
        }
        return acc
      }, arr)
      data.sort((a, b) => b.count - a.count)
      const count = data[0].count
      const arr2 = data.filter(obj => obj.count === count).map(obj => obj.value)
      return arr2.length === 1 ? arr2[0] : arr2
    })

    // 偏差 xi - μx
    const deviation = computed(() => (
      state.numbers.map(n => n - (average.value as number))
    ))

    // 分散 s^2
    const variance = computed(() => (
      n.value ? deviation.value.reduce((acc, cur) => acc + Math.pow(cur, 2), 0) / n.value : null
    ))

    // 標準偏差 (s | σx)
    const standardDeviation = computed(() => variance.value === null ? null : Math.sqrt(variance.value))

    // 偏差値
    const deviationValue = computed(() => (
      deviation.value.map(num => {
        switch (standardDeviation.value) {
        case null : return null
        case 0    : return state.normAverage
        default   : return (num / standardDeviation.value) * state.normStandardDeviation + state.normAverage
        }
      })
    ))

    const display = computed(() => ({
      labels: labels.value,
      numbers: state.numbers,
      sortedData: sortedData.value,
      deviation: deviation.value.map(n => round(n, 1)),
      deviationValue: deviationValue.value.map(n => round(n, 0)),
      totalValue: round(totalValue.value),
      totalDeviation: round(totalDeviation.value),
      average: round(average.value),
      median: round(median.value),
      n: n.value,
      mode: mode.value,
      variance: round(variance.value),
      standardDeviation: round(standardDeviation.value),
    }))

    const inputRef = ref<InstanceType<typeof AppInputText> | null>(null)

    const submit = () => {
      const input = state.input.trim()
      // inputRef.value?.focus()

      if (isNumeric(input)) {
        state.numbers.push(Number(input))
        state.input = ''
      }
    }

    const eventListener = {
      [MOUSE_TOUCH_EVENT.START + 'Prevent']: submit,
    }

    return { state, display, inputRef, eventListener, isMinus, submit }
  },
})
</script>

<style lang="scss">
html, body {
  // width: 100%;
  // height: 100%;
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

fieldset {
  display: inline-block;
  min-width: 180px;
  padding: 8px;
  margin-top: 8px;
  margin-right: 8px;
  color: #60627a;
  border-color: #60627a;
}

legend {
  padding: 0 8px;
  color: black;
}

#top {
  width: 100%;
  height: 100%;
  padding: 5px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  @include overflowScrolling;

  > fieldset {
    width: auto;
    height: auto;
  }
}

table {
  table-layout: fixed;
  border-collapse: collapse;

  .heading {
    background: #d4edF8;
  }
  .empty {
    width: 1px;
    padding: 0;
    padding-left: 1px;
  }
  .slash {
    background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHN0eWxlPSJ3aWR0aDoxMDAlO2hlaWdodDoxMDAlOyI+PGxpbmUgeDE9IjEwMCUiIHkxPSIwJSIgeDI9IjAlIiB5Mj0iMTAwJSIgc3R5bGU9InN0cm9rZTogIzMzMzMzMztzdHJva2Utd2lkdGg6IDE7Ij48L2xpbmU+PC9zdmc+');
  }
  th {
    padding: 2px 8px;
    white-space: nowrap;
    border: 2px solid #60627a;
  }
  th:first-child {
    width: 70px;
  }
  th:last-child {
    width: 60px;
  }
  td {
    box-sizing: border-box;
    padding: 3px 8px;
    text-align: center;
    border: 2px solid #60627a;
  }
  td.minus {
    color: #db7584;
  }
}

.chart {
  margin-top: 16px;
}

label {
  display: flex;
  flex-wrap: nowrap;
  align-content: center;
  align-items: center;
  justify-content: flex-start;

  > span {
    display: block;
    flex-shrink: 0;
    width: 65px;
    color: black;
    text-align: center;
    white-space: nowrap;
  }

  > .box {
    display: flex;
    flex-direction: row;
    flex-shrink: 1;
    align-content: center;
    align-items: center;
    width: 100%;
    max-width: 300px;
    margin-top: 8px;

    .input {
      width: 100%;
    }
    .button {
      width: 150px;
      margin-left: 8px;
    }
  }
}
</style>
