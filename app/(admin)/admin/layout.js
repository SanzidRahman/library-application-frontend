import Sidebar from "@/components/AppSidebar";
import Topbar from "@/components/Topbar";
import { SidebarProvider } from "@/components/ui/sidebar";

const layout = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        {/* Sidebar */}
      <Sidebar />

        {/* Main area */}
        <main className="flex flex-col flex-1">
          {/* Topbar (fixed height) */}
          <div className="h-16">
            <Topbar />
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-4 pt-4">{children}</div>

          {/* Footer */}
          <div className="h-10 border-t flex justify-center items-center">
            All Right reserved To Mustafizur Rahman
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default layout;
