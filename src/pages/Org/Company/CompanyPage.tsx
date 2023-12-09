import { useTranslation } from 'react-i18next';
import Page from 'src/pages/Page';
import { DataTable } from './CompanyDataTable';
import { columns } from './CompanyColums';
import { useEffect, useState } from 'react';
import { CompanyViewModel, orgDeptService } from 'src/lib/services/orgDeptService';
import { useRecoilState } from 'recoil';
import CompanyForm from './CompanyForm';
import { toast } from 'src/components/ui/use-toast';
import { Button } from 'src/components/ui/button';

const CompanyPage = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<CompanyViewModel[]>([]);
  const [formOpenState, setFormOpenState] = useRecoilState(orgDeptService.CompanyFormOpenState);
  const [formDataState, setFormDataState] = useRecoilState(orgDeptService.CompanyFormDataState);

  useEffect(() => {
    async function fetchData() {
      setData(await orgDeptService.companyList());
    }

    fetchData();
  }, []);

  return (
    <Page title={t('page.OrgCompany')}>
      <h1>{t('page.OrgCompany')}</h1>

      <DataTable columns={columns} data={data} />
      <CompanyForm open={formOpenState} setOpen={setFormOpenState} data={formDataState} />
    </Page>
  );
};

export default CompanyPage;
