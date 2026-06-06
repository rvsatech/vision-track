import { Module } from '@nestjs/common';
import { InspectionsService } from './inspections.service';
import { InspectionsController } from './inspections.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [InspectionsController],
  providers: [InspectionsService],
  imports: [HttpModule],
})
export class InspectionsModule {}
