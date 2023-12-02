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
  companyList() {
    return pmAPI.get<CompanyViewModel[]>('/api/OrgDepts/CompanyList').then((data) => data.data);
  }

  orgDepts(data: OrgDeptsModel) {
    return pmAPI.post<OrgDeptsViewModel[]>('/api/OrgDepts', data).then((data) => data.data);
  }
}

export const orgDeptService = new OrgDeptService();
