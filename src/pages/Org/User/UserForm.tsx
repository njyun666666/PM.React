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
import { OrgUserModel, orgUserService } from 'src/lib/services/orgUserService';
import { Checkbox } from 'src/components/ui/checkbox';
import { optionService } from 'src/lib/services/optionService';
import SelectAPI from 'src/components/ui/SelectAPI';
import { DataTableColumnHeader } from 'src/components/ui/datatable/DataTableColumnHeader';
import FormDetail from 'src/components/ui/FormDetail/FormDetail';
import { FormDetailColumnDef } from 'src/components/ui/FormDetail/FormDetailLib';

interface UserFormProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  data?: OrgUserModel;
  setReloadData: Dispatch<SetStateAction<Date>>;
}

const UserForm = ({ open, setOpen, data, setReloadData }: UserFormProps) => {
  const { t } = useTranslation();
  const [btnState, setBtnState] = useState<ButtonStateType>();
  const [isAdd, setIsAdd] = useState(true);

  const detailSchema = z.object({
    did: z
      .string()
      .trim()
      .min(1, { message: t('message.required') }),
    enable: z.boolean().optional(),
  });

  const formSchema = z.object({
    uid: z.string(),
    name: z
      .string()
      .trim()
      .min(1, { message: t('message.required') })
      .max(50),
    email: z
      .string()
      .trim()
      .min(1, { message: t('message.required') })
      .max(50)
      .email({ message: t('message.InvalidEmail') }),
    enable: z.boolean(),
    depts: detailSchema
      .array()
      .min(1, { message: t('message.At least {{number}} entry is required', { number: 1 }) }),
  });

  type FormSchema = z.infer<typeof formSchema>;
  type DetailSchema = z.infer<typeof detailSchema>;

  const defaultValues: OrgUserModel = {
    uid: '',
    name: '',
    email: '@example.com',
    enable: true,
    depts: [{ did: '', enable: true }],
  };

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const columns: FormDetailColumnDef<DetailSchema, unknown, FormSchema>[] = [
    {
      accessorKey: 'did',
      enableSorting: false,
      isEdit: true,
      header: ({ column }) => <DataTableColumnHeader column={column} title={['field.company']} />,
      cell: ({ row }) => {
        return <div>{row.original.did}</div>;
      },
      formCell: (formControl, rowIndex) => {
        return (
          <FormField
            control={formControl}
            name={`depts.${rowIndex}.did`}
            render={({ field }) => (
              <FormItem>
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
        );
      },
    },
    {
      accessorKey: 'enable',
      enableSorting: false,
      isEdit: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={['field.enable']} className=" text-center" />
      ),
      cell: ({ row }) => {
        return (
          <div className="text-center">
            <Checkbox checked={row.original.enable} disabled />
          </div>
        );
      },
      formCell: (formControl, rowIndex) => {
        return (
          <FormField
            control={formControl}
            name={`depts.${rowIndex}.enable`}
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-row items-center justify-center space-x-3 space-y-0 overflow-hidden">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      },
    },
  ];

  const onSubmit = (values: FormSchema) => {
    setBtnState('loading');

    orgUserService
      .postUsers(values)
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
    const fetchData = async () => {
      if (open) {
        setIsAdd(data === undefined);

        if (data !== undefined) {
          const depts = await orgUserService.getDepts(data.uid);
          form.reset({ ...data, depts: depts });
        }
      } else {
        form.reset(defaultValues);
      }
    };

    fetchData();
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:h-[90%]" onPointerDownOutside={(e) => e.preventDefault()}>
        <Form {...form}>
          <DialogForm onSubmit={form.handleSubmit(onSubmit)}>
            <DialogMain>
              <DialogHeader>
                <DialogTitle>
                  {t(isAdd ? 'title.Add' : 'title.Edit', { title: t('field.user') })}
                </DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>

              <DialogScrollArea>
                <div className="grid grid-cols-1 gap-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('field.name')}</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="enable"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex flex-row items-center space-x-3 space-y-0 overflow-hidden">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <FormLabel className="font-normal">{t('field.enable')}</FormLabel>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="col-span-full">
                    <FormField
                      control={form.control}
                      name="depts"
                      render={() => (
                        <FormItem>
                          <FormDetail
                            title={<FormLabel>{t('field.company')}</FormLabel>}
                            columns={columns}
                            isEdit
                            fieldArrayConfig={{ control: form.control, name: 'depts' }}
                            appendConfig={{ value: defaultValues.depts as DetailSchema[] }}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
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

export default UserForm;
