interface ButtonProps {
  onClick: () => void | Promise<void>;
  title: string;
}

function Button({onClick, title} : ButtonProps) {
  return (
    <button 
      type="submit"
      onClick={onClick}
      className="py-2 flex items-center justify-center text-xl font-poppins bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer">
      { title }
    </button>
  )
}
export default Button