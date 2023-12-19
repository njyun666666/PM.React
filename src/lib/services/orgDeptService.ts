import pmAPI from '../api/pmAPI';
import { formState } from '../common';

export interface CompanyModel {
  did?: string;
  deptName: string;
}

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
  companyFormState = formState<CompanyViewModel>();
  readonly queryCompanyAPI = '/api/OrgDepts/QueryCompany';

  companyList() {
    return pmAPI
      .get<CompanyViewModel[]>('/api/OrgDepts/CompanyList')
      .then((data) => data.data)
      .catch(() => [] as CompanyViewModel[]);
  }

  company(data: CompanyModel) {
    return pmAPI.post('/api/OrgDepts/Company', data);
  }

  orgDepts(data: OrgDeptsModel) {
    return pmAPI
      .post<OrgDeptsViewModel[]>('/api/OrgDepts', data)
      .then((data) => data.data)
      .catch(() => [] as OrgDeptsViewModel[]);
  }
}

export const orgDeptService = new OrgDeptService();
