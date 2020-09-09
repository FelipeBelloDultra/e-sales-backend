import AppError from '@shared/errors/AppError';

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
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'john123',
      whatsapp: '16999999999',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user if the email has already been used', async () => {
    const email = 'john@doe.com';

    await createUser.execute({
      name: 'John Doe',
      email,
      password: 'john123',
      whatsapp: '16999999999',
    });

    await expect(
      createUser.execute({
        name: 'John Doe 2',
        email,
        password: 'john123',
        whatsapp: '16999999999',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
