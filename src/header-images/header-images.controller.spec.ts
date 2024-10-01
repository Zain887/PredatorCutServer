import { Test, TestingModule } from '@nestjs/testing';
import { HeaderImagesController } from './header-images.controller';
import { HeaderImagesService } from './header-images.service';

describe('HeaderImagesController', () => {
  let controller: HeaderImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeaderImagesController],
      providers: [HeaderImagesService],
    }).compile();

    controller = module.get<HeaderImagesController>(HeaderImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
