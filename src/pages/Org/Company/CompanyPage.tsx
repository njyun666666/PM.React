import { useTranslation } from 'react-i18next';
import Page from 'src/pages/Page';
import { DataTable } from './CompanyDataTable';
import { columns } from './CompanyColums';
import { useEffect, useState } from 'react';
import { CompanyViewModel, orgDeptService } from 'src/lib/services/orgDeptService';
import CompanyForm from './CompanyForm';
import { useFormStatus } from 'src/lib/common';
import { Button } from 'src/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Toolbar from 'src/components/ui/Toolbar';

const CompanyPage = () => {
  const { t } = useTranslation();
  // const [data, setData] = useState<CompanyViewModel[]>([]);
  const { formOpen, setFormOpen, formData, setFormData } = useFormStatus(
    orgDeptService.companyFormState
  );
  const [reloadData, setReloadData] = useState(0);

  useEffect(() => {
    async function fetchData() {
      // setData(await orgDeptService.companyList());
    }

    fetchData();
  }, []);

  return (
    <Page title={t('page.OrgCompany')}>
      <h1>{t('page.OrgCompany')}</h1>

      <Toolbar>
        <Button
          size="sm"
          onClick={() => {
            setFormData({ did: '', deptName: '' } as CompanyViewModel);
            setFormOpen(true);
          }}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          {t('action.Add')}
        </Button>
      </Toolbar>

      <DataTable columns={columns} reloadData={reloadData} />
      <CompanyForm
        open={formOpen}
        setOpen={setFormOpen}
        data={formData}
        setReloadData={setReloadData}
      />
    </Page>
  );
};

export default CompanyPage;
