import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateHeaderImageDto {
    @IsString()
    @IsOptional()
    url: string; // This will be set after the image is uploaded

    @IsString()
    @IsOptional()
    article: string; // The article associated with the header image
}
