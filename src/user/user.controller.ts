import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SignUpRequest } from './dto/request/SignUp.request';
import { SignInRequest } from './dto/request/SignIn.request';
import { TokenResponse } from './dto/response/Token.response';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { CurrentUser } from '../common/decorators/user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  public async currentUser(@CurrentUser() user): Promise<User> {
    return await this.userService.currentUser(user);
  }

  @Post()
  public async signup(@Body() body: SignUpRequest): Promise<void> {
    await this.userService.signUp(body);
  }

  @HttpCode(200)
  @Post('login')
  public async login(@Body() body: SignInRequest): Promise<TokenResponse> {
    return await this.userService.login(body);
  }
}
