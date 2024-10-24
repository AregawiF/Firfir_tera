import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../dto/login.dto';
import { SignUpDto } from '../dto/signup.dto';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('signup/normal')
  signUpNormal(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    if (!signUpDto.role || signUpDto.role !== 'cook') {
      throw new UnauthorizedException('Invalid role');
    }
    signUpDto.role = ['normal'];
    return this.authService.signUp(signUpDto);
  }

  @Post('signup/cook')
  signUpCook(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    if (!signUpDto.role || signUpDto.role !== 'cook') {
      throw new UnauthorizedException('Invalid role');
    }
    signUpDto.role = ['cook'];
    return this.authService.signUp(signUpDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }
}