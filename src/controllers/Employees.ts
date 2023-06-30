import { Request, Response } from 'express';
import Controller from '.';
import EmployeesService from '@/services/Employees';

class EmployeesController extends Controller {
	constructor(private employees: EmployeesService) {
		super('/employees');
		this.router.get('/', this.getAll);
		this.router.get('/:id', this.getOne);
	}
	private getAll = async (req: Request, res: Response) => {
		try {
			const page = Number(req.query.page) || 1;
			const count = Number(req.query.count) || 20;
			const start = (page - 1) * count;
			const response = this.employees.getAll(start, count);
			return res.send(response);
		} catch (e) {
			console.log(e);
			res.status(500).json({ message: 'Something went wrong, try again' });
		}
	};
	private getOne = async (req: Request, res: Response) => {
		try {
			const id = req.params.id;
			if (!id) {
				return res.status(400).json({ message: 'Missing id' });
			}
			const employee = this.employees.getOne(id);
			if (!employee) {
				return res.status(404).json({ message: 'Employee not found' });
			}
			return res.send(employee);
		} catch (e) {
			console.log(e);
			res.status(500).json({ message: 'Something went wrong, try again' });
		}
	};
}
export default EmployeesController;
