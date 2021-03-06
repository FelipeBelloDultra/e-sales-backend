import ICreateUserDTO from '../dtos/ICreateUserDTO';
import User from '../infra/typeorm/schemas/User';

interface IUserRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
}

export default IUserRepository;
