import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn().mockResolvedValue({ access_token: 'test_token' }),
            register: jest
              .fn()
              .mockResolvedValue({ id: 1, email: 'test@test.com' }),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call login', async () => {
    const dto = { email: 'test@test.com', password: 'abc' };
    await controller.login(dto);
    expect(service.login).toHaveBeenCalledWith(dto);
  });

  it('should call register', async () => {
    const dto = {
      email: 'test@test.com',
      password: 'abc',
      name: 'Test',
      companyId: 1,
    };
    await controller.register(dto);
    expect(service.register).toHaveBeenCalledWith(dto);
  });

  it('should return me', async () => {
    const user = { id: 1, email: 'test@test.com' };
    expect(controller.getMe(user)).toEqual(user);
  });
});
