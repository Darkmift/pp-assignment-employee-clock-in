export interface ILoginParams {
  natid: string
  password: string
}

export interface ILoginResult {
  id: string
  token: string
  natid: string
  lastname: string
  firstname: string
}

export interface IUser {
  first_name: string
  last_name: string
  natid: string
  password: string
}

export interface JwtDecodedPayload {
  natid: string
  id: string
  first_name: string
  last_name: string
}

// SHIFTS
export enum Activity {
  SHIFT = 'SHIFT',
  BREAK = 'BREAK'
}

export interface ICreateShift {
  activity: Activity
  start: Date | null
  end: Date | null
  user_id: string
}
export interface IShift extends ICreateShift {
  id?: string
  activity: Activity
  start: Date | null
  end: Date | null
  user_id: string
  created_at: Date
  updated_at: Date
}
