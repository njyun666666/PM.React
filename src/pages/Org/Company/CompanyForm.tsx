import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogForm,
  DialogHeader,
  DialogMain,
  DialogScrollArea,
  DialogTitle,
} from 'src/components/ui/dialog';
import { Input } from 'src/components/ui/input';
import { Button, ButtonStateType } from 'src/components/ui/button';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { CompanyViewModel, orgDeptService } from 'src/lib/services/orgDeptService';
import * as z from 'zod';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'src/components/ui/form';
import { useForm } from 'react-hook-form';
import { toast } from 'src/components/ui/use-toast';

interface CompanyFormProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  data?: CompanyViewModel;
  setReloadData: Dispatch<SetStateAction<Date>>;
}

const CompanyForm = ({ open, setOpen, data, setReloadData }: CompanyFormProps) => {
  const { t } = useTranslation();
  const [btnState, setBtnState] = useState<ButtonStateType>();
  const [isAdd, setIsAdd] = useState(true);

  const formSchema = z.object({
    did: z.string(),
    deptName: z
      .string()
      .trim()
      .min(1, { message: t('message.required') })
      .max(50),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      did: '',
      deptName: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setBtnState('loading');

    orgDeptService
      .company(values)
      .then(() => {
        setReloadData(new Date());
        setBtnState('success');
        toast({ description: t(isAdd ? 'message.AddSuccess' : 'message.EditSuccess') });
        setOpen(false);
      })
      .catch(() => {
        toast({
          variant: 'destructive',
          description: t(isAdd ? 'message.AddFail' : 'message.EditFail'),
        });
        setBtnState('error');
      });
  };

  useEffect(() => {
    if (open) {
      setIsAdd(data === undefined);
      form.reset(data);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <Form {...form}>
          <DialogForm onSubmit={form.handleSubmit(onSubmit)}>
            <DialogMain>
              <DialogHeader>
                <DialogTitle>
                  {t(isAdd ? 'title.Add' : 'title.Edit', { title: t('field.company') })}
                </DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>

              <DialogScrollArea>
                <div className="grid grid-cols-1 gap-5">
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
                <Button type="submit" state={btnState} setState={setBtnState}>
                  {t('action.Save')}
                </Button>
              </DialogFooter>
            </DialogMain>
          </DialogForm>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CompanyForm;
