import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";
import Sidebar from "../common/Sidebar";

function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FCFAFE] dark:bg-[#111014]">
      <Navbar onMenuClick={() => setMobileOpen(true)} />

      <div className="flex items-start">
        <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-[1800px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
