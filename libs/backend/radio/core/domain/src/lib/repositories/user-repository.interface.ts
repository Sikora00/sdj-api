import { User } from '../entities/user.entity';

export abstract class UserRepositoryInterface {
  abstract async findOneOrFail(userId: string): Promise<User>;

  abstract async findOne(id: string): Promise<User | undefined>;

  abstract async save(user: User): Promise<User>;
}
