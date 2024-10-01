import { IsString, IsNotEmpty } from 'class-validator';

export class CreateHeaderImageDto {
    @IsString()
    @IsNotEmpty()
    url: string; // This will be set after the image is uploaded

    @IsString()
    @IsNotEmpty()
    article: string; // The article associated with the header image
}
