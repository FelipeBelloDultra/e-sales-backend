import faker from 'faker';

import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const email = faker.internet.email();
    const password = faker.random.word();

    const user = await fakeUsersRepository.create({
      name: faker.name.findName(),
      email,
      password,
      whatsapp: faker.phone.phoneNumber(),
    });

    const response = await authenticateUser.execute({
      email,
      password,
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate the user if the e-mail is wrong', async () => {
    const email = faker.internet.email();
    const password = faker.random.word();

    await fakeUsersRepository.create({
      name: faker.name.findName(),
      email,
      password,
      whatsapp: faker.phone.phoneNumber(),
    });

    await expect(
      authenticateUser.execute({
        email: faker.internet.email(),
        password,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate the user if the password is wrong', async () => {
    const email = faker.internet.email();
    const password = faker.random.word();

    await fakeUsersRepository.create({
      name: faker.name.findName(),
      email,
      password,
      whatsapp: faker.phone.phoneNumber(),
    });

    await expect(
      authenticateUser.execute({
        email,
        password: faker.random.word(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
