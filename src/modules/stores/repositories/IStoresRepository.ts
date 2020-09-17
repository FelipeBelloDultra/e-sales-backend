import ICreateStoreDTO from '../dtos/ICreateStoreDTO';
import Store from '../infra/typeorm/schemas/Store';

interface IStoresRepository {
  create(data: ICreateStoreDTO): Promise<Store>;
  findBySlug(slug: string): Promise<Store | undefined>;
}

export default IStoresRepository;
