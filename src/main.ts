import { createApp } from "vue"
import { createPinia } from "pinia"

import App from "./App.vue"
import router from "./router"
//import { i18n } from "./plugins/i18n"

import "./assets/styles/main.css"
import "@toast-ui/editor/dist/toastui-editor.css"

import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { far } from "@fortawesome/free-regular-svg-icons"
import { fas } from "@fortawesome/free-solid-svg-icons"
import { fab } from "@fortawesome/free-brands-svg-icons"

library.add(fas, far, fab)

async function bootstrap() {
  const app = createApp(App)
  app.component("font-awesome-icon", FontAwesomeIcon)

  const pinia = createPinia()
  app.use(pinia)
  app.use(router)
  //app.use(i18n)
  app.mount("#app")

}

bootstrap()
