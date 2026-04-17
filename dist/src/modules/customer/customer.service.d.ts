import { Repository } from 'typeorm';
import { AddCustomerDto } from './dto/add-customer.dto';
import { Customer } from './entities/customer.entity';
export declare class CustomerService {
    private readonly customerRepository;
    constructor(customerRepository: Repository<Customer>);
    addCustomer(dto: AddCustomerDto): Promise<{
        customer_id: string;
    }>;
    existsById(id: string): Promise<boolean>;
}
