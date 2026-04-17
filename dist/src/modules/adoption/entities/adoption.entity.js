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
exports.Adoption = void 0;
const typeorm_1 = require("typeorm");
const customer_entity_1 = require("../../customer/entities/customer.entity");
const pet_entity_1 = require("../../pet/entities/pet.entity");
let Adoption = class Adoption {
};
exports.Adoption = Adoption;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Adoption.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => customer_entity_1.Customer, (customer) => customer.adoptions, { eager: false }),
    (0, typeorm_1.JoinColumn)({ name: 'customer_id' }),
    __metadata("design:type", customer_entity_1.Customer)
], Adoption.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => pet_entity_1.Pet, (pet) => pet.adoptions, { eager: false }),
    (0, typeorm_1.JoinColumn)({ name: 'pet_id' }),
    __metadata("design:type", pet_entity_1.Pet)
], Adoption.prototype, "pet", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], Adoption.prototype, "request_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Adoption.prototype, "finalized", void 0);
exports.Adoption = Adoption = __decorate([
    (0, typeorm_1.Entity)('adoptions')
], Adoption);
//# sourceMappingURL=adoption.entity.js.map