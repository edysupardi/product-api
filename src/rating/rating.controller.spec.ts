import { Test, TestingModule } from '@nestjs/testing';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RoleGuard } from '../common/guards/role.guard';

describe('RatingController', () => {
  let ratingController: RatingController;
  let ratingService: RatingService;

  const mockRatingService = {
    addRating: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RatingController],
      providers: [
        { provide: RatingService, useValue: mockRatingService },
      ],
    })
      .overrideGuard(JwtAuthGuard) // Mocking guards
      .useValue({})
      .overrideGuard(RoleGuard)
      .useValue({})
      .compile();

    ratingController = module.get<RatingController>(RatingController);
    ratingService = module.get<RatingService>(RatingService);
  });

  describe('create', () => {
    it('should create a new rating', async () => {
      const req = { user: { id: 1 } }; // Mock request object
      const body = { product_id: 1, value: 5 };
      mockRatingService.addRating.mockResolvedValue(body); // Mocking the service response

      const response = await ratingController.create(req, body);
      expect(response).toEqual(body);
      expect(mockRatingService.addRating).toHaveBeenCalledWith(1, 1, 5);
    });
  });
});
