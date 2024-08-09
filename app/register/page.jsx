"use client";

import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import Form from "@/components/Form";
import { useSession } from "next-auth/react";
import Loader from "@/components/Loader";

export default function Register() {
  const [cnic, setCnic] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("student");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
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

    if (!name || !email || !cnic || !password) {
      setError("All fields are necessary.");
      return;
    }
    setLoading(true);

    try {
      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          cnic,
          password,
          role,
        }),
      });
      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/login");
      } else {
        console.log("User registration failed.");
        setError("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
      setError("Error during registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formProps = {
    handleSubmit,
    cnic,
    name,
    email,
    password,
    error,
    setCnic,
    setName,
    setEmail,
    setPassword,
    setError,
    role,
    setRole,
    isLoading,
    setLoading,
  };

  return <Form {...formProps} />;
}
