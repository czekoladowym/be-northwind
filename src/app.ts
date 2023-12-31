import cors from 'cors';
import exress from 'express';
import Controller from './controllers';

class App {
	app: exress.Application;
	private port: string | undefined;
	private controllers: Controller[];
	constructor(port: string | undefined, controllers: Controller[]) {
		this.app = exress();
		this.port = port;
		this.controllers = controllers;
		this.initializeMiddlewares();
		this.initializeControllers();
	}
	public start() {
		try {
			this.app.listen(this.port, () => {
				console.log(`http://localhost:${this.port}/`);
			});
		} catch (error) {
			console.log(error);
		}
	}
	private initializeControllers() {
		this.controllers.forEach((controller) => {
			this.app.use(controller.path, controller.router);
		});
	}
	private initializeMiddlewares() {
		this.app.use(exress.json());
		this.app.use(cors());
	}
}

export default App;
