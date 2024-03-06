import pmAPI from '../api/pmAPI';

export interface OptionModel {
  value: string;
  label: string;
}

export interface OptionQueryProps {
  api: string;
  routerPara?: string[];
  filter?: object;
}

class OptionService {
  readonly authCompanyList = '/api/Option/AuthCompanyList';
  readonly authCompanyUserList = '/api/Option/AuthCompanyUserList';

  query({ api, routerPara, filter }: OptionQueryProps) {
    return pmAPI
      .get<OptionModel[]>(`${api}` + (routerPara ? `/${routerPara.join('/')}` : ''), {
        params: filter,
      })
      .then((data) => data.data)
      .catch(() => [] as OptionModel[]);
  }
}

export const optionService = new OptionService();
