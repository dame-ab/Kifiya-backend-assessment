import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CustomerService } from '../customer/customer.service';
import { PetService } from '../pet/pet.service';
import { Adoption } from './entities/adoption.entity';
import { AdoptionService } from './adoption.service';

describe('AdoptionService', () => {
  let service: AdoptionService;

  const adoptionRepository = {
    create: jest.fn(),
    save: jest.fn(),
  };

  const customerService = {
    existsById: jest.fn(),
  };

  const petService = {
    existsById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdoptionService,
        {
          provide: getRepositoryToken(Adoption),
          useValue: adoptionRepository,
        },
        {
          provide: CustomerService,
          useValue: customerService,
        },
        {
          provide: PetService,
          useValue: petService,
        },
      ],
    }).compile();

    service = module.get<AdoptionService>(AdoptionService);
    jest.clearAllMocks();
  });

  it('throws when customer or pet is invalid', async () => {
    customerService.existsById.mockResolvedValue(false);
    petService.existsById.mockResolvedValue(true);

    await expect(
      service.adopt({ customer_id: '123', pet_id: '456' }),
    ).rejects.toThrow(BadRequestException);
  });
});
