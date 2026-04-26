import { PrismaService } from '../../../database/prisma/prisma.service';
import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompaniesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCompanyDto) {
    if (dto.cnpj) {
      const existing = await this.prisma.company.findUnique({
        where: { cnpj: dto.cnpj },
      });
      if (existing) {
        throw new ConflictException('CNPJ already exists');
      }
    }

    if (dto.planId) {
      const plan = await this.prisma.plan.findUnique({
        where: { id: dto.planId },
      });
      if (!plan) {
        throw new BadRequestException('Plan not found');
      }
    }

    return this.prisma.company.create({
      data: dto,
      include: { plan: true },
    });
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    search?: string,
    planId?: number,
  ) {
    const skip = (page - 1) * limit;
    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { cnpj: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (planId) {
      where.planId = Number(planId);
    }

    const [data, total] = await Promise.all([
      this.prisma.company.findMany({
        where,
        skip,
        take: Number(limit),
        include: { plan: true },
      }),
      this.prisma.company.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const company = await this.prisma.company.findUnique({
      where: { id },
      include: { plan: true },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    return company;
  }

  async update(id: number, dto: UpdateCompanyDto) {
    await this.findOne(id);

    if (dto.cnpj) {
      const existing = await this.prisma.company.findUnique({
        where: { cnpj: dto.cnpj },
      });
      if (existing && existing.id !== id) {
        throw new ConflictException('CNPJ already exists');
      }
    }

    if (dto.planId) {
      const plan = await this.prisma.plan.findUnique({
        where: { id: dto.planId },
      });
      if (!plan) {
        throw new BadRequestException('Plan not found');
      }
    }

    return this.prisma.company.update({
      where: { id },
      data: dto,
      include: { plan: true },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.company.delete({
      where: { id },
    });
  }
}
