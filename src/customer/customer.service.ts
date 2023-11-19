import { Injectable, NotAcceptableException } from '@nestjs/common';
import { Customer } from './type';
import { CityService } from 'src/city/city.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CustomerService {
  private customers: Customer[] = [];

  constructor(private readonly cityService: CityService) {}

  insertCustomer(firstName: string, lastName: string, cityId: string): string {
    const customerId = uuidv4();
    this.cityService.findCity(cityId);

    this.customers.push(new Customer(customerId, firstName, lastName, cityId));
    return customerId;
  }

  getCustomers(): Customer[] {
    return this.customers;
  }

  getSingleCustomer(customerId: string): Customer {
    const [customer] = this.findCustomer(customerId);
    return customer;
  }

  updateCustomer(
    customerId: string,
    firstName: string,
    lastName: string,
    cityId: string,
  ): Customer {
    this.cityService.findCity(cityId);
    const [customer] = this.findCustomer(customerId);
    if (firstName) {
      customer.firstName = firstName;
    }
    if (lastName) {
      customer.lastName = lastName;
    }
    if (cityId) {
      customer.cityId = cityId;
    }
    return customer;
  }

  deleteCustomer(customerId: string) {
    const [, index] = this.findCustomer(customerId);
    this.customers.splice(index, 1);
    return { message: 'Uspjesno obrisano' };
  }

  findCustomer(id: string): [Customer, number] {
    const customerIndex = this.customers.findIndex(
      (customer) => customer.id === id,
    );
    if (customerIndex === -1) {
      throw new NotAcceptableException(`Customer with ID ${id} not found`);
    }
    return [this.customers[customerIndex], customerIndex];
  }
}
