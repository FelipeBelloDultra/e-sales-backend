import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IStoresRepository from '../repositories/IStoresRepository';

import Store from '../infra/typeorm/schemas/Store';

interface IRequest {
  user_id: string;
  slug: string;
}

@injectable()
class ListOneStoreBySlugService {
  constructor(
    @inject('StoresRepository')
    private storesRepository: IStoresRepository,
  ) {}

  public async execute({ slug, user_id }: IRequest): Promise<Store> {
    const findStore = await this.storesRepository.findBySlug(slug);

    if (!findStore) {
      throw new AppError('Store not found.', 404);
    }

    if (findStore.user_id !== user_id) {
      throw new AppError('This store does not belong to its user.', 401);
    }

    return findStore;
  }
}

export default ListOneStoreBySlugService;
