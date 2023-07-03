import { Request, Response } from 'express';
import Controller from '.';
import SuppliesService from '@/services/Suppliers';

class SuppliesController extends Controller {
	constructor(private supplies: SuppliesService) {
		super('/supplies');
		this.router.get('/', this.getAll);
		this.router.get('/:id', this.getOne);
	}
	private getAll = async (req: Request, res: Response) => {
		try {
			const page = Number(req.query.page) || 1;
			const count = Number(req.query.count) || 20;
			const start = (page - 1) * count;
			const response = this.supplies.getAll(start, count);
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
			const supplier = this.supplies.getOne(id);
			if (!supplier) {
				return res.status(404).json({ message: 'Supplies not found' });
			}
			return res.send(supplier);
		} catch (e) {
			console.log(e);
			res.status(500).json({ message: 'Something went wrong, try again' });
		}
	};
}
export default SuppliesController;
