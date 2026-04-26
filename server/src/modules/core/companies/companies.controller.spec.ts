import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';

const mockCompaniesService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('CompaniesController', () => {
  let controller: CompaniesController;
  let service: typeof mockCompaniesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesController],
      providers: [
        {
          provide: CompaniesService,
          useValue: mockCompaniesService,
        },
      ],
    }).compile();

    controller = module.get<CompaniesController>(CompaniesController);
    service = module.get(CompaniesService) as any;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call create method', async () => {
    const dto = { name: 'Test' };
    service.create.mockResolvedValue({ id: 1, ...dto });

    const result = await controller.create(dto as any);
    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual({ id: 1, name: 'Test' });
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
    const company = { id: 1, name: 'Test' };
    service.findOne.mockResolvedValue(company);

    const result = await controller.findOne(1);
    expect(service.findOne).toHaveBeenCalledWith(1);
    expect(result).toEqual(company);
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
