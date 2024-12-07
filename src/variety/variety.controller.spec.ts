import { Test, TestingModule } from '@nestjs/testing';
import { VarietyController } from './variety.controller';
import { VarietyService } from './variety.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RoleGuard } from '../common/guards/role.guard';

describe('VarietyController', () => {
  let varietyController: VarietyController;
  let varietyService: VarietyService;

  const mockVarietyService = {
    findAll: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VarietyController],
      providers: [
        { provide: VarietyService, useValue: mockVarietyService },
      ],
    })
      .overrideGuard(JwtAuthGuard) // Mocking guards
      .useValue({})
      .overrideGuard(RoleGuard)
      .useValue({})
      .compile();

    varietyController = module.get<VarietyController>(VarietyController);
    varietyService = module.get<VarietyService>(VarietyService);
  });

  describe('findAll', () => {
    it('should return an array of varieties', async () => {
      const result = [{ id: 1, name: 'Variety 1' }];
      mockVarietyService.findAll.mockResolvedValue(result);

      const response = await varietyController.findAll('10', '0', 'id', 'ASC');
      expect(response).toEqual(result);
      expect(mockVarietyService.findAll).toHaveBeenCalledWith(10, 0, 'id', 'ASC');
    });
  });

  describe('create', () => {
    it('should create a new variety', async () => {
      const varietyData = { name: 'New Variety' };
      mockVarietyService.create.mockResolvedValue(varietyData);

      const response = await varietyController.create(varietyData);
      expect(response).toEqual(varietyData);
      expect(mockVarietyService.create).toHaveBeenCalledWith(varietyData);
    });
  });
});
