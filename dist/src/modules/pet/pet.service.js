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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const external_api_service_1 = require("../external-api/external-api.service");
const pet_entity_1 = require("./entities/pet.entity");
let PetService = class PetService {
    constructor(petRepository, externalApiService) {
        this.petRepository = petRepository;
        this.externalApiService = externalApiService;
    }
    async create(createPetDto, photos) {
        const pet = this.petRepository.create({
            ...createPetDto,
            photos,
        });
        return this.petRepository.save(pet);
    }
    async getPets(query) {
        const { limit, ...filters } = query;
        const where = {};
        if (filters.type?.length)
            where.type = (0, typeorm_2.In)(filters.type);
        if (filters.gender?.length)
            where.gender = (0, typeorm_2.In)(filters.gender);
        if (filters.size?.length)
            where.size = (0, typeorm_2.In)(filters.size);
        if (filters.age?.length)
            where.age = (0, typeorm_2.In)(filters.age);
        if (filters.good_with_children !== undefined) {
            where.good_with_children = filters.good_with_children;
        }
        const localPets = await this.petRepository.find({
            where,
            take: limit,
            order: { id: 'ASC' },
        });
        if (localPets.length >= limit) {
            return localPets;
        }
        const remaining = limit - localPets.length;
        const externalPets = await this.externalApiService.fetchPets(remaining);
        return [...localPets, ...externalPets];
    }
    async existsById(id) {
        const count = await this.petRepository.count({ where: { id } });
        return count > 0;
    }
};
exports.PetService = PetService;
exports.PetService = PetService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(pet_entity_1.Pet)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        external_api_service_1.ExternalApiService])
], PetService);
//# sourceMappingURL=pet.service.js.map