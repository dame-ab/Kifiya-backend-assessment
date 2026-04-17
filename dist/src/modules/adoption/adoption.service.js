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
exports.AdoptionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const customer_service_1 = require("../customer/customer.service");
const pet_service_1 = require("../pet/pet.service");
const adoption_entity_1 = require("./entities/adoption.entity");
let AdoptionService = class AdoptionService {
    constructor(adoptionRepository, customerService, petService) {
        this.adoptionRepository = adoptionRepository;
        this.customerService = customerService;
        this.petService = petService;
    }
    async adopt(dto) {
        const [customerExists, petExists] = await Promise.all([
            this.customerService.existsById(dto.customer_id),
            this.petService.existsById(dto.pet_id),
        ]);
        if (!customerExists || !petExists) {
            throw new common_1.BadRequestException('Invalid customer_id or pet_id');
        }
        const adoption = this.adoptionRepository.create({
            customer: { id: dto.customer_id },
            pet: { id: dto.pet_id },
        });
        return this.adoptionRepository.save(adoption);
    }
    async getAdoptionRequests(fromDate, toDate) {
        return this.adoptionRepository.find({
            where: {
                request_date: (0, typeorm_2.Between)(fromDate, toDate),
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
    async generateReport(dto) {
        const adoptions = await this.adoptionRepository.find({
            where: {
                request_date: (0, typeorm_2.Between)(dto.from_date, dto.to_date),
            },
            relations: { pet: true },
            order: { request_date: 'ASC' },
        });
        const adoptedPetTypes = adoptions.reduce((acc, adoption) => {
            const type = adoption.pet?.type ?? 'unknown';
            acc[type] = (acc[type] ?? 0) + 1;
            return acc;
        }, {});
        const weeklyMap = adoptions.reduce((acc, adoption) => {
            const weekKey = this.getWeekStartKey(adoption.request_date);
            acc[weekKey] = (acc[weekKey] ?? 0) + 1;
            return acc;
        }, {});
        return {
            adopted_pet_types: adoptedPetTypes,
            weekly_adoption_requests: weeklyMap,
        };
    }
    getWeekStartKey(date) {
        const utcDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
        const day = utcDate.getUTCDay();
        const diffToMonday = day === 0 ? -6 : 1 - day;
        utcDate.setUTCDate(utcDate.getUTCDate() + diffToMonday);
        return utcDate.toISOString().split('T')[0];
    }
};
exports.AdoptionService = AdoptionService;
exports.AdoptionService = AdoptionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(adoption_entity_1.Adoption)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        customer_service_1.CustomerService,
        pet_service_1.PetService])
], AdoptionService);
//# sourceMappingURL=adoption.service.js.map