import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserDomainRepository } from '@sdj/backend/radio/core/domain';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepositoryAdapter extends UserDomainRepository {
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
