import faker from 'faker';

import FakeStoresRepository from '../repositories/fakes/FakeStoresRepository';
import CreateStoreService from './CreateStoreService';

let fakeStoresRepository: FakeStoresRepository;
let createStore: CreateStoreService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeStoresRepository = new FakeStoresRepository();

    createStore = new CreateStoreService(fakeStoresRepository);
  });

  it('should be able to create a new user', async () => {
    const user = await createStore.execute({
      user_id: faker.random.words(),
      name: faker.name.findName(),
      number: faker.phone.phoneNumber(),
      slug: faker.random.word(),
    });

    expect(user).toHaveProperty('id');
  });
});
