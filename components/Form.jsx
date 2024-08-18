"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import InputField from "./InputField";

function Form(props) {
  const {
    handleSubmit,
    cnic,
    name,
    email,
    password,
    error,
    role,
    setName,
    setEmail,
    setCnic,
    setPassword,
    setRole,
    isLoading,
  } = props;
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";
  const isRegisterPage = pathname === "/register";
  return (
    <div className="grid place-items-center p-20">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-[#0b74bb]">
        <div className="w-full flex justify-center">
          <img src="smit.png" className="h-20"></img>
        </div>
        <h1 className="text-md text-gray-600 font-bold my-4 text-center">
          {isRegisterPage ? "Register" : "Assignment Portal"}
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {isRegisterPage && (
            <>
              <InputField
                onChange={(e) => setName(e.target.value)}
                value={name}
                type={"text"}
                placeholder="Full Name"
              />
              <InputField
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type={"email"}
                placeholder="Email"
              />
            </>
          )}
          <InputField
            onChange={(e) => setCnic(e.target.value)}
            value={cnic}
            type={"text"}
            placeholder="CNIC"
          />
          {isRegisterPage && (
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              onChange={(e) => setRole(e.target.value)}
              value={role}
            >
              <option value="Student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          )}
          <InputField
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type={"password"}
            placeholder="Password"
          />
          <button
            type="submit"
            className={`bg-[#0b74bb] text-white font-bold px-6 py-2 ${
              isLoading
                ? "opacity-50 cursor-auto select-none"
                : "opacity-100 cursor-pointer"
            }`}
          >
            {isLoading && (
              <svg
                aria-hidden="true"
                role="status"
                className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="#16a34a"
                ></path>
              </svg>
            )}
            {!isLoading
              ? isRegisterPage
                ? "Register"
                : "Login"
              : "Loading..."}
          </button>

          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          {isRegisterPage && (
            <Link className="text-sm mt-3 text-right" href={"/login"}>
              Already have an account? <span className="underline">Login</span>
            </Link>
          )}
          {isLoginPage && (
            <Link className="text-sm mt-3 text-right" href={"/register"}>
              Don&apos;t have an account? <span className="underline">Register</span>
            </Link>
          )}
        </form>
      </div>
    </div>
  );
}

export default Form;
