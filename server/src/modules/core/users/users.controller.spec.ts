import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const mockUsersService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('UsersController', () => {
  let controller: UsersController;
  let service: typeof mockUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call create method', async () => {
    const dto = {
      name: 'Test',
      email: 'test@test.com',
      password: 'abc',
      companyId: 1,
    };
    service.create.mockResolvedValue({
      id: 1,
      name: 'Test',
      email: 'test@test.com',
    });

    const result = await controller.create(dto as any);
    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual({ id: 1, name: 'Test', email: 'test@test.com' });
  });

  it('should call findAll method', async () => {
    const response = {
      data: [],
      meta: { total: 0, page: 1, limit: 10, totalPages: 0 },
    };
    service.findAll.mockResolvedValue(response);

    const result = await controller.findAll(1, 10, undefined, undefined);
    expect(service.findAll).toHaveBeenCalledWith(1, 10, undefined, undefined);
    expect(result).toEqual(response);
  });

  it('should call findOne method', async () => {
    const user = { id: 1, name: 'Test' };
    service.findOne.mockResolvedValue(user);

    const result = await controller.findOne(1);
    expect(service.findOne).toHaveBeenCalledWith(1);
    expect(result).toEqual(user);
  });

  it('should call update method', async () => {
    const dto = { name: 'Updated' };
    service.update.mockResolvedValue({ id: 1, ...dto });

    const result = await controller.update(1, dto as any);
    expect(service.update).toHaveBeenCalledWith(1, dto);
    expect(result).toEqual({ id: 1, name: 'Updated' });
  });

  it('should call remove method', async () => {
    service.remove.mockResolvedValue({ id: 1, name: 'Test' });

    const result = await controller.remove(1);
    expect(service.remove).toHaveBeenCalledWith(1);
    expect(result).toEqual({ id: 1, name: 'Test' });
  });
});
