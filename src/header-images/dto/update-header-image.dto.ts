import { PartialType } from '@nestjs/swagger';
import { CreateHeaderImageDto } from './create-header-image.dto';

export class UpdateHeaderImageDto extends PartialType(CreateHeaderImageDto) {}
