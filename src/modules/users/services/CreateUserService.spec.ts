import AppError from '@shared/errors/AppError';
import faker from 'faker';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.random.word(),
      whatsapp: faker.phone.phoneNumber(),
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user if the email has already been used', async () => {
    const email = faker.internet.email();

    await createUser.execute({
      name: faker.name.findName(),
      email,
      password: faker.random.word(),
      whatsapp: faker.phone.phoneNumber(),
    });

    await expect(
      createUser.execute({
        name: faker.name.findName(),
        email,
        password: faker.random.words(),
        whatsapp: faker.phone.phoneNumber(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
