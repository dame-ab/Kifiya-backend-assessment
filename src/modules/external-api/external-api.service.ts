import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Pet } from '../pet/entities/pet.entity';

@Injectable()
export class ExternalApiService {
  constructor(private readonly httpService: HttpService) {}

  async fetchPets(limit: number): Promise<Partial<Pet>[]> {
    if (limit <= 0) {
      return [];
    }

    const apiKey = process.env.DOG_API_KEY;
    if (!apiKey) {
      return [];
    }

    try {
      const response = await firstValueFrom(
        this.httpService.get('https://api.thedogapi.com/v1/images/search', {
          headers: {
            'x-api-key': apiKey,
          },
          params: {
            limit,
            has_breeds: 1,
          },
        }),
      );

      const data = Array.isArray(response.data) ? response.data : [];
      return data.map((item: Record<string, any>) => {
        const breed = Array.isArray(item.breeds) && item.breeds.length > 0 ? item.breeds[0] : {};
        return {
          type: 'Dog',
          gender: 'unknown',
          size: this.mapSizeFromWeight(breed?.weight?.metric),
          age: this.mapAgeFromLifeSpan(breed?.life_span),
          photos: item.url ? [item.url] : [],
          good_with_children: false,
        };
      });
    } catch {
      return [];
    }
  }

  private mapSizeFromWeight(weightMetric?: string): string {
    if (!weightMetric) return 'medium';
    const [minRaw] = String(weightMetric).split('-').map((part) => Number(part.trim()));
    if (Number.isNaN(minRaw)) return 'medium';
    if (minRaw < 10) return 'small';
    if (minRaw < 25) return 'medium';
    if (minRaw < 40) return 'large';
    return 'xlarge';
  }

  private mapAgeFromLifeSpan(lifeSpan?: string): string {
    if (!lifeSpan) return 'adult';
    const [minRaw] = String(lifeSpan).split('-').map((part) => Number(part.trim()));
    if (Number.isNaN(minRaw)) return 'adult';
    if (minRaw < 2) return 'baby';
    if (minRaw < 5) return 'young';
    if (minRaw < 9) return 'adult';
    return 'senior';
  }
}
