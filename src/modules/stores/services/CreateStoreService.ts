import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IStoresRepository from '../repositories/IStoresRepository';

import Store from '../infra/typeorm/schemas/Store';

interface IRequest {
  user_id: string;
  name: string;
  slug: string;
  number: string;
}

@injectable()
class CreateStoreService {
  constructor(
    @inject('StoresRepository')
    private storesRepository: IStoresRepository,
  ) {}

  public async execute({
    name,
    number,
    slug,
    user_id,
  }: IRequest): Promise<Store> {
    const findStore = await this.storesRepository.findBySlug(slug);

    if (findStore) {
      throw new AppError('This slug already used.');
    }

    const store = await this.storesRepository.create({
      name,
      user_id,
      slug,
      number,
    });

    return store;
  }
}

export default CreateStoreService;
