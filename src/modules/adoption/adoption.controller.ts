import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AdoptDto } from './dto/adopt.dto';
import { DateRangeQueryDto } from './dto/date-range-query.dto';
import { GenerateReportDto } from './dto/generate-report.dto';
import { AdoptionService } from './adoption.service';

@Controller()
export class AdoptionController {
  constructor(private readonly adoptionService: AdoptionService) {}

  @Post('adopt')
  async adopt(@Body() dto: AdoptDto) {
    const adoption = await this.adoptionService.adopt(dto);
    return {
      status: 'success',
      adoption_id: adoption.id,
    };
  }

  @Get('get_adoption_requests')
  async getAdoptionRequests(@Query() query: DateRangeQueryDto) {
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

  @Post('generate_report')
  async generateReport(@Body() dto: GenerateReportDto) {
    const data = await this.adoptionService.generateReport(dto);
    return {
      status: 'success',
      data,
    };
  }
}
