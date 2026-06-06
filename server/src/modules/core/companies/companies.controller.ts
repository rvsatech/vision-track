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
  UseGuards,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

import { CompanyEntity } from './entities/company.entity';
import { PaginatedCompanyResponseDto } from './dto/company-response.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

import { Role } from 'src/database/generated/prisma/client';

@ApiTags('Companies')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SUPER_ADMIN)

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new company' })
  @ApiBody({ type: CreateCompanyDto })
  @ApiResponse({
    status: 201,
    description: 'Company created successfully',
    type: CompanyEntity,
  })
  @ApiResponse({ status: 409, description: 'CNPJ already exists' })
  @ApiResponse({ status: 400, description: 'Plan not found' })
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.create(createCompanyDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all companies with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'planId', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'Return paginated companies',
    type: PaginatedCompanyResponseDto,
  })
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('search') search?: string,
    @Query('planId') planId?: number,
  ) {
    return this.companiesService.findAll(page, limit, search, planId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a company by id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Return the company',
    type: CompanyEntity,
  })
  @ApiResponse({ status: 404, description: 'Company not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.companiesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a company' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateCompanyDto })
  @ApiResponse({
    status: 200,
    description: 'Company updated successfully',
    type: CompanyEntity,
  })
  @ApiResponse({ status: 404, description: 'Company not found' })
  @ApiResponse({ status: 409, description: 'CNPJ already exists' })
  @ApiResponse({ status: 400, description: 'Plan not found' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.companiesService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a company' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Company removed successfully' })
  @ApiResponse({ status: 404, description: 'Company not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.companiesService.remove(id);
  }
}