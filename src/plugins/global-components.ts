import { App } from 'vue'

/**
 * 基底(ファイル名にAppを含む)コンポーネントをグローバル化する
 * @param vm Vueインスタンス
 */
export default function registerGlobalComponents(vm: App<Element>): void {
  const requireComponents = require.context('../components/', true, /App[A-Z]\w+\.(vue|js)$/)

  requireComponents.keys().forEach((fileName: string) => {
    let AppConfig = requireComponents(fileName)
    AppConfig = AppConfig.default || AppConfig
    const AppName = AppConfig.name || (
      fileName
        .replace(/^.+\//, '')
        .replace(/\.\w+$/, '')
    )
    vm.component(AppName, AppConfig)
  })
}
