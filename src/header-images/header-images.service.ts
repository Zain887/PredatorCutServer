import { Injectable } from '@nestjs/common';
import { CreateHeaderImageDto } from './dto/create-header-image.dto';
import { UpdateHeaderImageDto } from './dto/update-header-image.dto';

@Injectable()
export class HeaderImagesService {
  create(createHeaderImageDto: CreateHeaderImageDto) {
    return 'This action adds a new headerImage';
  }

  findAll() {
    return `This action returns all headerImages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} headerImage`;
  }

  update(id: number, updateHeaderImageDto: UpdateHeaderImageDto) {
    return `This action updates a #${id} headerImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} headerImage`;
  }
}
