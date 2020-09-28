import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRepositoryInterface } from '@sdj/backend/radio/core/domain';
import { Repository } from 'typeorm';

@Injectable()
export class TypeormUserRepository extends UserRepositoryInterface {
  constructor(
    @InjectRepository(User) private typeOrmRepository: Repository<User>
  ) {
    super();
  }

  async findOne(id: string): Promise<User | undefined> {
    return this.typeOrmRepository.findOne(id);
  }

  async findOneOrFail(userId: string): Promise<User> {
    return this.typeOrmRepository.findOneOrFail(userId);
  }

  async save(user: User): Promise<User> {
    return this.typeOrmRepository.save(user);
  }
}
