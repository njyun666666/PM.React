import { Button } from 'src/components/ui/button';
import Page from '../Page';
import { toast } from 'src/components/ui/use-toast';
import { useAlertDialog } from 'src/components/ui/Alert-DialogMain';

const DashboardPage = () => {
  const { alertDialog } = useAlertDialog();

  const confirmHandle = async () => {
    const result = await alertDialog({ title: 'Test Title', content: 'this is content' });
    toast({ title: '1: ' + result.toString(), variant: result ? 'default' : 'destructive' });
  };

  const confirmHandle2 = async () => {
    const result = await alertDialog({
      title: 'Test 2',
      content: 'this is content',
      ok: 'yes',
      Cancel: 'no',
    });
    toast({ title: '2: ' + result.toString(), variant: result ? 'default' : 'destructive' });
  };

  const confirmHandle3 = async () => {
    const result = await alertDialog({ title: 'Test 3', content: 'this is content' });
    toast({ title: '3: ' + result.toString(), variant: result ? 'default' : 'destructive' });
  };

  return (
    <Page title="Dashboard">
      <div className="space-y-2">
        <div className="space-x-2">
          <Button onClick={confirmHandle}>confirm1</Button>
          <Button onClick={confirmHandle2}>confirm2</Button>
          <Button onClick={confirmHandle3}>confirm3</Button>
        </div>
        <div className="rounded border p-2">
          Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard
        </div>
        <div className="rounded border p-2">
          Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard
        </div>
        <div className="rounded border p-2">
          Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard
        </div>
        <div className="rounded border p-2">
          Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard
        </div>
        <div className="rounded border p-2">
          Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard
        </div>
        <div className="rounded border p-2">
          Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard
        </div>
        <div className="rounded border p-2">
          Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard
        </div>
        <div className="rounded border p-2">
          Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard
        </div>
        <div className="rounded border p-2">
          Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard
        </div>
        <div className="rounded border p-2">
          Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard
        </div>
        <div className="rounded border p-2">
          Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard
        </div>
        <div className="rounded border p-2">
          Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard
        </div>
        <div className="rounded border p-2">
          Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard
        </div>
        <div className="rounded border p-2">
          Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard
        </div>
        <div className="rounded border p-2">
          Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard
        </div>
        <div className="rounded border p-2">
          Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard
        </div>
        <div className="rounded border p-2">
          Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard
        </div>
        <div className="rounded border p-2">
          Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard
        </div>
        <div className="rounded border p-2">
          Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard
        </div>
        <div className="rounded border p-2">
          Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard
        </div>
        <div className="rounded border p-2">
          Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard
        </div>
        <div className="rounded border p-2">
          Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard
        </div>
        <div className="rounded border p-2">
          Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard
        </div>
        <div className="rounded border p-2">
          Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard
        </div>
        <div className="rounded border p-2">
          Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard
        </div>
        <div className="rounded border p-2">
          Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard
        </div>
        <div className="rounded border p-2">
          Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard
        </div>
        <div className="rounded border p-2">
          Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard
        </div>
        <div className="rounded border p-2">
          Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard
        </div>
        <div className="rounded border p-2">
          Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard
        </div>
        <div className="rounded border p-2">
          Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard
        </div>
        <div className="rounded border p-2">
          Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard
        </div>
        <div className="rounded border p-2">
          Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard
        </div>
        <div className="rounded border p-2">
          Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard
        </div>
        <div className="rounded border p-2">
          Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard
        </div>
        <div className="rounded border p-2">
          Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard
        </div>
        <div className="rounded border p-2">
          Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard
        </div>
        <div className="rounded border p-2">
          Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard
        </div>
        <div className="rounded border p-2">
          Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard
        </div>
        <div className="rounded border p-2">
          Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard Dashboard
        </div>
      </div>
    </Page>
  );
};

export default DashboardPage;
