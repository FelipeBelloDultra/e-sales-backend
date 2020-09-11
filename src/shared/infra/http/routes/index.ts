import { Router } from 'express';

import SessionRoutes from '@modules/users/infra/http/routes/session.routes';
import UsersRoutes from '@modules/users/infra/http/routes/users.routes';
import StoresRoutes from '@modules/stores/infra/http/routes/stores.routes';

const routes = Router();

routes.use('/session', SessionRoutes);
routes.use('/users', UsersRoutes);
routes.use('/stores', StoresRoutes);

export default routes;
