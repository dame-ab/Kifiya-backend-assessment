import { Body, Controller, Post } from '@nestjs/common';
import { AddCustomerDto } from './dto/add-customer.dto';
import { CustomerService } from './customer.service';

@Controller()
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('add_customer')
  async addCustomer(@Body() dto: AddCustomerDto) {
    const result = await this.customerService.addCustomer(dto);
    return {
      status: 'success',
      ...result,
    };
  }
}
