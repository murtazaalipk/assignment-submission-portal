"use client";

import { useSession } from "next-auth/react";
import Task from "./Task";
import { fetchUserByEmail } from "@/services/user";
import { useEffect } from "react";

export default function UserInfo() {
  const { data: session } = useSession();
  const handleFetchUser = async (email) => {
    try {
      const fetchedUser = await fetchUserByEmail(email);
      console.log(fetchedUser);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    if (session?.user?.email) {
      handleFetchUser(session?.user?.email);
    }
  }, [session?.user?.email]);
  return (
    <>
      <div className="max-w-7xl pl-9 px-10 mx-auto py-9">
        <div className="text-lg font-semibold text-center mb-2 mt-6">
          Hey {session?.user?.name}, Welcome Back
        </div>
        <h1 className="text-2xl font-semibold mb-4 mt-4">Tasks</h1>
        <div className="grid grid-cols-3 justify-center gap-4">
          <Task message={"Task Completed 1"} submitted={true} />
          <Task message={"Pending Task 2"} submitted={true} />
          <Task message={"In Progress Task 3"} submitted={false} />
          <Task message={"Task Completed 4"} submitted={false} />
          <Task message={"Pending Task 5"} submitted={true} />
          <Task message={"New Task 6"} submitted={false} />
        </div>
      </div>
    </>
  );
}
