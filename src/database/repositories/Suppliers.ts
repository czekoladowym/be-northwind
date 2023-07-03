import { eq } from 'drizzle-orm';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { suppliesTable } from '../schemas/suppliers';

export class SuppliesRepository {
	constructor(private db: BetterSQLite3Database) {}
	public getAll = (start: number, count: number) => {
		const supplies = this.db
			.select()
			.from(suppliesTable)
			.limit(count)
			.offset(start)
			.all();
		return {
			supplies,
		};
	};
	public getAllQuery = (start: number, count: number) => {
		const suppliesQuery = this.db
			.select()
			.from(suppliesTable)
			.limit(count)
			.offset(start)
			.toSQL();

		return suppliesQuery;
	};
	public getOne = (id: string) => {
		const supplie = this.db
			.select()
			.from(suppliesTable)
			.where(eq(suppliesTable.id, id))
			.get();
		return supplie;
	};

	public getOneQuery = (id: string) => {
		const query = this.db
			.select()
			.from(suppliesTable)
			.where(eq(suppliesTable.id, id))
			.toSQL();

		return query;
	};
}
