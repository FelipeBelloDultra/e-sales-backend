import { v4 as uuidv4 } from 'uuid';

import IStoresRepository from '../IStoresRepository';
import ICreateStoreDTO from '../../dtos/ICreateStoreDTO';
import Store from '../../infra/typeorm/schemas/Store';

class StoreRepository implements IStoresRepository {
  private stores: Store[] = [];

  public async create(storeData: ICreateStoreDTO): Promise<Store> {
    const store = new Store();

    Object.assign(store, { id: uuidv4(), ...storeData });

    this.stores.push(store);

    return store;
  }

  public async findBySlug(slug: string): Promise<Store | undefined> {
    const findStore = this.stores.find(store => store.slug === slug);

    return findStore;
  }
}

export default StoreRepository;
