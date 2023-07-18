import { eq, like } from 'drizzle-orm';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { productsTable } from '../schemas/products';

export class ProductsRepository {
	constructor(private db: BetterSQLite3Database) {}
	public getAll = (start: number, count: number) => {
		const products = this.db
			.select()
			.from(productsTable)
			.limit(count)
			.offset(start)
			.all();
		return {
			products,
		};
	};
	public getAllQuery = (start: number, count: number) => {
		const productsQuery = this.db
			.select()
			.from(productsTable)
			.limit(count)
			.offset(start)
			.toSQL();

		return productsQuery;
	};
	public getOne = (id: string) => {
		const product = this.db
			.select()
			.from(productsTable)
			.where(eq(productsTable.productId, id))
			.get();
		return product;
	};

	public getOneQuery = (id: string) => {
		const query = this.db
			.select()
			.from(productsTable)
			.where(eq(productsTable.productId, id))
			.toSQL();

		return query;
	};
	public getSearched = (search: string) => {
		const products = this.db
			.select({
				productId: productsTable.productId,
				productName: productsTable.name,
				quantity: productsTable.quantity,
				price: productsTable.price,
				unitsInStock: productsTable.stock,
			})
			.from(productsTable)
			.where(like(productsTable.name, `%${search}%`))
			.all();
		return products;
	};
}
