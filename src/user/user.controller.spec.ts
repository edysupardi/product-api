import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RoleGuard } from '../common/guards/role.guard';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  const mockUserService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: UserService, useValue: mockUserService },
      ],
    })
      .overrideGuard(RoleGuard) // Mocking RoleGuard
      .useValue({})
      .compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = [{ id: 1, username: 'testuser' }];
      mockUserService.findAll.mockResolvedValue(result);

      const response = await userController.findAll();
      expect(response).toEqual(result);
      expect(mockUserService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      const result = { id: 1, username: 'testuser' };
      mockUserService.findOne.mockResolvedValue(result);

      const response = await userController.findOne(1);
      expect(response).toEqual(result);
      expect(mockUserService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const password = process.env.TEST_USER_PASSWORD || 'defaultPassword';
      const createUserDto: CreateUserDto = {
        username: 'useradmin', password: password,
        email: '',
        roleId: 0
      };
      mockUserService.create.mockResolvedValue(createUserDto);

      const response = await userController.create(createUserDto);
      expect(response).toEqual(createUserDto);
      expect(mockUserService.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('update', () => {
    it('should update an existing user', async () => {
      const updateUserDto: UpdateUserDto = { username: 'updateduser' };
      mockUserService.update.mockResolvedValue(updateUserDto);

      const response = await userController.update(1, updateUserDto);
      expect(response).toEqual(updateUserDto);
      expect(mockUserService.update).toHaveBeenCalledWith(1, updateUserDto);
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      const request = { user: { id: 1 } }; // Mock request object
      mockUserService.delete.mockResolvedValue({ success: true });

      const response = await userController.delete(1, request);
      expect(response).toEqual({ success: true });
      expect(mockUserService.delete).toHaveBeenCalledWith(1, request);
    });
  });
});
