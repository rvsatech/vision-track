import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../../../database/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  hash: jest.fn().mockResolvedValue('hashedPassword'),
}));

const mockPrismaService = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
  company: {
    findUnique: jest.fn(),
  },
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('test_token'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw Unauthorized if user not found on login', async () => {
    mockPrismaService.user.findUnique.mockResolvedValue(null);
    await expect(
      service.login({ email: 'test@test.com', password: 'abc' }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should login successfully', async () => {
    const user = {
      id: 1,
      email: 'test@test.com',
      password: 'hashed',
      companyId: 1,
    };
    mockPrismaService.user.findUnique.mockResolvedValue(user);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    const result = await service.login({
      email: 'test@test.com',
      password: 'abc',
    });
    expect(result.access_token).toBe('test_token');
    expect(result.user.email).toBe('test@test.com');
  });

  it('should register successfully', async () => {
    mockPrismaService.company.findUnique.mockResolvedValue({ id: 1 });
    mockPrismaService.user.findUnique.mockResolvedValue(null);
    const newUser = { id: 1, email: 'new@test.com', password: 'hashed' };
    mockPrismaService.user.create.mockResolvedValue(newUser);

    const result = await service.register({
      email: 'new@test.com',
      password: 'abc',
      name: 'Test',
      companyId: 1,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...expected } = newUser;
    expect(result).toEqual(expected);
  });
});
