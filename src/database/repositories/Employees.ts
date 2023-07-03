import { eq } from 'drizzle-orm';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { employeesTable } from '../schemas/employees';

export class EmployeesRepository {
	constructor(private db: BetterSQLite3Database) {}
	public getAll = (start: number, count: number) => {
		const employees = this.db
			.select()
			.from(employeesTable)
			.limit(count)
			.offset(start)
			.all();
		return {
			employees,
		};
	};
	public getAllQuery = (start: number, count: number) => {
		const employeesQuery = this.db
			.select()
			.from(employeesTable)
			.limit(count)
			.offset(start)
			.toSQL();

		return employeesQuery;
	};
	public getOne = (id: string) => {
		const customer = this.db
			.select()
			.from(employeesTable)
			.where(eq(employeesTable.id, id))
			.get();
		return customer;
	};

	public getOneQuery = (id: string) => {
		const query = this.db
			.select()
			.from(employeesTable)
			.where(eq(employeesTable.id, id))
			.toSQL();

		return query;
	};
}
