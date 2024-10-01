import { Module } from '@nestjs/common';
import { HeaderImagesService } from './header-images.service';
import { HeaderImagesController } from './header-images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeaderImage } from './entities/header-image.entity';

@Module({
  imports:[TypeOrmModule.forFeature([HeaderImage])],
  controllers: [HeaderImagesController],
  providers: [HeaderImagesService],
})
export class HeaderImagesModule {}