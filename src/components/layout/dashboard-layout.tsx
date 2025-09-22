import 'react-toastify/dist/ReactToastify.css';
import Overlay from '../Overlay';
import { useOverlay } from '@/providers/OverlayContext';
import { Toaster } from '../ui/toaster';
import { SidebarInset, SidebarProvider } from '../ui/sidebar';
import { SiteHeader } from '../site-header';
import { AppSidebar } from './app-sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode; }) {

  const { showOverlay } = useOverlay();
  return (

    <div className="flex h-screen overflow-hidden bg-secondary">

      <main className="relative flex-1 overflow-y-auto bg-background focus:outline-none ">
        <SidebarProvider>
         <AppSidebar variant="inset"  />
          <SidebarInset>
            <SiteHeader />
            <div className="flex flex-1 flex-col  shadow-lg">
              <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                  {children}

                  <Overlay show={showOverlay} />
                </div>
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>

      </main>
      <Toaster />

    </div>
  );
}
