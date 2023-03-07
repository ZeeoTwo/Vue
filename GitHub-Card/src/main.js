import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
// import axios from 'axios'
// import VueAxios from 'vue-axios'

import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

const app = createApp(App)

// app.use(VueAxios, axios)
app.use(PrimeVue);


app.mount('#app')