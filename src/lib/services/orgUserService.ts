import { formState } from '../common';

export interface OrgUserQueryModel {
  rootDid: string;
  name?: string;
  email?: string;
}

export interface OrgUserViewModel {
  uid: string;
  email: string;
  name: string;
  photoUrl?: string;
  enable: boolean;
}

export interface OrgUserModel {
  uid: string;
  email: string;
  name: string;
  enable: boolean;
  depts?: OrgUserDeptModel[];
}

export interface OrgUserDeptModel {
  did: string;
}

class OrgUserService {
  formState = formState<OrgUserViewModel>();
  readonly queryAPI = '/api/OrgUsers/QueryUsers';
}

export const orgUserService = new OrgUserService();
