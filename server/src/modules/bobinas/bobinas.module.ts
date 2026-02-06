import { Module } from '@nestjs/common';
import { BobinasService } from './bobinas.service';
import { BobinasController } from './bobinas.controller';

@Module({
  controllers: [BobinasController],
  providers: [BobinasService],
})
export class BobinasModule {}
