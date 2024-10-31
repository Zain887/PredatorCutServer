import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateHeaderImageDto } from './dto/create-header-image.dto';
import { UpdateHeaderImageDto } from './dto/update-header-image.dto';
import * as fs from 'fs';
import * as path from 'path';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HeaderImage } from './entities/header-image.entity';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class HeaderImagesService {
  constructor(
    @InjectRepository(HeaderImage)
    private readonly headerImageRepository: Repository<HeaderImage>, // Inject the repository
    private readonly configService: ConfigService, // Inject ConfigService to access environment variables
  ) {}

  async saveFile(file: Express.Multer.File): Promise<string> {
    const uploadsDir = this.configService.get<string>('UPLOADS_DIR') || 'uploads'; // Get uploads directory from config
    const safeFileName = `${crypto.randomBytes(16).toString('hex')}-${file.originalname}`; // Generate a safe file name
    const uploadPath = path.join(__dirname, '..', '..', uploadsDir, safeFileName); // Adjust path to include uploads directory

    console.log('Upload path:', uploadPath); // Log the upload path for debugging

    // Ensure the uploads directory exists
    if (!fs.existsSync(path.join(__dirname, '..', '..', uploadsDir))) {
      fs.mkdirSync(path.join(__dirname, '..', '..', uploadsDir), { recursive: true });
    }

    fs.writeFileSync(uploadPath, file.buffer); // Save the file
    return `/${uploadsDir}/${safeFileName}`; // Return the URL path
  }

  async create(createHeaderImageDto: CreateHeaderImageDto): Promise<HeaderImage> {
    try {
      const headerImage = this.headerImageRepository.create(createHeaderImageDto);
      return await this.headerImageRepository.save(headerImage);
    } catch (error) {
      console.error('Error creating header image:', error);
      throw new BadRequestException('Could not create header image'); // Use proper exception handling
    }
  }

  async findAll(): Promise<HeaderImage[]> {
    return await this.headerImageRepository.find(); // Return all header images from the database
  }

  async findOne(id: string): Promise<HeaderImage> {
    const headerImage = await this.headerImageRepository.findOne({ where: { id }}); // Fetch one header image by ID (UUID)
    if (!headerImage) {
      throw new NotFoundException('Header image not found'); // Handle not found error
    }
    return headerImage;
  }

  async update(id: string, updateHeaderImageDto: UpdateHeaderImageDto): Promise<HeaderImage> {
    const headerImage = await this.findOne(id); // Retrieve existing header image
    if (updateHeaderImageDto.url) {
        headerImage.url = updateHeaderImageDto.url; // Set new URL if provided
    }
    headerImage.article = updateHeaderImageDto.article; // Update article text
    return await this.headerImageRepository.save(headerImage); // Save updated record
}


  

  async remove(id: string): Promise<void> {
    await this.headerImageRepository.delete(id); // Remove the header image by ID
  }
}
