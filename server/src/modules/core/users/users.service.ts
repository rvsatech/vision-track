import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from '@/modules/core/users/dto/create-user.dto';
import { UpdateUserDto } from '@/modules/core/users/dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../../database/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // =========================
  // UTIL
  // =========================
  private excludePassword(user: any) {
    if (!user) return user;
    const { password, ...rest } = user;
    return rest;
  }

  // =========================
  // CREATE USER (MVP SAFE)
  // =========================
  async create(dto: CreateUserDto) {
    const company = await this.prisma.company.findUnique({
      where: { id: dto.companyId },
    });

    if (!company) {
      throw new BadRequestException('Company not found');
    }

    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
        role: dto.role,
        companyId: dto.companyId,
      },
    });

    return this.excludePassword(user);
  }

  // =========================
  // FIND ALL (SCOPED BY COMPANY)
  // =========================
  async findAll(
    companyId: number,
    page: number = 1,
    limit: number = 10,
    search?: string,
  ) {
    const skip = (page - 1) * limit;

    const where: any = {
      companyId, // 🔥 MVP MULTI-TENANT LOCK
    };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: Number(limit),
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      data: data.map((u) => this.excludePassword(u)),
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // =========================
  // FIND ONE (SAFE SCOPED)
  // =========================
  async findOne(id: number, companyId: number) {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
        companyId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.excludePassword(user);
  }

  // =========================
  // UPDATE (SCOPED)
  // =========================
  async update(id: number, companyId: number, dto: UpdateUserDto) {
    await this.findOne(id, companyId);

    if (dto.email) {
      const existing = await this.prisma.user.findFirst({
        where: {
          email: dto.email,
          companyId,
        },
      });

      if (existing && existing.id !== id) {
        throw new ConflictException('Email already exists');
      }
    }

    let password: string | undefined;

    if (dto.password) {
      password = await bcrypt.hash(dto.password, 10);
    }

    const user = await this.prisma.user.update({
      where: { id },
      data: {
        name: dto.name,
        email: dto.email,
        role: dto.role,
        password: password ?? undefined,
      },
    });

    return this.excludePassword(user);
  }

  // =========================
  // REMOVE (SCOPED)
  // =========================
  async remove(id: number, companyId: number) {
    await this.findOne(id, companyId);

    const user = await this.prisma.user.delete({
      where: { id },
    });

    return this.excludePassword(user);
  }
}