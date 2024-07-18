interface Input {
  inputValue: string;
  setInputValue: (value: string) => void;
  placeholder: string;
  isObscure?: boolean;
}

function Input({ inputValue, setInputValue, placeholder, isObscure=false }: Input) {
  return (
    <div className="relative">
      <input type={isObscure ? "password" : "text"} className="w-full outline-none border-2 px-3 py-3 text-gray-700 rounded-lg peer transition-all [&:not(:placeholder-shown)]:pt-5 focus:border-blue-500 focus:pt-5 " placeholder=" " value={inputValue} onChange={e => setInputValue(e.target.value)}/>
      <span className="text-xs absolute font-semibold text-neutral-800 left-[0.85rem] top-1/2 -translate-y-1/2 pointer-events-none peer-focus:-translate-y-6 transition-all peer-[&:not(:placeholder-shown)]:-translate-y-6 peer-[&:not(:placeholder-shown)]:font-medium peer-focus:font-medium">
        { placeholder }
      </span>
    </div>
  )
}
export default Input