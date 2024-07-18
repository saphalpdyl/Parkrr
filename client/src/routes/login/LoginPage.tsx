import { useState } from "react";
import Logo from "../../components/Logo";
import BackgroundGrid from "../editor/components/BackgroundGrid";
import Input from "../../components/Input";
import { Link } from "react-router-dom";
import Button from "../../components/Button";

function LoginPage() {
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");
  
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-10 font-inter">
      <BackgroundGrid gridSize={30} />
      <form className="z-10 flex h-[30rem] w-96 flex-col rounded-xl border-4 border-gray-500 bg-white px-4 py-6 shadow-lg gap-3">
        <div className="flex items-center justify-between">
          <div>
            <Logo />
          </div>
        </div>
        <span className="text-sm text-gray-600 font-poppins">
          Welcome back to <strong>Parkrr</strong>. Please login
        </span>
        <div className="py-1"></div>
        <Input inputValue={username} setInputValue={setUsername} placeholder="Username" />
        <Input inputValue={password} setInputValue={setPassword} placeholder="Password" isObscure/>
        <div className="py-1"></div>
       <Button title="Sign in" onClick={() => {}} />
        <span className="text-center text-lg text-gray-400">Or</span>
        <span className="text-center text-md text-neutral-700">
          Join the Community. <Link to="/register" className="text-rose-500 font-bold hover:underline">Register now!</Link> 
        </span>
      </form>
    </div>
  );
}
export default LoginPage;
