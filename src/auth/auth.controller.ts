import { Body, Controller, Get, Post } from '@nestjs/common';
import { Request } from 'express';
import { ActiveUser } from 'src/common/decorators/user.decorator';
import { User_Interface } from 'src/common/interfaces/user.interface';
import { Rol } from '../common/enums/rol.enum';
import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

interface RequestWithUser extends Request {
  user: {
    email: string;
    rol: string;
  };
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Registers a new user.
   * @param registerDto Data for user registration.
   * @returns Information of the registered user.
   */
  @Post('register')
  register(
    @Body()
    registerDto: RegisterDto,
  ) {
    return this.authService.register(registerDto);
  }

  /**
   * Logs in an existing user.
   * @param loginDto Data for user login.
   * @returns Information of the logged-in session.
   */
  @Post('login')
  login(
    @Body()
    loginDto: LoginDto,
  ) {
    return this.authService.login(loginDto);
  }

  /**
   * Retrieves the profile of an authenticated user.
   * @param user Authenticated user.
   * @returns User profile information.
   */
  @Get('profile')
  @Auth(Rol.USER)
  profile(@ActiveUser() user: User_Interface) {
    return this.authService.profile(user);
  }
}