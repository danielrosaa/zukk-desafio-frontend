import Vue from 'vue'

import '@/styles/quasar.scss'
import lang from 'quasar/lang/pt-br.js'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import { Quasar, Notify, QSpinner, QSpinnerHourglass, QIcon } from 'quasar'

Vue.use(Quasar, {
  config: {},
  plugins: {
    Notify
  },
  components: {
    QSpinner,
    QSpinnerHourglass,
    QIcon
  },
  lang: lang
 })