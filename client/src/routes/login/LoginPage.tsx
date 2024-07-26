import { FormEvent, useState } from "react";
import Logo from "../../components/Logo";
import BackgroundGrid from "../editor/components/BackgroundGrid";
import Input from "../../components/Input";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import useAuth from "../../hooks/useAuth";

function LoginPage() {
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");

  const { login } = useAuth();

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    await login(username, password);
  }
  
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-10 font-inter">
      <BackgroundGrid gridSize={30} />
      <form 
        onSubmit={handleLogin}
        className="z-10 flex h-[30rem] w-96 flex-col rounded-xl border-4 border-gray-500 bg-white px-4 py-6 shadow-lg gap-3 relative">
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
          Join the Community. <Link to="/auth/signup" className="text-rose-500 font-bold hover:underline">Sign up now!</Link> 
        </span>

        <div className="font-light text-xs flex flex-col text-gray-500 absolute -right-40 top-0 bg-white p-3 rounded-lg shadow-lg">
          <span className="font-semibold">
            Test login credentials
          </span>
          <span>
            Username: jamey123
          </span>
          <span>
            Password: test@123
          </span>
        </div>
      </form>
    </div>
  );
}
export default LoginPage;
