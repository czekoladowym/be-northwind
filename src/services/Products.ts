import { ProductsRepository } from '@/database/repositories/Products';

class ProductsService {
	constructor(private products: ProductsRepository) {}
	public getAll = (start: number, count: number) => {
		const startTimestamp = Date.now();
		const customers = this.products.getAll(start, count);
		const endTimestamp = Date.now();
		const time = endTimestamp - startTimestamp;

		const query = this.products.getAllQuery(start, count);
		query.params.forEach((param: unknown) => {
			const stringParam = param as string;
			query.sql = query.sql.replace('?', stringParam);
		});
		query.sql = query.sql.replace('\\', ' ');
		return {
			sql: query.sql,
			customers: customers?.products,
			time,
		};
	};
	public getOne = (id: string) => {
		const startTimestamp = Date.now();
		const customer = this.products.getOne(id);
		const endTimestamp = Date.now();
		const time = endTimestamp - startTimestamp;

		const query = this.products.getOneQuery(id);
		query.params.forEach((param: unknown) => {
			const stringParam = param as string;
			query.sql = query.sql.replace('?', stringParam);
		});
		query.sql = query.sql.replace('\\', ' ');

		return { customer, time, sql: query.sql };
	};
}
export default ProductsService;
