import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '@/database/prisma/prisma.service';
import { ConflictException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Role } from '@generated/prisma/client';

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashedPassword'),
}));

const mockPrismaService = {
  user: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
  },
  company: {
    findUnique: jest.fn(),
  },
};

describe('UsersService', () => {
  let service: UsersService;
  let prisma: typeof mockPrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a user successfully', async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    prisma.company.findUnique.mockResolvedValue({ id: 1 });
    const newUser = {
      id: 1,
      name: 'Test',
      email: 'test@test.com',
      companyId: 1,
      role: Role.USER,
      password: 'hashedPassword',
    };
    prisma.user.create.mockResolvedValue(newUser);

    const result = await service.create({
      name: 'Test',
      email: 'test@test.com',
      password: 'password',
      companyId: 1,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...expectedUser } = newUser;
    expect(result).toEqual(expectedUser);
    expect(prisma.user.create).toHaveBeenCalled();
    expect(bcrypt.hash).toHaveBeenCalledWith('password', 10);
  });

  it('should throw ConflictException on create if email exists', async () => {
    prisma.user.findUnique.mockResolvedValue({ id: 1, email: 'test@test.com' });

    await expect(
      service.create({
        name: 'Test',
        email: 'test@test.com',
        password: 'password',
        companyId: 1,
      }),
    ).rejects.toThrow(ConflictException);
  });

  it('should find one user successfully', async () => {
    const user = { id: 1, name: 'Test', password: 'abc' };
    prisma.user.findUnique.mockResolvedValue(user);

    const result = await service.findOne(1);
    expect(result.password).toBeUndefined();
    expect(result.name).toBe('Test');
  });

  it('should throw NotFoundException if user not found', async () => {
    prisma.user.findUnique.mockResolvedValue(null);

    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });

  it('should update a user successfully', async () => {
    const user = { id: 1, name: 'Test', email: 'test@test.com' };
    prisma.user.findUnique.mockResolvedValueOnce(user); // for findOne
    prisma.user.update.mockResolvedValue({ ...user, name: 'Updated' });

    const result = await service.update(1, { name: 'Updated' });
    expect(result.name).toBe('Updated');
  });

  it('should throw ConflictException on update if email exists', async () => {
    const user = { id: 1, name: 'Test', email: 'old@test.com' };
    prisma.user.findUnique.mockResolvedValueOnce(user); // for findOne
    prisma.user.findUnique.mockResolvedValueOnce({
      id: 2,
      email: 'new@test.com',
    }); // for email check

    await expect(
      service.update(1, { email: 'new@test.com', name: 'Test' }),
    ).rejects.toThrow(ConflictException);
  });

  it('should remove a user successfully', async () => {
    const user = { id: 1, name: 'Test', password: 'abc' };
    prisma.user.findUnique.mockResolvedValue(user);
    prisma.user.delete.mockResolvedValue(user);

    const result = await service.remove(1);
    expect(result.password).toBeUndefined();
    expect(result.name).toBe('Test');
  });
});
