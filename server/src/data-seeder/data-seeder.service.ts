import { User } from '@/auth/user.entity';
import { RootConfig } from '@/config/env.validation';
import { hashString } from '@/utils/bcrypt';
import { createRandomUser } from '@/utils/fakerUtils';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DataSeederService {
  constructor(
    private readonly rootConfig: RootConfig,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.seedData();
  }

  async seedData(): Promise<void> {
    const start = performance.now();

    const { NODE_ENV } = this.rootConfig;

    const isProdEnv = NODE_ENV === 'production';
    const isStagingEnv = NODE_ENV === 'staging';

    if (isProdEnv || isStagingEnv) {
      Logger.log(
        'Seeding aborted production enviroment detected. ' + NODE_ENV,
        { time: performance.now() - start },
      );
      return;
    }

    const usersCount = await this.checkIfDataExists(this.userRepository);

    if (usersCount) {
      Logger.log('Seeding aborted, data already exists', {
        time: performance.now() - start,
      });
      return;
    }

    await this.seedUsers(100);
    await this.seedTestUsers(10);

    Logger.log('Seeding data done', { time: `${performance.now() - start}ms` });
    return;
  }

  async seedUsers(amount: number): Promise<void> {
    const start = performance.now();
    Logger.log('Seeding users...', { amount });

    const randomUsers = (await Promise.all(
      Array.from({ length: amount }, () => createRandomUser()),
    )) as unknown[] as User[];

    await this.batchInsert(this.userRepository, randomUsers, 100);

    Logger.log('Seeding users done', {
      amount,
      time: `${performance.now() - start}ms`,
    });
  }

  async seedTestUsers(amount: number): Promise<void> {
    const start = performance.now();
    Logger.log('Seeding test users...');

    const hashedpassword = await hashString('password1234');
    const newUsers = Array.from({ length: amount }, (v, i) => {
      const user = new User();
      user.username = 'testuser' + i;
      user.first_name = 'Test' + i;
      user.last_name = 'User' + i;
      user.password = hashedpassword;
      return user;
    });

    await this.batchInsert(this.userRepository, newUsers, 10);

    Logger.log('Seeding test users done', {
      time: `${performance.now() - start}ms`,
    });
  }

  private async batchInsert<T>(
    repository: Repository<T>,
    entities: T[],
    batchSize: number,
  ) {
    for (let i = 0; i < entities.length; i += batchSize) {
      const batch = entities.slice(i, i + batchSize);
      await repository.save(batch);
    }
  }

  private async checkIfDataExists<T>(
    repository: Repository<T>,
  ): Promise<boolean> {
    const count = await repository.count();
    return count > 0;
  }

  async deleteAllData(): Promise<void> {
    Logger.log('Wiping database...');
    if (this.rootConfig.NODE_ENV === 'production') {
      Logger.warn(
        'WIPING DATABASE ABORTED, PRODUCTION ENVIROMENT DETECTED.' +
          this.rootConfig.NODE_ENV,
      );

      return;
    }

    await this.userRepository.query('TRUNCATE TABLE "user" CASCADE;');
  }

  async getRandomItems<T>(
    repository: Repository<T>,
    name: string,
    amount: number,
    cat_type_id?: string,
  ): Promise<T[]> {
    const builder = repository.createQueryBuilder(name).select();

    if (cat_type_id) {
      builder.where('cat_type_id = :cat_type_id', { cat_type_id });
    }

    return await builder.orderBy('RANDOM()').limit(amount).getMany();
  }
}
