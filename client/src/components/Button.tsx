interface ButtonProps {
  onClick: () => void;
  title: string;
}

function Button({onClick, title} : ButtonProps) {
  return (
    <div 
      onClick={onClick}
      className="py-2 flex items-center justify-center text-xl font-poppins bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer">
      { title }
    </div>
  )
}
export default Button