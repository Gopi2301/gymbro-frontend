import { LayoutDashboard, Users, Activity, Settings } from "lucide-react";

export const SUPERADMIN_SIDEBAR_ITEMS = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/superadmin/dashboard",
  },
  {
    label: "Coaches",
    icon: Users,
    path: "/superadmin/coaches",
  },
  {
    label: "Exercises",
    icon: Activity,
    path: "/superadmin/exercises",
  },    
  {
    label: "Settings",
    icon: Settings,
    path: "/superadmin/settings",
  },
];