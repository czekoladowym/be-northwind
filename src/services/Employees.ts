import { EmployeesRepository } from '@/database/repositories/Employees';

class EmployeesService {
	constructor(private employees: EmployeesRepository) {}
	public getAll = (start: number, count: number) => {
		const startTimestamp = Date.now();
		const employees = this.employees.getAll(start, count);
		const endTimestamp = Date.now();
		const time = endTimestamp - startTimestamp;

		const query = this.employees.getAllQuery(start, count);
		query.params.forEach((param: unknown) => {
			const stringParam = param as string;
			query.sql = query.sql.replace('?', stringParam);
		});
		query.sql = query.sql.replace('\\', ' ');
		return {
			sql: query.sql,
			employees: employees?.employees,
			time,
		};
	};
	public getOne = (id: string) => {
		const startTimestamp = Date.now();
		const employee = this.employees.getOne(id);
		const endTimestamp = Date.now();
		const time = endTimestamp - startTimestamp;

		const query = this.employees.getOneQuery(id);
		query.params.forEach((param: unknown) => {
			const stringParam = param as string;
			query.sql = query.sql.replace('?', stringParam);
		});
		query.sql = query.sql.replace('\\', ' ');

		return { employee, time, sql: query.sql };
	};
}
export default EmployeesService;
