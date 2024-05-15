import {
  Body,
  Controller,
  HttpCode,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
  LoginParamsDto,
  LoginResultDto,
  RegisterParamsDto,
} from './dto/auth.index';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //register
  @ApiOperation({ summary: 'Register to app' })
  @ApiResponse({ status: 201, description: 'Created', type: LoginResultDto })
  @Post('register')
  @HttpCode(201)
  async register(@Body() body: RegisterParamsDto) {
    const result = await this.authService.createUser(body);
    return new RegisterParamsDto(result);
  }

  @ApiOperation({ summary: 'Login to app' })
  @ApiResponse({ status: 200, description: 'Ok', type: LoginResultDto })
  @Post('login')
  @HttpCode(200)
  async login(@Body() body: LoginParamsDto, @Res() response: Response) {
    const result = await this.authService.login(body);
    if (!result) {
      throw new UnauthorizedException('Invalid credentials');
    }
    response.cookie('session-token', result.token, {
      maxAge: 24 * 60 * 60 * 1000, // For example, 1 day
      sameSite: 'none',
      secure: true,
    });
    return response.send(result);
  }

  @ApiOperation({ summary: 'Logout from app' })
  @ApiResponse({ status: 200, description: 'Logged out successfully' })
  @Post('logout')
  @HttpCode(200)
  logout(@Res() response: Response) {
    response.cookie('session-token', '', {
      maxAge: 0, // Expire immediately
      sameSite: 'none',
      secure: true,
    });
    return response.json({ message: 'Logged out successfully' });
  }
}
