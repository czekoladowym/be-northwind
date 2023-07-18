import { CustomersRepository } from '@/database/repositories/Customers';
import { ProductsRepository } from '@/database/repositories/Products';

export class SearchService {
	constructor(
		private customers: CustomersRepository,
		private products: ProductsRepository
	) {}
	public getSearched = (type: string, value: string) => {
		if (type === 'customers') {
			const customers = this.customers.getSearched(value);
			return customers;
		} else if (type === 'suppliers') {
			const suppliers = this.products.getSearched(value);
			return suppliers;
		}
	};
}
