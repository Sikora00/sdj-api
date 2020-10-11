import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { SlackApiService } from '@sdj/shared/domain';
import { createSpyObj } from 'jest-createspyobj';
import { LoginHandler } from './login.handler';

describe('LoginHandler', () => {
  let handler: LoginHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginHandler,
        { provide: JwtService, useValue: createSpyObj(JwtService) },
        { provide: SlackApiService, useValue: createSpyObj(SlackApiService) },
      ],
    }).compile();

    handler = module.get<LoginHandler>(LoginHandler);
  });

  test('creates itself', () => {
    expect(handler).toBeDefined();
  });
});
