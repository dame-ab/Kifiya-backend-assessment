"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdoptionModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const customer_module_1 = require("../customer/customer.module");
const pet_module_1 = require("../pet/pet.module");
const adoption_controller_1 = require("./adoption.controller");
const adoption_service_1 = require("./adoption.service");
const adoption_entity_1 = require("./entities/adoption.entity");
let AdoptionModule = class AdoptionModule {
};
exports.AdoptionModule = AdoptionModule;
exports.AdoptionModule = AdoptionModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([adoption_entity_1.Adoption]), customer_module_1.CustomerModule, pet_module_1.PetModule],
        controllers: [adoption_controller_1.AdoptionController],
        providers: [adoption_service_1.AdoptionService],
    })
], AdoptionModule);
//# sourceMappingURL=adoption.module.js.map