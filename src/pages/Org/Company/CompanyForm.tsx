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
import { cn } from 'src/lib/utils';
import { toast } from 'src/components/ui/use-toast';

interface CompanyFormProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  data: CompanyViewModel;
  setReloadData: Dispatch<SetStateAction<number>>;
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
      .max(100),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setBtnState('loading');

    orgDeptService
      .company(values)
      .then(() => {
        setReloadData((prev) => prev + 1);
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
    // console.log(open, data);
    if (open) {
      form.reset(data);

      if (data.did) {
        setIsAdd(false);
      } else {
        setIsAdd(true);
      }
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className={cn(DialogFormStyle)}>
            <DialogMain>
              <DialogHeader>
                <DialogTitle>
                  {t(isAdd ? 'title.Add' : 'title.Edit', { title: t('field.company') })}
                </DialogTitle>
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
                <Button type="submit" state={btnState} setState={setBtnState}>
                  {t('action.Save')}
                </Button>
              </DialogFooter>
            </DialogMain>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CompanyForm;
