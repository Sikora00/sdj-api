import { CqrsModule } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthFacade } from './auth.facade';

describe('AuthFacade', () => {
  let service: AuthFacade;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [AuthFacade],
    }).compile();

    service = module.get<AuthFacade>(AuthFacade);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
