import { useTranslation } from 'react-i18next';
import Page from 'src/pages/Page';
import { columns } from './UserColums';
import { useEffect, useState } from 'react';
import { CompanyModel, CompanyViewModel, orgDeptService } from 'src/lib/services/orgDeptService';
// import CompanyForm from './CompanyForm';
import { useFormStatus } from 'src/lib/common';
import { Button } from 'src/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import Toolbar from 'src/components/ui/Toolbar';
import DataTable from 'src/components/ui/datatable/DataTable';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'src/components/ui/form';
import { Input } from 'src/components/ui/input';
import Combobox from 'src/components/ui/Combobox';
import { OptionModel, optionService } from 'src/lib/services/optionService';

const CompanyPage = () => {
  const { t } = useTranslation();
  const { formOpen, setFormOpen, formData, setFormData } = useFormStatus(
    orgDeptService.companyFormState
  );
  const [reloadData, setReloadData] = useState(0);
  const [filter, setFilter] = useState<CompanyModel>();
  const [companyList, setCompanyList] = useState<CompanyViewModel[]>();

  const formSchema = z.object({
    did: z.string().min(1, { message: t('message.required') }),
    userName: z.string().trim().optional(),
    email: z.string().trim().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      did: '',
      userName: '',
      email: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    // setFilter(values);
  };

  useEffect(() => {
    async function fetchData() {
      // setCompanyList(await orgDeptService.companyList());
    }

    fetchData();
  }, []);

  return (
    <Page title={t('page.OrgUser')}>
      <h1>{t('page.OrgUser')}</h1>

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

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="my-4 grid w-full grid-cols-1 gap-4 sm:grid-cols-4">
            <FormField
              control={form.control}
              name="did"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('field.company')}</FormLabel>
                  <FormControl>
                    <Combobox
                      value={field.value}
                      onSelect={(item) => form.setValue(field.name, item.value)}
                      api={optionService.authCompanyList}
                      isInputManual
                      className="w-full"
                      contentClassName="min-w-[200px] w-min"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('field.userName')}</FormLabel>
                  <FormControl>
                    <Input {...field} className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('field.email')}</FormLabel>
                  <FormControl>
                    <Input {...field} className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center">
              <Button type="submit">
                <FontAwesomeIcon icon={faSearch} />
              </Button>
            </div>
          </div>
        </form>
      </Form>
      {/* 
      <DataTable
        queryKey="queryCompany"
        columns={columns}
        reloadData={reloadData}
        filter={filter}
        api={orgDeptService.queryCompanyAPI}
      /> */}

      {/* <CompanyForm
        open={formOpen}
        setOpen={setFormOpen}
        data={formData}
        setReloadData={setReloadData}
      /> */}
    </Page>
  );
};

export default CompanyPage;
