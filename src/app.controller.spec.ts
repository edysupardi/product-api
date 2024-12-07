import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import MockDate from 'mockdate';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  afterEach(() => {
    MockDate.reset(); // Reset waktu mock setelah setiap test
  });

  describe('getHello', () => {
    it('should return a greeting message with the current UTC time', () => {
      MockDate.set('2024-12-07T12:15:00Z'); // Set waktu mock

      const result = appController.getHello();
      expect(result).toBe('API Product v1.0 at Sat, 07 Dec 2024 12:15:00 GMT');
    });
  });
});
