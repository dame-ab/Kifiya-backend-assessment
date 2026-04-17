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
exports.PetController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const create_pet_dto_1 = require("./dto/create-pet.dto");
const get_pets_query_dto_1 = require("./dto/get-pets-query.dto");
const pet_service_1 = require("./pet.service");
let PetController = class PetController {
    constructor(petService) {
        this.petService = petService;
    }
    async createPet(createPetDto, files) {
        const photoUrls = (files ?? []).map((file) => `/uploads/${file.filename}`);
        const created = await this.petService.create(createPetDto, photoUrls);
        return {
            status: 'success',
            pet_id: created.id,
        };
    }
    async getPets(query) {
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
};
exports.PetController = PetController;
__decorate([
    (0, common_1.Post)('create_pet'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('photos', 10, {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (_, file, callback) => {
                const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
                callback(null, `${uniqueSuffix}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_pet_dto_1.CreatePetDto,
        Array]),
    __metadata("design:returntype", Promise)
], PetController.prototype, "createPet", null);
__decorate([
    (0, common_1.Get)('get_pets'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_pets_query_dto_1.GetPetsQueryDto]),
    __metadata("design:returntype", Promise)
], PetController.prototype, "getPets", null);
exports.PetController = PetController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [pet_service_1.PetService])
], PetController);
//# sourceMappingURL=pet.controller.js.map