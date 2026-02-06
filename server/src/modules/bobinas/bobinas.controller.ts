import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BobinasService } from './bobinas.service';
import { CreateBobinaDto } from './dto/create-bobina.dto';
import { UpdateBobinaDto } from './dto/update-bobina.dto';

@Controller('bobinas')
export class BobinasController {
  constructor(private readonly bobinasService: BobinasService) {}

  @Post()
  create(@Body() createBobinaDto: CreateBobinaDto) {
    return this.bobinasService.create(createBobinaDto);
  }

  @Get()
  findAll() {
    return this.bobinasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bobinasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBobinaDto: UpdateBobinaDto) {
    return this.bobinasService.update(+id, updateBobinaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bobinasService.remove(+id);
  }
}
