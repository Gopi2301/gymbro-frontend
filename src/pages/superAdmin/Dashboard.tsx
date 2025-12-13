import { Sidebar } from "./components/Sidebar";

const SuperAdminDashboard = () => {
  return (
   <div className="flex flex-col md:flex-row min-h-screen bg-background-dark">
    <Sidebar />
    <main className="flex-1 flex flex-col">
      
    </main>
   </div>
  )
}

export default SuperAdminDashboard