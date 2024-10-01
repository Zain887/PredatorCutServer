import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HeaderImagesService } from './header-images.service';
import { CreateHeaderImageDto } from './dto/create-header-image.dto';
import { UpdateHeaderImageDto } from './dto/update-header-image.dto';

@Controller('header-images')
export class HeaderImagesController {
  constructor(private readonly headerImagesService: HeaderImagesService) {}

  @Post()
  create(@Body() createHeaderImageDto: CreateHeaderImageDto) {
    return this.headerImagesService.create(createHeaderImageDto);
  }

  @Get()
  findAll() {
    return this.headerImagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.headerImagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHeaderImageDto: UpdateHeaderImageDto) {
    return this.headerImagesService.update(+id, updateHeaderImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.headerImagesService.remove(+id);
  }
}
