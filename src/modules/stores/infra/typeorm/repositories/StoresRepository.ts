import { getMongoRepository, MongoRepository } from 'typeorm';

import IStoresRepository from '@modules/stores/repositories/IStoresRepository';
import ICreateStoreDTO from '@modules/stores/dtos/ICreateStoreDTO';

import Store from '../schemas/Store';

class StoresRepository implements IStoresRepository {
  private ormRepository: MongoRepository<Store>;

  constructor() {
    this.ormRepository = getMongoRepository(Store);
  }

  public async create(data: ICreateStoreDTO): Promise<Store> {
    const store = this.ormRepository.create(data);

    await this.ormRepository.save(store);

    return store;
  }
}

export default StoresRepository;
