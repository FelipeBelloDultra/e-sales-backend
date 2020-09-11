import { Router } from 'express';

import StoresController from '../controllers/StoresController';

const storeRouter = Router();

const storesController = new StoresController();

storeRouter.get('/', storesController.create);

export default storeRouter;
