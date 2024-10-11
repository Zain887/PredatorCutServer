import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { HeaderImagesService } from './header-images.service';
import { CreateHeaderImageDto } from './dto/create-header-image.dto';
import { UpdateHeaderImageDto } from './dto/update-header-image.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/header-images')
export class HeaderImagesController {
  constructor(private readonly headerImagesService: HeaderImagesService) { }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() createHeaderImageDto: CreateHeaderImageDto
  ) {
    const url = await this.headerImagesService.saveFile(file); // Save the file and get the URL
    createHeaderImageDto.url = url; // Set the URL in the DTO

    return this.headerImagesService.create(createHeaderImageDto); // Create the record in the database
  }

  @Get()
  async findAll() {
    return await this.headerImagesService.findAll(); // Get all header images
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.headerImagesService.findOne(id); // Get a specific header image by ID
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateHeaderImageDto: UpdateHeaderImageDto) {
    return await this.headerImagesService.update(id, updateHeaderImageDto); // Update a header image
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.headerImagesService.remove(id); // Delete a header image
  }
}
