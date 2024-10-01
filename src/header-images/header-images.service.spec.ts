import { Test, TestingModule } from '@nestjs/testing';
import { HeaderImagesService } from './header-images.service';

describe('HeaderImagesService', () => {
  let service: HeaderImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeaderImagesService],
    }).compile();

    service = module.get<HeaderImagesService>(HeaderImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
