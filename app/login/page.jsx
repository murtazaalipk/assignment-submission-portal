"use client";

// import { authOptions } from "../api/auth/[...nextauth]/route";
import Form from "@/components/Form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const [cnic, setCnic] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cnic || !password) {
      setError("Please fill all fields.");
      return;
    }
    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };
  const formProps = {
    handleSubmit,
    cnic,
    password,
    error,
    setCnic,
    setPassword,
    setError,
    isLoading,
    setLoading,
  };
  return <Form {...formProps} />;
}
