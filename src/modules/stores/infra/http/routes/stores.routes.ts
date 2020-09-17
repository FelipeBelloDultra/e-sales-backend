import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import StoresController from '../controllers/StoresController';

const storeRouter = Router();

const storesController = new StoresController();

storeRouter.use(ensureAuthenticated);

storeRouter.post('/', storesController.create);
storeRouter.get('/:slug', storesController.show);

export default storeRouter;
