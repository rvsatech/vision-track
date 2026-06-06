import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InspectionsService } from './inspections.service';
import { CreateInspectionDto } from './dto/create-inspection.dto';
import { JwtAuthGuard } from '@/modules/core/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/modules/core/auth/guards/roles.guard';
import { Roles } from '@/modules/core/auth/decorators/roles.decorator';
import { Role } from '@/database/generated/prisma/enums';

@ApiTags('Inspections')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SUPER_ADMIN, Role.ADMIN)
@Controller('inspections')
export class InspectionsController {
  constructor(
    private readonly inspectionsService: InspectionsService,
  ) { }

  @Post()
  create(
    @Body()
    createInspectionDto: CreateInspectionDto,
  ) {
    return this.inspectionsService.create(
      createInspectionDto,
    );
  }

  @Get()
  findAll() {
    return this.inspectionsService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.inspectionsService.findOne(id);
  }
}