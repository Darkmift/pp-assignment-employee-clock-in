import { defineStore } from 'pinia'
import { type IUser, type IShift, Activity, type ICreateShift } from '@/types'
import { login, register, getAllShifts, createShift } from '@/client/index'

type State = {
  user: IUser | null
  shifts: IShift[]
  status: 'clockOff' | 'clockIn' | 'breakStart' | 'breakEnd'
  shiftActive: boolean
  error: string | null
  isLoading: boolean
}
const initialState: State = {
  user: null,
  shifts: [],
  error: null,
  shiftActive: false,
  isLoading: false,
  status: 'clockOff'
}

export const useAppStore = defineStore({
  id: 'appStore',
  state: () => initialState,
  actions: {
    //login
    async login(natid: string, password: string) {
      try {
        this.isLoading = true
        const response = await login(natid, password)

        this.user = response.natid ? response : null
        this.shiftActive = this.user ? true : false
        this.isLoading = false
      } catch (error) {
        this.error = (error as Error).message
      } finally {
        this.isLoading = false
      }
    },
    //makeshift
    async makeShift(status: 'clockOff' | 'clockIn' | 'breakStart' | 'breakEnd') {
      try {
        this.status = status
        if (!this.user) throw new Error('User not logged in')
        const shiftActionMap = {
          clockOff: { actions: Activity.SHIFT, start: null, end: new Date() },
          clockIn: { actions: Activity.SHIFT, start: new Date(), end: null },
          breakStart: { actions: Activity.BREAK, start: new Date(), end: null },
          breakEnd: { actions: Activity.BREAK, start: null, end: new Date() }
        }
        const shift: ICreateShift = {
          user_id: this.user?.natid,
          activity: shiftActionMap[this.status].actions,
          start: shiftActionMap[this.status].start,
          end: shiftActionMap[this.status].end
        }
        this.isLoading = true
        const response = await createShift(shift)
        this.shifts.push(response)
        if (this.status === 'clockOff') {
          this.shiftActive = false
          this.user = null
        }
      } catch (error) {
        this.error = (error as Error).message
      } finally {
        this.isLoading = false
      }
    },
    //register
    async register(user: IUser) {
      try {
        this.isLoading = true
        const response = await register(user)
        this.user = response.natid ? response : null
        this.isLoading = false
      } catch (error) {
        this.error = (error as Error).message
      } finally {
        this.isLoading = false
      }
    },
    //get all shifts
    async getAllShifts(natid: string) {
      try {
        this.isLoading = true
        const response = await getAllShifts(natid)
        this.shifts = response
        this.isLoading = false
      } catch (error) {
        this.error = (error as Error).message
      } finally {
        this.isLoading = false
      }
    }
  }
})
