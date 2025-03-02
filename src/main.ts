import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fas, far, fab);

declare global {
    interface Window {
        kakao: any
    }
    const kakao: any;
}

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon);

//app.use(axios);
app.use(createPinia())
app.use(router)
app.mount('#app')
