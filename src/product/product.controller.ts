import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, Res } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config'; // Import ConfigService

@Controller('/product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private configService: ConfigService // Inject ConfigService
  ) { }

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    console.log('Received Product:', createProductDto);
    try {
      return await this.productService.create(createProductDto);
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  // New endpoint to handle image uploads
  @Post('upload')
  @UseInterceptors(FilesInterceptor('images', 10, {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const filename = `${uuidv4()}-${file.originalname}`;
        cb(null, filename);
      },
    }),
  }))

  async uploadImages(@UploadedFiles() files: Express.Multer.File[], @Res() res: Response) {
    const isProduction = this.configService.get<string>('NODE_ENV') === 'production';
    const serverUrl = isProduction
      ? this.configService.get<string>('FRONTEND_URL_PROD')
      : this.configService.get<string>('FRONTEND_URL_DEV'); // Get the correct URL based on environment

    const uploadsDir = this.configService.get<string>('UPLOADS_DIR'); // Get the uploads directory from .env
    const urls = files.map(file => `${serverUrl}/${uploadsDir}/${file.filename}`); // Construct the full URL
    return res.json({ urls });
  }

  @Get()
  async findAll() {
    try {
      return await this.productService.findAll();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.productService.findOne(id);
    } catch (error) {
      console.error(`Error fetching product with ID ${id}:`, error);
      throw error;
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    try {
      return await this.productService.update(id, updateProductDto);
    } catch (error) {
      console.error(`Error updating product with ID ${id}:`, error);
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.productService.remove(id);
    } catch (error) {
      console.error(`Error deleting product with ID ${id}:`, error);
      throw error;
    }
  }
}
