import { LogOutIcon, UserCircle } from "lucide-react";
import useAuth from "../hooks/useAuth";

interface UserProfileProps {
  menuPosition?: "top" | "bottom";
}

function UserProfile({ menuPosition = "top" } : UserProfileProps) {
  const { logout, user } = useAuth();
  
  if (!user) return null;
  
  return (
    <div 
      onClick={() => {}} 
      className={`
        rounded-full p-2
        hover:bg-gray-100
        cursor-pointer
        relative
        group/usermenu
      `}>
        <div 
          className={`
            absolute 
            ${menuPosition === "top" ? "-translate-y-28" : "translate-y-6"}
            w-40 h-28
            bg-white
            rounded-xl shadow-md
            flex flex-col
            py-1 px-4
            pointer-events-none
            group-hover/usermenu:pointer-events-auto
            opacity-0
            group-hover/usermenu:opacity-100
            transition-all
        `}>
          <div className="h-1/2 flex flex-col justify-center text-md font-bold text-gray-400 ">
            <span className="text-xs font-regular">Logged in as</span>
            <span className=" text-gray-800">
              { user.username }
            </span>
          </div>
          <div onClick={logout} className="h-1/2 flex gap-2 items-center text-rose-500 border-t-[1px] hover:underline">
            <LogOutIcon />
            Sign out
          </div>
        </div>

      <UserCircle color="black"/>
    </div>
  );
}
export default UserProfile;