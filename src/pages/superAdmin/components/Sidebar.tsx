import { LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { SUPERADMIN_SIDEBAR_ITEMS } from "@/constants/sidebar";

// Define the sidebar items configuration
// const SIDEBAR_ITEMS = [
//   {
//     label: "Dashboard",
//     icon: LayoutDashboard,
//     path: "/superadmin/dashboard",
//   },
//   {
//     label: "Coaches",
//     icon: Users,
//     path: "/superadmin/coaches",
//   },
//   {
//     label: "Exercises",
//     icon: Activity,
//     path: "/superadmin/exercises",
//   },    
//   {
//     label: "Settings",
//     icon: Settings,
//     path: "/superadmin/settings",
//   },
// ];

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  path: string;
  isActive: boolean;
}

const SidebarItem = ({ icon: Icon, label, path, isActive }: SidebarItemProps) => {
 
  return (
    <Link
      to={path}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group",
        isActive
          ? "bg-primary text-primary-foreground font-medium"
          : "text-gray-400 hover:bg-white/5 hover:text-white"
      )}
    >
      <Icon className={cn("w-5 h-5", isActive ? "text-primary-foreground" : "text-gray-400 group-hover:text-white")} />
      <span>{label}</span>
    </Link>
  );
};

export const Sidebar = () => {
  const location = useLocation();

  // Check the role of the user and render the sidebar items accordingly
  const role = localStorage.getItem("role");
  const SIDEBAR_ITEMS = role === "superadmin" ? SUPERADMIN_SIDEBAR_ITEMS : [];

  return (
    <aside className="flex flex-col border-r  h-screen border-white/5 bg-[#111813]">
      <div className="flex flex-1 flex-col p-4">
        {/* Logo Section */}
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex gap-3 items-center px-2 py-2">
            <img src="/logo.svg" alt="logo" className="w-8 h-8 md:w-10 md:h-10" />
            <h1 className="text-xl text-white font-bold leading-none mb-0 tracking-tight">GYMBRO</h1>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-1 flex-1">
          {SIDEBAR_ITEMS.map((item) => (
            <SidebarItem
              key={item.path}
              icon={item.icon}
              label={item.label}
              path={item.path}
              isActive={location.pathname === item.path}
            />
          ))}
        </nav>

        {/* Bottom Section (Logout) */}
        <div className="mt-auto pt-4 border-t border-white/5">
          <button className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
