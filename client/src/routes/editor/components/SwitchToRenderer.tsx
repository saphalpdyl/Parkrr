import { EyeIcon } from "lucide-react";
import { Link } from "react-router-dom";

function SwitchToRenderer() {
  return <Link to="/" className="absolute top-8 right-2 h-10 bg-white rounded-lg shadow-md flex items-center py-2 px-2 text-blue-500 hover:text-blue-600 text-sm font-semibold underline gap-1 cursor-pointer z-50">
    <span>Switch to View</span>
    <EyeIcon size={20} className="h-5 w-5 text-blue-500" />
  </Link>
}

export default SwitchToRenderer;