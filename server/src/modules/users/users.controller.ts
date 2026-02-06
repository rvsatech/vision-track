// users.controller.ts
import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'generated/prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAll(): Promise<User[]> {
    return this.usersService.getAll();
  }
}
