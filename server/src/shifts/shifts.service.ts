import { User } from '@/auth/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shift } from './shift.entity';

@Injectable()
export class ShiftsService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    // inject shifts
    @InjectRepository(Shift)
    private shiftRepository: Repository<Shift>,
  ) {}
  async getAllShiftsForUser(natid: string) {
    const results = await this.shiftRepository.find({
      where: { user: { natid } },
      order: { start: 'DESC' },
    });
    return await this.resultsToDto(results);
  }
  async createShift(shift: Shift) {
    const result = await this.shiftRepository.save(shift);
    return await this.resultToDto(result);
  }

  async resultToDto(result: Shift) {
    return {
      id: result.id,
      activity: result.activity,
      start: result.start,
      end: result.end,
      user_id: result.user.id,
      created_at: result.created_at,
      updated_at: result.updated_at,
    };
  }

  async resultsToDto(results: Shift[]) {
    return results.map((result) => this.resultToDto(result));
  }
}
