import { FormEvent, useState } from "react";
import Logo from "../../components/Logo";
import BackgroundGrid from "../editor/components/BackgroundGrid";
import Input from "../../components/Input";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import useAuth from "../../hooks/useAuth";

function SignupPage() {
  const [ signupFormState, setSignupFormState] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    username: "",
    password: "",
  });

  function handleChangeValue(value: string, key: string) {
    setSignupFormState({
      ...signupFormState,
      [key]: value, 
    });
  }

  const { signUp } = useAuth();

  async function handleSignup(e: FormEvent) {
    e.preventDefault();
    signUp(signupFormState);
  }
  
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-10 font-inter">
      <BackgroundGrid gridSize={30} />
      <form 
        onSubmit={handleSignup}
        className="z-10 flex h-[40rem] w-96 flex-col rounded-xl border-4 border-gray-500 bg-white px-4 py-6 shadow-lg gap-3">
        <div className="flex items-center justify-between">
          <div>
            <Logo />
          </div>
        </div>
        <span className="text-sm text-gray-600 font-poppins">
          Welcome to <strong>Parkrr</strong>. Join the community
        </span>
        <div className="py-1"></div>
        <Input inputValue={signupFormState.firstName} setInputValue={val => handleChangeValue(val, "firstName")} placeholder="First name" />
        <Input inputValue={signupFormState.middleName} setInputValue={val => handleChangeValue(val, "middleName")} placeholder="Middle name"/>
        <Input inputValue={signupFormState.lastName} setInputValue={val => handleChangeValue(val, "lastName")} placeholder="Last name"/>
        <Input inputValue={signupFormState.username} setInputValue={val => handleChangeValue(val, "username")} placeholder="Username"/>
        <Input inputValue={signupFormState.password} setInputValue={val => handleChangeValue(val, "password")} placeholder="Password" isObscure/>
        <div className="py-1"></div>
       <Button title="Sign up" onClick={() => {}} />
        <span className="text-center text-lg text-gray-400">Or</span>
        <span className="text-center text-md text-neutral-700">
          Already have an account? <Link to="/auth/login/" className="text-rose-500 font-bold hover:underline">Sign in now!</Link> 
        </span>
      </form>
    </div>
  );
}
export default SignupPage;
