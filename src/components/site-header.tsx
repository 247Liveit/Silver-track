import { useLocation } from 'react-router-dom';
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { pageTitles } from '@/lib/constants/URLS';

export function SiteHeader() {
  const location = useLocation();

  // Get the title based on the current route
  const title = pageTitles[location.pathname] || 'Default Title';

  return (
    <header className=" group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="font-bold text-xl">{title}</h1>
      </div>
    </header>
  );
}
