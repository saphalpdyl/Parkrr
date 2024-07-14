import { ChevronDown, ChevronUp } from "lucide-react";

type IncrementButtonProps = {
  down?: boolean;
  onClick(): void;
};
const IncrementButton = ({ down = false, onClick }: IncrementButtonProps) => {
  const iconStyle = {
    size: 12,
    color: "white",
  };

  return (
    <div
      onClick={onClick}
      className={`${down ? "rounded-b-md" : "rounded-t-md"} cursor-pointer px-2 ${down ? "bg-slate-600" : "bg-slate-700"} ${down ? "hover:bg-red-600" : "hover:bg-blue-600"}`}
    >
      {down ? <ChevronDown {...iconStyle} /> : <ChevronUp {...iconStyle} />}
    </div>
  );
};
export default IncrementButton;
