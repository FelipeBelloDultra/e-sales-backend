import { inject, injectable } from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/schemas/User';

interface IRequest {
  name: string;
  email: string;
  password: string;
  whatsapp: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    name,
    email,
    password,
    whatsapp,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.create({
      name,
      email,
      password,
      whatsapp,
    });

    return user;
  }
}

export default CreateUserService;
