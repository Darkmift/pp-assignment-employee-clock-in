import { Injectable } from '@nestjs/common';
import {
  ILoginParams,
  ILoginResult,
  IUser,
  JwtDecodedPayload,
} from './auth.types';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { compareStringToHash, hashString } from '@/utils/bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  //a fn that creates a User
  async createUser(user: IUser): Promise<User> {
    user.password = await hashString(user.password);
    return this.userRepository.save(user as unknown as User);
  }

  async getUserById(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async login(user: ILoginParams): Promise<ILoginResult> {
    const userFound = await this.userRepository.findOneBy({
      username: user.natid,
    });
    if (!userFound) {
      return null;
    }

    const isPasswordValid = await compareStringToHash(
      user.password,
      userFound.password,
    );
    if (!isPasswordValid) {
      return null;
    }
    const payload: JwtDecodedPayload = {
      natid: user.natid,
      id: userFound.id,
      first_name: userFound.first_name,
      last_name: userFound.last_name,
    };
    const token = await this.jwtService.signAsync(payload);

    return {
      id: userFound.id,
      token,
      firstname: userFound.first_name,
      lastname: userFound.last_name,
      natid: userFound.natid,
    };
  }
}
