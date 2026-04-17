import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { CustomerService } from '../customer/customer.service';
import { PetService } from '../pet/pet.service';
import { AdoptDto } from './dto/adopt.dto';
import { GenerateReportDto } from './dto/generate-report.dto';
import { Adoption } from './entities/adoption.entity';

@Injectable()
export class AdoptionService {
  constructor(
    @InjectRepository(Adoption)
    private readonly adoptionRepository: Repository<Adoption>,
    private readonly customerService: CustomerService,
    private readonly petService: PetService,
  ) {}

  async adopt(dto: AdoptDto): Promise<Adoption> {
    const [customerExists, petExists] = await Promise.all([
      this.customerService.existsById(dto.customer_id),
      this.petService.existsById(dto.pet_id),
    ]);

    if (!customerExists || !petExists) {
      throw new BadRequestException('Invalid customer_id or pet_id');
    }

    const adoption = this.adoptionRepository.create({
      customer: { id: dto.customer_id } as never,
      pet: { id: dto.pet_id } as never,
    });

    return this.adoptionRepository.save(adoption);
  }

  async getAdoptionRequests(fromDate: Date, toDate: Date): Promise<Adoption[]> {
    return this.adoptionRepository.find({
      where: {
        request_date: Between(fromDate, toDate),
      },
      relations: {
        customer: true,
        pet: true,
      },
      order: {
        request_date: 'ASC',
      },
    });
  }

  async generateReport(dto: GenerateReportDto) {
    const adoptions = await this.adoptionRepository.find({
      where: {
        request_date: Between(dto.from_date, dto.to_date),
      },
      relations: { pet: true },
      order: { request_date: 'ASC' },
    });

    const adoptedPetTypes = adoptions.reduce<Record<string, number>>((acc, adoption) => {
      const type = adoption.pet?.type ?? 'unknown';
      acc[type] = (acc[type] ?? 0) + 1;
      return acc;
    }, {});

    const weeklyMap = adoptions.reduce<Record<string, number>>((acc, adoption) => {
      const weekKey = this.getWeekStartKey(adoption.request_date);
      acc[weekKey] = (acc[weekKey] ?? 0) + 1;
      return acc;
    }, {});

    return {
      adopted_pet_types: adoptedPetTypes,
      weekly_adoption_requests: weeklyMap,
    };
  }

  private getWeekStartKey(date: Date): string {
    const utcDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
    const day = utcDate.getUTCDay();
    const diffToMonday = day === 0 ? -6 : 1 - day;
    utcDate.setUTCDate(utcDate.getUTCDate() + diffToMonday);
    return utcDate.toISOString().split('T')[0];
  }
}
