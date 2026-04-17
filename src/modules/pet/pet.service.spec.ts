import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ExternalApiService } from '../external-api/external-api.service';
import { Pet } from './entities/pet.entity';
import { PetService } from './pet.service';

describe('PetService', () => {
  let service: PetService;

  const petRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
  };

  const externalApiService = {
    fetchPets: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PetService,
        {
          provide: getRepositoryToken(Pet),
          useValue: petRepository,
        },
        {
          provide: ExternalApiService,
          useValue: externalApiService,
        },
      ],
    }).compile();

    service = module.get<PetService>(PetService);
    jest.clearAllMocks();
  });

  it('returns local pets first and appends external pets', async () => {
    petRepository.find.mockResolvedValue([{ id: 'local-1', type: 'dog' }]);
    externalApiService.fetchPets.mockResolvedValue([{ id: 'remote-1', type: 'cat' }]);

    const result = await service.getPets({ limit: 2, type: 'dog' });

    expect(result).toEqual([
      { id: 'local-1', type: 'dog' },
      { id: 'remote-1', type: 'cat' },
    ]);
    expect(externalApiService.fetchPets).toHaveBeenCalledWith(1);
  });
});
