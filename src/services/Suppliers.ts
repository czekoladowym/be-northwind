import { SuppliesRepository } from '@/database/repositories/Suppliers';
class SuppliesService {
	constructor(private supplies: SuppliesRepository) {}
	public getAll = (start: number, count: number) => {
		const startTimestamp = Date.now();
		const supplies = this.supplies.getAll(start, count);
		const endTimestamp = Date.now();
		const time = endTimestamp - startTimestamp;

		const query = this.supplies.getAllQuery(start, count);
		query.params.forEach((param: unknown) => {
			const stringParam = param as string;
			query.sql = query.sql.replace('?', stringParam);
		});
		query.sql = query.sql.replace('\\', ' ');
		return {
			sql: query.sql,
			supplies: supplies?.supplies,
			time,
		};
	};
	public getOne = (id: string) => {
		const startTimestamp = Date.now();
		const supplier = this.supplies.getOne(id);
		const endTimestamp = Date.now();
		const time = endTimestamp - startTimestamp;

		const query = this.supplies.getOneQuery(id);
		query.params.forEach((param: unknown) => {
			const stringParam = param as string;
			query.sql = query.sql.replace('?', stringParam);
		});
		query.sql = query.sql.replace('\\', ' ');

		return { supplier, time, sql: query.sql };
	};
}
export default SuppliesService;
