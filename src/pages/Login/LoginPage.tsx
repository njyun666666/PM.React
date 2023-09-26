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
import { Button } from 'src/components/ui/button';
import { z } from 'zod';

const LoginPage = () => {
  const formSchema = z.object({
    email: z.string().email().trim().min(1, { message: 'Required' }).toLowerCase(),
    password: z.string().trim().min(1, { message: 'Required' }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: 'admin@example.com',
      password: 'demo123456',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  };

  return (
    <Page title="Login">
      <div className="flex h-screen w-full flex-col items-center">
        <div className="mb-16 mt-8">
          <h1 className="text-2xl font-bold">PM</h1>
        </div>

        <div className="w-full p-2 md:w-2/5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>EMail</FormLabel>
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </Page>
  );
};

export default LoginPage;
