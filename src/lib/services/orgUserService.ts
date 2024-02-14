import pmAPI from '../api/pmAPI';
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
  enable?: boolean;
}

class OrgUserService {
  formState = formState<OrgUserModel>();
  readonly queryAPI = '/api/OrgUsers/QueryUsers';

  getDepts(id: string) {
    return pmAPI
      .get<OrgUserDeptModel[]>(`/api/OrgUsers/Depts/${id}`)
      .then((data) => data.data)
      .catch(() => [] as OrgUserDeptModel[]);
  }

  postUsers(data: OrgUserModel) {
    return pmAPI.post('/api/OrgUsers', data);
  }
}

export const orgUserService = new OrgUserService();
