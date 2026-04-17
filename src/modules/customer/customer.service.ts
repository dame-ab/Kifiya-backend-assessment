import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddCustomerDto } from './dto/add-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async addCustomer(dto: AddCustomerDto): Promise<{ customer_id: string }> {
    const existing = await this.customerRepository.findOne({
      where: { phone: dto.phone },
    });
    if (existing) {
      return { customer_id: existing.id };
    }

    const customer = this.customerRepository.create(dto);
    const saved = await this.customerRepository.save(customer);
    return { customer_id: saved.id };
  }

  async existsById(id: string): Promise<boolean> {
    const count = await this.customerRepository.count({ where: { id } });
    return count > 0;
  }
}
