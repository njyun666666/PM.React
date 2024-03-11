import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Page from '../../Page';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'src/components/ui/form';
import SelectAPI from 'src/components/ui/SelectAPI';
import { OptionModel, optionService } from 'src/lib/services/optionService';
import { Input } from 'src/components/ui/input';
import { Button } from 'src/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Combobox from 'src/components/ui/Combobox';

const AuthUserPage = () => {
  const { t } = useTranslation();
  const formSchema = z.object({
    rootDid: z.string().min(1, { message: t('message.required') }),
    name: z.string().min(1, { message: t('message.required') }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rootDid: '',
      name: '',
    },
  });

  const watchRootDid = form.watch('rootDid');

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // values.reloadData = new Date();
    console.log(values);
    // setFilter(values);
  };

  return (
    <Page title={t('page.AuthUser')}>
      <h1>{t('page.AuthUser')}</h1>

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
                      optionQueryProps={{
                        api: optionService.authCompanyList,
                      }}
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
                    <SelectAPI
                      optionQueryProps={{
                        api: optionService.authCompanyUserList,
                        routerPara: [watchRootDid],
                      }}
                      onValueChange={field.onChange}
                      queryOptions={{ enabled: !!watchRootDid }}
                    />
                    {/* <Combobox
                      optionQueryProps={{
                        api: optionService.authCompanyUserList,
                        routerPara: [watchRootDid],
                      }}
                      onValueChange={field.onChange}
                      className="w-full"
                      contentClassName="min-w-[200px] w-min"
                    /> */}
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
    </Page>
  );
};

export default AuthUserPage;
