import { Button } from "@/components/ui/button";
import { logout } from "@/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const handleLogout = () => {
    dispatch(logout());
    navigate("/sign-in");
  };

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Coach Dashboard</h1>
          <Button onClick={handleLogout} variant="destructive">
            Logout
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card p-6 rounded-lg shadow-lg border border-border">
            <h2 className="text-xl font-semibold mb-4 text-white">
              My Members
            </h2>
            <p className="text-gray-400">Manage your gym members here.</p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-lg border border-border">
            <h2 className="text-xl font-semibold mb-4 text-white">
              Workout Plans
            </h2>
            <p className="text-gray-400">Create and assign workout plans.</p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-lg border border-border">
            <h2 className="text-xl font-semibold mb-4 text-white">Analytics</h2>
            <p className="text-gray-400">View performance metrics.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
