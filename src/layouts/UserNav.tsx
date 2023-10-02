import { Globe, LogOut, Palette, User } from 'lucide-react';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from 'src/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from 'src/components/ui/dropdown-menu';
import { login } from 'src/lib/services/login';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

const UserNav = () => {
  const { t } = useTranslation();
  const payload = login.payload();
  const iconClass = 'mr-2 h-4 w-4';
  const [lang, setLang] = useState<string>(localStorage.lang);
  const [theme, setTheme] = useState<string>(localStorage.theme);

  const handleThemeChange = (val: string) => {
    if (val === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    localStorage.theme = val;
    setTheme(val);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarImage src={payload?.photoURL} />
          <AvatarFallback>
            <User className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{payload?.sub}</p>
            {/* <p className="text-xs leading-none text-muted-foreground">m@example.com</p> */}
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Globe className={iconClass} />
              <span>{t('UserNav.Language')}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup
                  value={lang}
                  onValueChange={(val) => {
                    i18n.changeLanguage(val);
                    setLang(val);
                  }}
                >
                  <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="zh-Hant">中文</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Palette className={iconClass} />
              <span>{t('UserNav.Theme')}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup value={theme} onValueChange={handleThemeChange}>
                  <DropdownMenuRadioItem value="light">{t('UserNav.Light')}</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="dark">{t('UserNav.Dark')}</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => login.logout()}>
          <LogOut className={iconClass} />
          <span>{t('UserNav.Logout')}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNav;
