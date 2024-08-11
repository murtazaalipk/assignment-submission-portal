"use client";

import Form from "@/components/Form";
import Loader from "@/components/Loader";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const [cnic, setCnic] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loader />;
  } else if (
    status === "authenticated" &&
    session &&
    session?.user?.role === "admin"
  ) {
    redirect("/admin");
  } else if (
    status === "authenticated" &&
    session &&
    session?.user?.role !== "admin"
  ) {
    redirect("/");
  }

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

      redirect("/");
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
