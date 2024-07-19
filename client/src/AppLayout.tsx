import { Outlet } from "react-router-dom"
import applicationLogo from "/logo_main_t.png";
import useAuth from "./hooks/useAuth";

function AppLayout() {
  const { loading: authLoading } = useAuth();
  
  return <>
    <Outlet />
    <div className={`
      h-screen w-screen z-40 absolute left-0 top-0 backdrop-blur-md flex flex-col items-center justify-center pointer-events-none transition-all
        ${authLoading ? "opacity-100" : "opacity-0"}
      `}>
      <img src={applicationLogo} alt="Loading Application Logo" className="opacity-75 h-40 mb-16"/>
      <span className="font-poppins text-2xl animate-pulse">Loading your instance</span>
      <span className="text-xs text-neutral-600">The authentication process is going on.</span>
    </div>
  </>
}
export default AppLayout