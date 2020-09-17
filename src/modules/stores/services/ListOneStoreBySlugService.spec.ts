import AppError from '@shared/errors/AppError';
import faker from 'faker';

import FakeStoresRepository from '../repositories/fakes/FakeStoresRepository';
import ListOneStoreBySlugService from './ListOneStoreBySlugService';
import CreateStoreService from './CreateStoreService';

let fakeStoresRepository: FakeStoresRepository;
let listOneStoreBySlug: ListOneStoreBySlugService;
let createStore: CreateStoreService;

describe('ListStoreBySlug', () => {
  beforeEach(() => {
    fakeStoresRepository = new FakeStoresRepository();

    listOneStoreBySlug = new ListOneStoreBySlugService(fakeStoresRepository);
    createStore = new CreateStoreService(fakeStoresRepository);
  });

  it('should be able to list a store by slug', async () => {
    const user_id = faker.random.words();
    const slug = faker.random.word();

    await createStore.execute({
      user_id,
      slug,
      name: faker.name.findName(),
      number: faker.phone.phoneNumber(),
    });

    const store = await listOneStoreBySlug.execute({
      user_id,
      slug,
    });

    expect(store).toHaveProperty('id');
  });

  it('should not be able to list a store by slug if store not found', async () => {
    const user_id = faker.random.words();
    const slug = faker.random.word();

    await expect(
      listOneStoreBySlug.execute({
        user_id,
        slug,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
