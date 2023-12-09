import { atom } from 'recoil';
import pmAPI from '../api/pmAPI';

export interface CompanyViewModel {
  did: string;
  deptName: string;
}

export interface OrgDeptsModel {
  did: string;
}

export interface OrgDeptsViewModel {
  did: string;
  deptName: number;
  parentDid?: string;
  parentDeptName?: string;
  rootDid: string;
  companyName: string;
  enable: boolean;
  sort: number;
  expand: boolean;
}

class OrgDeptService {
  CompanyFormOpenState = atom<boolean>({
    key: 'CompanyFormOpenState',
    default: false,
  });

  CompanyFormDataState = atom<CompanyViewModel>({
    key: 'CompanyFormDataState',
    default: undefined,
  });

  companyList() {
    return pmAPI
      .get<CompanyViewModel[]>('/api/OrgDepts/CompanyList')
      .then((data) => data.data)
      .catch(() => [] as CompanyViewModel[]);
  }

  orgDepts(data: OrgDeptsModel) {
    return pmAPI
      .post<OrgDeptsViewModel[]>('/api/OrgDepts', data)
      .then((data) => data.data)
      .catch(() => [] as OrgDeptsViewModel[]);
  }
}

export const orgDeptService = new OrgDeptService();
