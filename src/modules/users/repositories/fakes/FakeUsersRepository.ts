import { v4 as uuidv4 } from 'uuid';

import IUsersRepository from '../IUsersRepository';
import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import User from '../../infra/typeorm/schemas/User';

class UserRepository implements IUsersRepository {
  private users: User[] = [];

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuidv4(), ...userData });

    this.users.push(user);

    return user;
  }
}

export default UserRepository;
