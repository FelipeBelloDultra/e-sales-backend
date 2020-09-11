import ICreateStoreDTO from '../dtos/ICreateStoreDTO';
import Store from '../infra/typeorm/schemas/Store';

interface IStoresRepository {
  create(data: ICreateStoreDTO): Promise<Store>;
}

export default IStoresRepository;
