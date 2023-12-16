import { useTranslation } from 'react-i18next';
import Page from 'src/pages/Page';
import { DataTable } from './DeptDataTable';
import { columns } from './DeptColums';
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
import { Button } from 'src/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import {
  CompanyViewModel,
  OrgDeptsViewModel,
  orgDeptService,
} from 'src/lib/services/orgDeptService';

const DeptPage = () => {
  const { t } = useTranslation();
  const [companyList, setCompanyList] = useState<CompanyViewModel[]>();
  const [data, setData] = useState<OrgDeptsViewModel[]>([]);

  const FormSchema = z.object({
    did: z.string().min(1, { message: t('message.required') }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      did: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setData(await orgDeptService.orgDepts(data));
  };

  useEffect(() => {
    async function fetchData() {
      setCompanyList(await orgDeptService.companyList());
    }

    fetchData();
  }, []);

  return (
    <Page title={t('page.OrgDept')}>
      <h1>{t('page.OrgDept')}</h1>

      <div className="flex items-center py-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
            <FormField
              control={form.control}
              name="did"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('field.company')}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {companyList?.map((item) => (
                        <SelectItem key={item.did} value={item.did}>
                          {item.deptName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex">
              <div className="grow"></div>
              <Button type="submit">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-2" />
                <span>{t('action.Search')}</span>
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <DataTable columns={columns} data={data} />
    </Page>
  );
};

export default DeptPage;
