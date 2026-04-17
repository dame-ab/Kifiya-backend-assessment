"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalApiService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let ExternalApiService = class ExternalApiService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async fetchPets(limit) {
        if (limit <= 0) {
            return [];
        }
        const apiKey = process.env.DOG_API_KEY;
        if (!apiKey) {
            return [];
        }
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get('https://api.thedogapi.com/v1/images/search', {
                headers: {
                    'x-api-key': apiKey,
                },
                params: {
                    limit,
                    has_breeds: 1,
                },
            }));
            const data = Array.isArray(response.data) ? response.data : [];
            return data.map((item) => {
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
        }
        catch {
            return [];
        }
    }
    mapSizeFromWeight(weightMetric) {
        if (!weightMetric)
            return 'medium';
        const [minRaw] = String(weightMetric).split('-').map((part) => Number(part.trim()));
        if (Number.isNaN(minRaw))
            return 'medium';
        if (minRaw < 10)
            return 'small';
        if (minRaw < 25)
            return 'medium';
        if (minRaw < 40)
            return 'large';
        return 'xlarge';
    }
    mapAgeFromLifeSpan(lifeSpan) {
        if (!lifeSpan)
            return 'adult';
        const [minRaw] = String(lifeSpan).split('-').map((part) => Number(part.trim()));
        if (Number.isNaN(minRaw))
            return 'adult';
        if (minRaw < 2)
            return 'baby';
        if (minRaw < 5)
            return 'young';
        if (minRaw < 9)
            return 'adult';
        return 'senior';
    }
};
exports.ExternalApiService = ExternalApiService;
exports.ExternalApiService = ExternalApiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], ExternalApiService);
//# sourceMappingURL=external-api.service.js.map