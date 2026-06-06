import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CreateInspectionDto } from './dto/create-inspection.dto'
import { InspectionStatus } from 'src/database/generated/prisma/client';
import { PrismaService } from '@/database/prisma/prisma.service';

@Injectable()
export class InspectionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly http: HttpService,
  ) {}

  async create(createInspectionDto: CreateInspectionDto) {
    const response = await this.http.axiosRef.post(
      process.env.ROBOFLOW_URL!,
      {
        api_key: process.env.ROBOFLOW_API_KEY,
        inputs: {
          image: {
            type: 'url',
            value: createInspectionDto.imageUrl,
          },
        },
      },
    );

    return this.prisma.inspection.create({
      data: {
        companyId: 1,
        status: InspectionStatus.SUCCESS,
        resultJson: response.data,
      },
    });
  }

  findAll() {
    return this.prisma.inspection.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number) {
    const inspection = await this.prisma.inspection.findUnique({
      where: { id },
    });

    if (!inspection) {
      throw new NotFoundException('Inspection not found');
    }

    return inspection;
  }
}