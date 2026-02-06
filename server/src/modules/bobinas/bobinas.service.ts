import { Injectable } from '@nestjs/common';
import { CreateBobinaDto } from './dto/create-bobina.dto';
import { UpdateBobinaDto } from './dto/update-bobina.dto';

@Injectable()
export class BobinasService {
  create(createBobinaDto: CreateBobinaDto) {
    return 'This action adds a new bobina';
  }

  findAll() {
    return `This action returns all bobinas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bobina`;
  }

  update(id: number, updateBobinaDto: UpdateBobinaDto) {
    return `This action updates a #${id} bobina`;
  }

  remove(id: number) {
    return `This action removes a #${id} bobina`;
  }
}
