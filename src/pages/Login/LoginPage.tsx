import { useForm } from 'react-hook-form';
import Page from '../Page';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'src/components/ui/form';
import { Input } from 'src/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, ButtonStateType } from 'src/components/ui/button';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { login } from 'src/lib/services/login';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import FieldMessage from 'src/components/FieldMessage';
import { useState } from 'react';
import { ResponseErrors } from 'src/lib/api/pmAPI';
import { Alert, AlertDescription } from 'src/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { AxiosError } from 'axios';

const LoginPage = () => {
  const { t } = useTranslation();
  const setLoginState = useSetRecoilState(login.loginState);
  const navigate = useNavigate();
  const [error, setError] = useState<ResponseErrors>();
  const [loginBtnState, setLoginBtnState] = useState<ButtonStateType>();

  const formSchema = z.object({
    email: z
      .string()
      .email()
      .trim()
      .min(1, { message: t('messages.required') })
      .toLowerCase(),
    password: z
      .string()
      .trim()
      .min(1, { message: t('messages.required') }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: 'admin@example.com',
      password: 'demo123456',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoginBtnState('loading');

    await login
      .login(values)
      .then(({ data }) => {
        login.setToken(data);
        setLoginState(true);
        navigate('/', { replace: true });
      })
      .catch((error: AxiosError<ResponseErrors>) => {
        setError(error.response?.data);
      });

    setLoginBtnState(undefined);
  };

  return (
    <Page title={t('login.title')}>
      <div className="flex h-screen w-full flex-col items-center p-2">
        <div className="mb-16 mt-8">
          <h1 className="text-2xl font-bold">{t('website.title')}</h1>
        </div>

        <div className="w-full md:w-2/5">
          {error && (
            <Alert variant="destructive" className="mb-8">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <FieldMessage messages={error.errors} />
              </AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('field.email')}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('field.password')}</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                state={loginBtnState}
                setState={setLoginBtnState}
                className="w-full"
              >
                {t('login.login')}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </Page>
  );
};

export default LoginPage;
