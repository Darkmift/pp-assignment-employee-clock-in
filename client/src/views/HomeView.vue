<script setup lang="ts">
import { useAppStore } from '@/stores/shift'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
const store = useAppStore()
const user = computed(() => store.user)

const signOff = () => store.makeShift('clockOff')
const signOn = () => store.makeShift('clockIn')
const breakStart = () => store.makeShift('breakStart')
const breakEnd = () => store.makeShift('breakEnd')

const messages = {
  he: {
    message: {
      personalArea: 'איזור אישי'
    }
  }
}
const { t } = useI18n({
  messages,
  locale: 'he',
  fallbackLocale: 'en'
})
</script>

<template>
  <div class="dashboard">
    <h1>{{ t('message.personalArea') }}</h1>
    <div class="buttons">
      <button @click="signOn" v-if="store.shiftActive">Sign off</button>
      <button @click="signOff" v-else>Sign in</button>
      <span v-if="store.shiftActive">
        <button @click="breakStart" v-if="store.status !== 'breakEnd'">Break Start</button>
        <button @click="breakEnd" v-else>Break End</button>
      </span>
    </div>

    <div class="shifts-table">
      <table>
        <thead>
          <tr>
            <th>Shift</th>
            <th>Start</th>
            <th>End</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="shift in store.shifts" :key="shift.id">
            <td>{{ shift.id }}</td>
            <td>{{ shift.start }}</td>
            <td>{{ shift.end }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
