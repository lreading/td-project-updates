import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './router'
import { installFontAwesome } from './plugins/fontawesome'

const app = createApp(App)

installFontAwesome(app)

app.use(router).mount('#app')
