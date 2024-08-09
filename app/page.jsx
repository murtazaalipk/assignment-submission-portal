"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { fetchUserByEmail } from "@/services/user";
import StudentDashboard from "@/components/StudentDashboard";
import TeacherDashboard from "@/components/TeacherDashboard";
import Loader from "@/components/Loader";

const Home = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  const handleFetchUser = async (email) => {
    try {
      const fetchedUser = await fetchUserByEmail(email);
      setUserData(fetchedUser);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (session?.user?.email) {
      handleFetchUser(session.user.email);
    }
  }, [session?.user?.email]);

  useEffect(() => {
    if (userData?.role === "admin") {
      router.push("/admin");
    }
  }, [userData, router]);

  if (!userData) {
    return <Loader />;
  }

  return (
    <div>
      <div>
        {userData.role === "student" && <StudentDashboard />}
        {userData.role === "teacher" && <TeacherDashboard />}
      </div>
    </div>
  );
};

export default Home;
