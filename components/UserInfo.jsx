"use client";

import { useSession } from "next-auth/react";
import Task from "./Task";

export default function UserInfo() {
  const { data: session } = useSession();

  return (
    <>
      <div className="flex justify-center">
        <div className="w-full max-w-screen-lg p-4">
          <div className="text-lg font-semibold text-center mb-2 mt-6">
            Hey {session?.user?.name}, Welcome Back
          </div>
          <h1 className="text-2xl font-semibold ml-24 mb-4 mt-4">Tasks</h1>
          <div className="flex flex-wrap justify-center gap-4">
            <Task message={"Task Completed 1"} deadline={"24-Jan-2024"} date={"10-Jan-2024"} />
            <Task message={"Pending Task 2"} deadline={"24-Jan-2024"} date={"10-Jan-2024"} />
            <Task message={"In Progress Task 3"} deadline={"24-Jan-2024"} date={"10-Jan-2024"} />
            <Task message={"Task Completed 4"} deadline={"24-Jan-2024"} date={"10-Jan-2024"} />
            <Task message={"Pending Task 5"} deadline={"24-Jan-2024"} date={"10-Jan-2024"} />
            <Task message={"New Task 6"} deadline={"24-Jan-2024"} date={"10-Jan-2024"} />
          </div>
        </div>
      </div>
    </>
  );
}
