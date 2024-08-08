'use client'
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { fetchUserByEmail } from "@/services/user";
import StudentDashboard from '@/components/StudentDashboard';
import TeacherDashboard from '@/components/TeacherDashboard';

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
 
  console.log(userData)
  useEffect(() => {
    if (userData?.role === 'admin') {
      router.push('/admin');
    }
  }, [userData, router]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {userData ? (
        <div> 
          {userData.role === 'student' && <StudentDashboard />}
          {userData.role === 'teacher' && <TeacherDashboard />} 
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Home;
