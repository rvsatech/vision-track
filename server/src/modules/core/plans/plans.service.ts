import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { PrismaService } from '@/database/prisma/prisma.service';

@Injectable()
export class PlansService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPlanDto: CreatePlanDto) {
    const exists = await this.prisma.plan.findFirst({
      where: {
        name: createPlanDto.name,
      },
    });

    if (exists) {
      throw new ConflictException('Plan already exists');
    }

    return this.prisma.plan.create({
      data: createPlanDto,
    });
  }

  async findAll() {
    return this.prisma.plan.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findOne(id: number) {
    const plan = await this.prisma.plan.findUnique({
      where: { id },
    });

    if (!plan) {
      throw new NotFoundException('Plan not found');
    }

    return plan;
  }

  async update(id: number, updatePlanDto: UpdatePlanDto) {
    await this.findOne(id);

    if (updatePlanDto.name) {
      const exists = await this.prisma.plan.findFirst({
        where: {
          name: updatePlanDto.name,
          NOT: { id },
        },
      });

      if (exists) {
        throw new ConflictException('Plan already exists');
      }
    }

    return this.prisma.plan.update({
      where: { id },
      data: updatePlanDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.plan.delete({
      where: { id },
    });
  }
}