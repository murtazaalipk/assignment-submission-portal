"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
/*   const [email, setEmail] = useState(""); */
  const [cnic, setCnic] = useState();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const res = await signIn("credentials", {
        cnic,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        return;
      }

      router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <div className="w-full flex justify-center">
          <img src="smit.png" className="h-20"></img>
        </div>
        <h1 className="text-md text-gray-600 font-bold my-4 text-center">
          Assignment Portal
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            onChange={(e) => setCnic(e.target.value)}
            type="text"
            placeholder="CNIC"
            className="h-11"
          />
          {/* <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
            className="h-11"
          /> */}
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="h-11"
          />
          <Link className="text-sm mt-3 text-left" href={"/register"}>
            <span className="underline">Forgot Password</span>
          </Link>
          <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
            Login
          </button>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link className="text-sm mt-3 text-right" href={"/register"}>
            Don't have an account? <span className="underline">Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
