import { IsString } from 'class-validator';
import { IShift, Activity } from '../shifts.types';
import { ApiProperty } from '@nestjs/swagger';

export class ShiftsDTO implements IShift {
  constructor(shift: IShift) {
    this.id = shift.id;
    this.activity = shift.activity;
    this.start = shift.start;
    this.end = shift.end;
    this.user_id = shift.user_id;
    this.created_at = shift.created_at;
    this.updated_at = shift.updated_at;
  }

  @ApiProperty({ example: 'id', description: 'id of the shift' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'SHIFT', description: 'activity of the shift' })
  @IsString()
  activity: Activity;

  @ApiProperty({
    example: '2021-09-01T10:00:00',
    description: 'start time of the shift',
  })
  @IsString()
  start: Date | null;

  @ApiProperty({
    example: '2021-09-01T18:00:00',
    description: 'end time of the shift',
  })
  @IsString()
  end: Date | null;

  @ApiProperty({ example: 'id', description: 'id of the user' })
  @IsString()
  user_id: string;

  @ApiProperty({
    example: '2021-09-01T10:00:00',
    description: 'created time of the shift',
  })
  @IsString()
  created_at: Date;

  @ApiProperty({
    example: '2021-09-01T10:00:00',
    description: 'updated time of the shift',
  })
  @IsString()
  updated_at: Date;
}
