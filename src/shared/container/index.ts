import { container } from 'tsyringe';

import '@modules/users/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IStoresRepository from '@modules/stores/repositories/IStoresRepository';
import StoresRepository from '@modules/stores/infra/typeorm/repositories/StoresRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IStoresRepository>(
  'StoresRepository',
  StoresRepository,
);
