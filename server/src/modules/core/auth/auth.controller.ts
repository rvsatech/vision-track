import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/user.decorator';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Autenticar usuário e retornar o JWT' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Login bem-sucedido e token retornado',
  })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Retornar os dados do usuário logado' })
  @ApiResponse({ status: 200, description: 'Dados do usuário autenticado' })
  @ApiResponse({ status: 401, description: 'Token inválido ou não fornecido' })
  getMe(@CurrentUser() user: any) {
    return user;
  }
}
