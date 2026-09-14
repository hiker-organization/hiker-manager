import './assets/main.css'
import 'vue3-toastify/dist/index.css'

import type { ToastContainerOptions } from 'vue3-toastify'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { plugin, defaultConfig } from '@formkit/vue'

import Vue3Toastify from 'vue3-toastify'

import App from './App.vue'
import router from './router'

createApp(App) // Arquivo Raíz (Vue).
  .use(createPinia()) // Pinia (Stores).
  .use(router) // Vue Router (Gerenciamento de Rotas).
  .use(plugin, defaultConfig) // FormKit (Desenvolvimento de Formulários).
  .use(Vue3Toastify, {
    autoClose: 5000,
    theme: 'colored',
    position: 'bottom-right',
    limit: 5,
  } as ToastContainerOptions) // Vue3 Toastify (Alertas).
  .mount('#app') // Container de Carregamento (index.html).
