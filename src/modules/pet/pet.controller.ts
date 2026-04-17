import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreatePetDto } from './dto/create-pet.dto';
import { GetPetsQueryDto } from './dto/get-pets-query.dto';
import { PetService } from './pet.service';

@Controller()
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post('create_pet')
  @UseInterceptors(
    FilesInterceptor('photos', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: (_, file, callback) => {
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async createPet(
    @Body() createPetDto: CreatePetDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const photoUrls = (files ?? []).map((file) => `/uploads/${file.filename}`);
    const created = await this.petService.create(createPetDto, photoUrls);
    return {
      status: 'success',
      pet_id: created.id,
    };
  }

  @Get('get_pets')
  async getPets(@Query() query: GetPetsQueryDto) {
    const pets = await this.petService.getPets(query);
    return {
      status: 'success',
      pets: pets.map((pet) => {
        const source = 'id' in pet ? 'local' : 'petfinder';
        return {
          pet_id: 'id' in pet ? pet.id : undefined,
          source,
          type: pet.type,
          gender: pet.gender,
          size: pet.size,
          age: pet.age,
          good_with_children: pet.good_with_children,
          photos: pet.photos ?? [],
        };
      }),
    };
  }
}
