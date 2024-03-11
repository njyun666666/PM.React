import { useTranslation } from 'react-i18next';
import Page from 'src/pages/Page';
import { columns } from './UserColums';
import { useState } from 'react';
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
// import Combobox from 'src/components/ui/Combobox';
import { optionService } from 'src/lib/services/optionService';
import { OrgUserQueryModel, orgUserService } from 'src/lib/services/orgUserService';
import UserForm from './UserForm';
import SelectAPI from 'src/components/ui/SelectAPI';

const CompanyPage = () => {
  const { t } = useTranslation();
  const { formOpen, setFormOpen, formData, setFormData } = useFormStatus(orgUserService.formState);
  const [reloadData, setReloadData] = useState(new Date());
  const [filter, setFilter] = useState<OrgUserQueryModel>();

  const formSchema = z.object({
    rootDid: z.string().min(1, { message: t('message.required') }),
    name: z.string().trim().optional(),
    email: z.string().trim().optional(),
    reloadData: z.date().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rootDid: '',
      name: '',
      email: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    values.reloadData = new Date();
    setFilter(values);
  };

  return (
    <Page title={t('page.OrgUser')}>
      <h1>{t('page.OrgUser')}</h1>
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
          <div className="my-4 grid w-full grid-cols-1 gap-4 sm:grid-cols-4">
            <FormField
              control={form.control}
              name="rootDid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('field.company')}</FormLabel>
                  <FormControl>
                    <SelectAPI
                      optionQueryProps={{ api: optionService.authCompanyList }}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('field.name')}</FormLabel>
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
            <div className="flex ">
              <Button type="submit" className="mt-8">
                <FontAwesomeIcon icon={faSearch} />
              </Button>
            </div>
          </div>
        </form>
      </Form>

      <DataTable
        columns={columns}
        reloadData={reloadData}
        filter={filter}
        api={orgUserService.queryAPI}
        queryEnabled={!!filter}
        queryOptions={{
          staleTime: Infinity,
        }}
      />

      <UserForm
        open={formOpen}
        setOpen={setFormOpen}
        data={formData}
        setReloadData={setReloadData}
      />
    </Page>
  );
};

export default CompanyPage;
