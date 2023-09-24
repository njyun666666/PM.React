import { ChevronRight, Loader2, Mail } from 'lucide-react';
import { Button } from './components/ui/button';

const App = () => {
  localStorage.theme = 'dark';

  if (localStorage.theme === 'light') {
    document.documentElement.classList.remove('dark');
  } else {
    document.documentElement.classList.add('dark');
  }

  return (
    <>
      <div className="space-x-2 space-y-2 p-5">
        <Button size={'sm'}>test</Button>
        <Button>test</Button>
        <Button size={'lg'}>test</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Button</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
        <Button variant="outline" size="icon">
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button>
          <Mail className="mr-2 h-4 w-4" /> Login with Email
        </Button>
        <Button disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </Button>
      </div>
    </>
  );
};

export default App;
