import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogFormStyle,
  DialogHeader,
  DialogMain,
  DialogScrollArea,
  DialogTitle,
} from 'src/components/ui/dialog';
import { Label } from 'src/components/ui/label';
import { Input } from 'src/components/ui/input';
import { Button } from 'src/components/ui/button';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { CompanyViewModel } from 'src/lib/services/orgDeptService';
import * as z from 'zod';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'src/components/ui/form';
import { useForm } from 'react-hook-form';
import { cn } from 'src/lib/utils';

interface CompanyFormProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  data: CompanyViewModel;
}

const CompanyForm = ({ open, setOpen, data }: CompanyFormProps) => {
  const { t } = useTranslation();

  const formSchema = z.object({
    did: z.string(),
    deptName: z
      .string()
      .trim()
      .min(1, { message: t('messages.required') })
      .max(100)
      .toLowerCase(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  // const handleOpenChange = (open: boolean) => {
  //   // console.log(open, data);
  //   // if (open) {
  //   //   form.reset(data);
  //   // }
  //   setOpen(open);
  // };

  useEffect(() => {
    // console.log(open, data);
    if (open) {
      form.reset(data);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:h-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className={cn(DialogFormStyle)}>
            <DialogMain>
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>

              <DialogScrollArea>
                <div className="space-y-8 ">
                  <FormField
                    control={form.control}
                    name="deptName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('field.companyName')}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </DialogScrollArea>

              <DialogFooter>
                <Button type="submit">{t('form.Actions.Save')}</Button>
              </DialogFooter>
            </DialogMain>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CompanyForm;
