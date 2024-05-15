import { ApiProperty } from '@nestjs/swagger';
import { ILoginParams, ILoginResult } from '../auth.types';
import { IsAlphanumeric, IsString, Length } from 'class-validator';
import { User } from '../user.entity';

export class LoginResultDto implements ILoginResult {
  constructor(loginResult: ILoginResult) {
    this.token = loginResult.token;
    this.natid = loginResult.natid;
    this.id = loginResult.id;
    this.lastname = loginResult.lastname;
    this.firstname = loginResult.firstname;
  }

  @ApiProperty({ example: 'id', description: 'last name of the user' })
  id: string;

  @ApiProperty({ example: 'token', description: 'last name of the user' })
  token: string;

  @ApiProperty({ example: 'natid', description: 'last name of the user' })
  natid: string;

  @ApiProperty({ example: 'Dunham', description: 'last name of the user' })
  lastname: string;

  @ApiProperty({ example: 'Jeff', description: 'First name of the user' })
  firstname: string;
}

// class register
export class RegisterParamsDto {
  constructor(registerResult: User) {
    this.natid = registerResult.natid;
    this.id = registerResult.id;
    this.last_name = registerResult.last_name;
    this.first_name = registerResult.first_name;
  }

  //id
  @ApiProperty({ example: 'id', description: 'last name of the user' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'Jeff', description: 'First name of the user' })
  @IsString()
  @Length(2, 20)
  first_name: string;

  @ApiProperty({ example: 'Dunham', description: 'last name of the user' })
  @IsString()
  @Length(2, 20)
  last_name: string;

  @ApiProperty({ example: 'jeffPhapha', description: 'natid of the user' })
  @IsString()
  @IsAlphanumeric()
  @Length(4, 20)
  natid: string;

  @ApiProperty({ example: 'password', description: 'password of the user' })
  @IsString()
  @Length(8, 32)
  password: string;
}

export class LoginParamsDto implements ILoginParams {
  @ApiProperty({ example: 'jeffPhapha', description: 'natid of the user' })
  @IsString()
  @IsAlphanumeric()
  @Length(4, 20)
  natid: string;

  @ApiProperty({ example: 'password', description: 'password of the user' })
  @IsString()
  @Length(8, 32)
  password: string;
}
