export abstract class UserDataService {
  abstract getUserData(id: string): Promise<any>;
}
