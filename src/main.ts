import { createApp } from 'vue'
import App from './App.vue'

// FIXME: viteはwebpackを使用しないため違うアプローチが必要
// import registerGlobalComponents from './plugins/global-components'
import registerCustomDirectives from './plugins/custom-directives'

const vm = createApp(App)

// registerGlobalComponents(vm)
registerCustomDirectives(vm)

vm.mount('#app')
