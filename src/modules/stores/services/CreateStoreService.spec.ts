import AppError from '@shared/errors/AppError';
import faker from 'faker';

import FakeStoresRepository from '../repositories/fakes/FakeStoresRepository';
import CreateStoreService from './CreateStoreService';

let fakeStoresRepository: FakeStoresRepository;
let createStore: CreateStoreService;

describe('CreateStore', () => {
  beforeEach(() => {
    fakeStoresRepository = new FakeStoresRepository();

    createStore = new CreateStoreService(fakeStoresRepository);
  });

  it('should be able to create a new store', async () => {
    const store = await createStore.execute({
      user_id: faker.random.words(),
      name: faker.name.findName(),
      number: faker.phone.phoneNumber(),
      slug: faker.random.word(),
    });

    expect(store).toHaveProperty('id');
  });

  it('should not be able to create a new store if slug already registered', async () => {
    const slug = faker.random.word();

    await createStore.execute({
      user_id: faker.random.words(),
      name: faker.name.findName(),
      number: faker.phone.phoneNumber(),
      slug,
    });

    await expect(
      createStore.execute({
        user_id: faker.random.words(),
        name: faker.name.findName(),
        number: faker.phone.phoneNumber(),
        slug,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
