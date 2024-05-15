import { Module } from '@nestjs/common';
import { DataSeederService } from './data-seeder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/auth/user.entity';

@Module({
  providers: [DataSeederService],
  imports: [TypeOrmModule.forFeature([User])],
})
export class DataSeederModule {}
