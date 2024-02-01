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
import { useFieldArray, useForm } from 'react-hook-form';
import { cn } from 'src/lib/utils';
import { toast } from 'src/components/ui/use-toast';
import { OrgUserViewModel } from 'src/lib/services/orgUserService';
import { Checkbox } from 'src/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/select';
import { CompanyViewModel, orgDeptService } from 'src/lib/services/orgDeptService';
import { OptionModel, optionService } from 'src/lib/services/optionService';
import SelectAPI from 'src/components/ui/SelectAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from 'src/components/ui/datatable/DataTableColumnHeader';
import FormDetail, { FormDetailColumnDef } from 'src/components/ui/FormDetail';

interface UserFormProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  data?: OrgUserViewModel;
  setReloadData: Dispatch<SetStateAction<number>>;
}

const UserForm = ({ open, setOpen, data, setReloadData }: UserFormProps) => {
  const { t } = useTranslation();
  const [btnState, setBtnState] = useState<ButtonStateType>();
  const [isAdd, setIsAdd] = useState(true);
  const [companyList, setCompanyList] = useState<OptionModel[]>();

  const detailSchema = z.object({
    did: z.string(),
    enable: z.boolean(),
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
    did: z.string(),
    depts: detailSchema.array().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      uid: '',
      name: 'aaa',
      email: 'aa@aa.com',
      enable: true,
      did: '',
      depts: [
        { did: 'f1719f17ce05478d8ef3149c2754d5c8', enable: true },
        { did: 'efe8d4b6744d7b4d443ac51a59f59a31', enable: true },
      ],
    },
  });

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control: form.control,
    name: 'depts',
  });

  const depts = useFieldArray({
    control: form.control,
    name: 'depts',
  });

  // const deptData: z.infer<typeof detailSchema>[] = [
  //   { did: 'f1719f17ce05478d8ef3149c2754d5c8', enable: true },
  //   // { did: 'efe8d4b6744d7b4d443ac51a59f59a31', enable: true },
  // ];
  type formType = z.infer<typeof formSchema>;
  type detailType = z.infer<typeof detailSchema>;
  const columns: FormDetailColumnDef<detailType, unknown, formType>[] = [
    {
      accessorKey: 'did',
      enableSorting: false,
      header: ({ column }) => <DataTableColumnHeader column={column} title={['field.company']} />,
      formCell: (formControl, index) => {
        return (
          <FormField
            control={formControl}
            name={`depts.${index}.did`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <SelectAPI
                    api={optionService.authCompanyList}
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
      header: ({ column }) => <DataTableColumnHeader column={column} title={['field.enable']} />,
      formCell: (formControl, index) => {
        return (
          <FormField
            control={formControl}
            name={`depts.${index}.enable`}
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-row items-center space-x-3 space-y-0 overflow-hidden">
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

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // setBtnState('loading');
    console.log('values', values);

    // orgDeptService
    //   .company(values)
    //   .then(() => {
    //     setReloadData((prev) => prev + 1);
    //     setBtnState('success');
    //     toast({ description: t(isAdd ? 'message.AddSuccess' : 'message.EditSuccess') });
    //     setOpen(false);
    //   })
    //   .catch(() => {
    //     toast({
    //       variant: 'destructive',
    //       description: t(isAdd ? 'message.AddFail' : 'message.EditFail'),
    //     });
    //     setBtnState('error');
    //   });
  };

  useEffect(() => {
    if (open) {
      setIsAdd(data === undefined);
      form.reset(data);
    }
  }, [open]);

  // useEffect(() => {
  //   async function fetchData() {
  //     setCompanyList(await optionService.query(optionService.authCompanyList));
  //   }

  //   fetchData();
  // }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:h-[90%]">
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
                    <FormDetail
                      columns={columns}
                      fieldArrayConfig={{ control: form.control, name: 'depts' }}
                    />
                  </div>

                  {/* {
                    <div className="col-span-full">
                      <FormLabel>所屬公司</FormLabel>

                      <Button
                        type="button"
                        size="icon"
                        onClick={() => append([{ did: '', enable: true }])}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </Button>

                      <div className="">
                        {fields.map((field, index) => (
                          <div key={field.id} className="grid grid-cols-3">
                            <FormField
                              control={form.control}
                              name={`depts.${index}.did`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <SelectAPI
                                      api={optionService.authCompanyList}
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
                              name={`depts.${index}.enable`}
                              render={({ field }) => (
                                <FormItem>
                                  <div className="flex flex-row items-center space-x-3 space-y-0 overflow-hidden">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {t('field.enable')}
                                    </FormLabel>
                                  </div>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              onClick={() => remove(index)}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  } */}
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
