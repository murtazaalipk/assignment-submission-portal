"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Dashboard from "@/components/Dashboard";

const Home = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.role === "admin") {
      router.push("/admin");
    }
  }, [session, router]);

  return <Dashboard role={session?.user} />;
};

export default Home;
