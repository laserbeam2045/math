import { App, ObjectDirective, FunctionDirective } from 'vue'

/**
 * 公式ドキュメントはこちらです
 * https://v3.ja.vuejs.org/api/application-api.html#directive
 */

/**
 * カスタムディレクティブを設定する関数
 * @param vm Vueインスタンス
 */
export default function registerCustomDirectives(vm: App<Element>): void {
  for (const directiveName in customDirectives) {
    const directive = customDirectives[directiveName]
    vm.directive(directiveName, directive)
  }
}

type TypeObject<T> = {
  [key: string]: T
}

// type OptionalDirective = {
//   created?      : (el: HTMLElement, binding: Binding) => void
//   beforeMount?  : (el: HTMLElement, binding: Binding) => void
//   mounted?      : (el: HTMLElement, binding: Binding) => void
//   beforeUpdate? : (el: HTMLElement, binding: Binding) => void
//   updated?      : (el: HTMLElement, binding: Binding) => void
//   beforeUnmount?: (el: HTMLElement, binding: Binding) => void
//   unmounted?    : (el: HTMLElement, binding: Binding) => void
// }

// type Binding = {
//   instance? : DefineComponent<Element>
//   value?    : any
//   oldValue? : any
//   arg?      : any
//   modifiers?: TypeObject<boolean>
//   dir?      : OptionalDirective
// }

const customDirectives: TypeObject<ObjectDirective<HTMLElement, any> | FunctionDirective<HTMLElement, any>> = {
  /**
   * position: fixedで固定する
   * v-pin:[direction]="pinPadding"
   */
  'pin': (el, { arg, value }) => {
    const s: any = arg || 'top'
    el.style[s] = value + 'px'
    el.style.position = 'fixed'
  },

  /**
   * mount時に自動的にfocusするディレクティブ
   * v-focus[="callbackFunction"]
   */
  'focus': {
    mounted (el, binding) {
      el.focus()
      binding?.value(el)
    },
  },

  /**
   * position: absoluteで中央配置にする
   * v-center             縦横中央配置
   * v-center:vertical    上下中央配置
   * v-center:horizontal  左右中央配置
   */
  'center': {
    mounted (el, { arg }) {
      const doc = document.documentElement
      el.style.position = 'absolute'

      if (arg === 'vertical' || !arg) {
        const top = Math.floor((doc.offsetHeight - el.offsetHeight) / 2)
        el.style.top = top + 'px'
      }
      if (arg === 'horizontal' || !arg) {
        const left = Math.floor((doc.offsetWidth - el.offsetWidth) / 2)
        el.style.left = left + 'px'
      }
    },
  },
}
