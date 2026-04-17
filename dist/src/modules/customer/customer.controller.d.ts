import { AddCustomerDto } from './dto/add-customer.dto';
import { CustomerService } from './customer.service';
export declare class CustomerController {
    private readonly customerService;
    constructor(customerService: CustomerService);
    addCustomer(dto: AddCustomerDto): Promise<{
        customer_id: string;
        status: string;
    }>;
}
