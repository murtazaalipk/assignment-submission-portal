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
          <h1 className="text-2xl font-semibold  ml-24 mb-4 mt-14">Tasks</h1>
          <div className="flex flex-wrap justify-center gap-4">
            <Task />
            <Task />
            <Task />
            <Task />
            <Task />
            <Task />
          </div>
        </div>
      </div>
    </>
  );
}
