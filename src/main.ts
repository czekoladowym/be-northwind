import App from './app';
import db from './database';
import CustomersService from './services/Customers';
import EmployeesService from './services/Employees';
import CustomersController from './controllers/Customers';
import EmployeesController from './controllers/Employees';
import { CustomersRepository } from './database/repositories/Customers';
import { EmployeesRepository } from './database/repositories/Employees';
import SuppliesController from './controllers/Suppliers';
import { SuppliesRepository } from './database/repositories/Suppliers';
import SuppliesService from './services/Suppliers';
import { config } from 'dotenv';
import { ProductsRepository } from './database/repositories/Products';
import ProductsController from './controllers/Products';
import ProductsService from './services/Products';

config();

const PORT = process.env.PORT;

const main = async () => {
	try {
		const customersRepo = new CustomersRepository(db);
		const customersService = new CustomersService(customersRepo);
		const customersController = new CustomersController(customersService);

		const employeesRepo = new EmployeesRepository(db);
		const employeesService = new EmployeesService(employeesRepo);
		const employeesController = new EmployeesController(employeesService);

		const suppliesRepo = new SuppliesRepository(db);
		const suppliesService = new SuppliesService(suppliesRepo);
		const suppliesController = new SuppliesController(suppliesService);

		const productsRepo = new ProductsRepository(db);
		const productsService = new ProductsService(productsRepo);
		const productsController = new ProductsController(productsService);

		const controllers = [
			customersController,
			employeesController,
			suppliesController,
			productsController,
		];
		const app = new App(PORT, controllers);

		app.start();
	} catch (e) {
		console.log(e);
	}
};
main();
