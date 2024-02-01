import pmAPI from '../api/pmAPI';

export interface OptionModel {
  value: string;
  label: string;
}

class OptionService {
  readonly authCompanyList = '/api/Option/AuthCompanyList';

  query(api: string, data?: string) {
    return pmAPI
      .get<OptionModel[]>(`${api}/${data ?? ''}`)
      .then((data) => data.data)
      .catch(() => [] as OptionModel[]);
  }
}

export const optionService = new OptionService();
