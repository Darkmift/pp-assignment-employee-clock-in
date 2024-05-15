// i18n.js
import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    message: {
      title: 'היי'
    }
  }
}

const i18n = createI18n({
  locale: 'he', // set locale
  fallbackLocale: 'he', // set fallback locale
  messages // set locale messages
})

export default i18n
