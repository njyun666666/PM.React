import { useTranslation } from 'react-i18next';
import Page from 'src/pages/Page';
import { columns } from './CompanyColums';
import { useState } from 'react';
import { CompanyModel, orgDeptService } from 'src/lib/services/orgDeptService';
import CompanyForm from './CompanyForm';
import { useFormStatus } from 'src/lib/common';
import { Button } from 'src/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import Toolbar from 'src/components/ui/Toolbar';
import DataTable from 'src/components/ui/datatable/DataTable';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from 'src/components/ui/form';
import { Input } from 'src/components/ui/input';

const CompanyPage = () => {
  const { t } = useTranslation();
  const { formOpen, setFormOpen, formData, setFormData } = useFormStatus(
    orgDeptService.companyFormState
  );
  const [reloadData, setReloadData] = useState(new Date());
  const [filter, setFilter] = useState<CompanyModel>();

  const formSchema = z.object({
    deptName: z.string().trim().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setFilter(values);
  };

  return (
    <Page title={t('page.OrgCompany')}>
      <h1>{t('page.OrgCompany')}</h1>

      <Toolbar>
        <Button
          size="sm"
          onClick={() => {
            setFormData(undefined);
            setFormOpen(true);
          }}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          {t('action.Add')}
        </Button>
      </Toolbar>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="my-4 grid w-full grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="deptName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('field.companyName')}</FormLabel>
                  <FormControl>
                    <Input {...field} className="w-full" />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex items-end">
              <Button type="submit">
                <FontAwesomeIcon icon={faSearch} />
              </Button>
            </div>
          </div>
        </form>
      </Form>

      <DataTable
        queryKey="queryCompany"
        columns={columns}
        reloadData={reloadData}
        filter={filter}
        api={orgDeptService.queryCompanyAPI}
      />

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
