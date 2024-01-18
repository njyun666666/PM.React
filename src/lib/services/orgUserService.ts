import { formState } from '../common';

export interface QueryUsersModel {
  rootDid: string;
  name?: string;
  email?: string;
}

export interface QueryUsersViewModel {
  uid: string;
  rootDid: string;
  name?: string;
  email?: string;
}

class OrgUserService {
  formState = formState<QueryUsersViewModel>();
  readonly queryAPI = '/api/OrgUsers/QueryUsers';
}

export const orgUserService = new OrgUserService();
