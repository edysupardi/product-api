import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let response: Response;

  const mockAuthService = {
    login: jest.fn(),
    logout: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    response = {
      send: jest.fn(),
    } as unknown as Response; // Mocking Response object
  });

  describe('login', () => {
    it('should call authService.login and send response', async () => {
      const loginDto: LoginDto = { username: 'testuser', password: 'testpass' };
      mockAuthService.login = jest.fn().mockResolvedValue(undefined); // Mocking login method

      await authController.login(loginDto, response);

      expect(authService.login).toHaveBeenCalledWith(loginDto, response);
      expect(response.send).toHaveBeenCalled();
    });
  });

  describe('logout', () => {
    it('should call authService.logout and send response', async () => {
      mockAuthService.logout = jest.fn().mockResolvedValue(undefined); // Mocking logout method

      await authController.logout(response);

      expect(authService.logout).toHaveBeenCalledWith(response);
      expect(response.send).toHaveBeenCalled();
    });
  });
});
