import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

import { UserEntity } from './entities/user.entity';
import { PaginatedUserResponseDto } from './dto/user-response.dto';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // =========================
  // CREATE USER
  // =========================
  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: UserEntity,
  })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  @ApiResponse({ status: 400, description: 'Company not found' })
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  // =========================
  // LIST USERS (SCOPED)
  // =========================
  @Get()
  @ApiOperation({ summary: 'List all users with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiResponse({
    status: 200,
    description: 'Return paginated users',
    type: PaginatedUserResponseDto,
  })
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('search') search?: string,
  ) {
    const companyId = 1; // 🔥 MVP: depois vira JWT

    return this.usersService.findAll(companyId, page, limit, search);
  }

  // =========================
  // GET USER BY ID (SCOPED)
  // =========================
  @Get(':id')
  @ApiOperation({ summary: 'Get a user by id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Return the user',
    type: UserEntity,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    const companyId = 1;

    return this.usersService.findOne(id, companyId);
  }

  // =========================
  // UPDATE USER (SCOPED)
  // =========================
  @Patch(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    type: UserEntity,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  @ApiResponse({ status: 400, description: 'Company not found' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
  ) {
    const companyId = 1;

    return this.usersService.update(id, companyId, dto);
  }

  // =========================
  // DELETE USER (SCOPED)
  // =========================
  @Delete(':id')
  @ApiOperation({ summary: 'Remove a user' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'User removed successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    const companyId = 1;

    return this.usersService.remove(id, companyId);
  }
}