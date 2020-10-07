import { Test } from '@nestjs/testing';
import { AuthFacade } from '@sdj/backend/auth/core/application-services';
import { createSpyObj } from 'jest-createspyobj';
import { BackendAuthUiRestController } from './backend-auth-ui-rest.controller';

describe('BackendAuthUiRestController', () => {
  let controller: BackendAuthUiRestController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [{ provide: AuthFacade, useValue: createSpyObj(AuthFacade) }],
      controllers: [BackendAuthUiRestController],
    }).compile();

    controller = module.get(BackendAuthUiRestController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
