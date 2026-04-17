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
exports.AdoptionController = void 0;
const common_1 = require("@nestjs/common");
const adopt_dto_1 = require("./dto/adopt.dto");
const date_range_query_dto_1 = require("./dto/date-range-query.dto");
const generate_report_dto_1 = require("./dto/generate-report.dto");
const adoption_service_1 = require("./adoption.service");
let AdoptionController = class AdoptionController {
    constructor(adoptionService) {
        this.adoptionService = adoptionService;
    }
    async adopt(dto) {
        const adoption = await this.adoptionService.adopt(dto);
        return {
            status: 'success',
            adoption_id: adoption.id,
        };
    }
    async getAdoptionRequests(query) {
        const records = await this.adoptionService.getAdoptionRequests(query.from_date, query.to_date);
        return {
            status: 'success',
            data: records.map((record) => ({
                customer_id: record.customer.id,
                customer_phone: record.customer.phone,
                customer_name: record.customer.name,
                pet_id: record.pet.id,
                type: record.pet.type,
                gender: record.pet.gender,
                size: record.pet.size,
                age: record.pet.age,
                good_with_children: record.pet.good_with_children,
            })),
        };
    }
    async generateReport(dto) {
        const data = await this.adoptionService.generateReport(dto);
        return {
            status: 'success',
            data,
        };
    }
};
exports.AdoptionController = AdoptionController;
__decorate([
    (0, common_1.Post)('adopt'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [adopt_dto_1.AdoptDto]),
    __metadata("design:returntype", Promise)
], AdoptionController.prototype, "adopt", null);
__decorate([
    (0, common_1.Get)('get_adoption_requests'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [date_range_query_dto_1.DateRangeQueryDto]),
    __metadata("design:returntype", Promise)
], AdoptionController.prototype, "getAdoptionRequests", null);
__decorate([
    (0, common_1.Post)('generate_report'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [generate_report_dto_1.GenerateReportDto]),
    __metadata("design:returntype", Promise)
], AdoptionController.prototype, "generateReport", null);
exports.AdoptionController = AdoptionController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [adoption_service_1.AdoptionService])
], AdoptionController);
//# sourceMappingURL=adoption.controller.js.map