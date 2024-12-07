import { Test, TestingModule } from '@nestjs/testing';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RoleGuard } from '../common/guards/role.guard';

describe('RoleController', () => {
  let roleController: RoleController;
  let roleService: RoleService;

  const mockRoleService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleController],
      providers: [
        { provide: RoleService, useValue: mockRoleService },
      ],
    })
      .overrideGuard(JwtAuthGuard) // Mocking guards
      .useValue({})
      .overrideGuard(RoleGuard)
      .useValue({})
      .compile();

    roleController = module.get<RoleController>(RoleController);
    roleService = module.get<RoleService>(RoleService);
  });

  describe('findAll', () => {
    it('should return an array of roles', async () => {
      const result = [{ id: 1, name: 'Admin' }];
      mockRoleService.findAll.mockResolvedValue(result);

      const response = await roleController.findAll();
      expect(response).toEqual(result);
      expect(mockRoleService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single role', async () => {
      const result = { id: 1, name: 'Admin' };
      mockRoleService.findOne.mockResolvedValue(result);

      const response = await roleController.findOne(1);
      expect(response).toEqual(result);
      expect(mockRoleService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('create', () => {
    it('should create a new role', async () => {
      const roleData = { name: 'User' };
      mockRoleService.create.mockResolvedValue(roleData);

      const response = await roleController.create(roleData);
      expect(response).toEqual(roleData);
      expect(mockRoleService.create).toHaveBeenCalledWith(roleData);
    });
  });

  describe('update', () => {
    it('should update an existing role', async () => {
      const roleData = { name: 'Updated Role' };
      mockRoleService.update.mockResolvedValue(roleData);

      const response = await roleController.update(1, roleData);
      expect(response).toEqual(roleData);
      expect(mockRoleService.update).toHaveBeenCalledWith(1, roleData);
    });
  });

  describe('delete', () => {
    it('should delete a role', async () => {
      mockRoleService.delete.mockResolvedValue({ success: true });

      const response = await roleController.delete(1);
      expect(response).toEqual({ success: true });
      expect(mockRoleService.delete).toHaveBeenCalledWith(1);
    });
  });
});
