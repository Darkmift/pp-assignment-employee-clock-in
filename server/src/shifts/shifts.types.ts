export enum Activity {
  SHIFT = 'SHIFT',
  BREAK = 'BREAK',
}

export interface IShift {
  id: string;
  activity: Activity;
  start: Date | null;
  end: Date | null;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}
