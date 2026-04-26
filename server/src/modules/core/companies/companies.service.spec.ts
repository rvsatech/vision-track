import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesService } from './companies.service';

import {
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../../database/prisma/prisma.service';

const mockPrismaService = {
  company: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
  },
  plan: {
    findUnique: jest.fn(),
  },
};

describe('CompaniesService', () => {
  let service: CompaniesService;
  let prisma: typeof mockPrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompaniesService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<CompaniesService>(CompaniesService);
    prisma = module.get(PrismaService) as any;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a company successfully', async () => {
    prisma.company.findUnique.mockResolvedValue(null);
    prisma.plan.findUnique.mockResolvedValue({ id: 1 });
    const newCompany = { id: 1, name: 'Test', cnpj: '123', planId: 1 };
    prisma.company.create.mockResolvedValue(newCompany);

    const result = await service.create({
      name: 'Test',
      cnpj: '123',
      planId: 1,
    });
    expect(result).toEqual(newCompany);
    expect(prisma.company.create).toHaveBeenCalled();
  });

  it('should throw ConflictException on create if CNPJ exists', async () => {
    prisma.company.findUnique.mockResolvedValue({ id: 1, cnpj: '123' });

    await expect(service.create({ name: 'Test', cnpj: '123' })).rejects.toThrow(
      ConflictException,
    );
  });

  it('should find one company successfully', async () => {
    const company = { id: 1, name: 'Test' };
    prisma.company.findUnique.mockResolvedValue(company);

    const result = await service.findOne(1);
    expect(result).toEqual(company);
  });

  it('should throw NotFoundException if company not found', async () => {
    prisma.company.findUnique.mockResolvedValue(null);

    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });

  it('should update a company successfully', async () => {
    const company = { id: 1, name: 'Test', cnpj: '123' };
    prisma.company.findUnique.mockResolvedValueOnce(company); // for findOne
    prisma.company.findUnique.mockResolvedValueOnce(null); // for CNPJ check
    prisma.company.update.mockResolvedValue({ ...company, name: 'Updated' });

    const result = await service.update(1, { name: 'Updated', cnpj: '123' });
    expect(result.name).toBe('Updated');
  });

  it('should remove a company successfully', async () => {
    const company = { id: 1, name: 'Test' };
    prisma.company.findUnique.mockResolvedValue(company);
    prisma.company.delete.mockResolvedValue(company);

    const result = await service.remove(1);
    expect(result).toEqual(company);
  });
});
