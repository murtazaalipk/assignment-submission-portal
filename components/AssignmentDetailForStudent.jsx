"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import Loader from "./Loader";

function AssignmentPage({ submitted,assignment }) {
  
  const { data: session, status } = useSession();

  const [file, setFile] = useState(null);
  const [hostedLink, setHostedLink] = useState("");
  if (status === "loading") {
    return <Loader />;
  } else if (status === "unauthenticated") {
    redirect("/");
  }

  const notSubmittedClass = "bg-red-400 text-red-800";
  const submittedClass = "bg-green-300 text-green-900";

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleLinkChange = (event) => {
    setHostedLink(event.target.value);
  };

  const handleSubmit = () => {
    console.log("File:", file);
    console.log("Hosted Link:", hostedLink);
  };

  return (
    <div className="max-w-7xl pl-9 px-10 mx-auto py-9">
      <h2 className="text-3xl font-bold mb-4">{assignment.title}</h2>
      <span className={`text-sm`}>Expiry {assignment.dueDate.split("T")[0]}</span>
      <span
        className={`${
          submitted ? submittedClass : notSubmittedClass
        } mt-2 px-2 py-1 rounded-full text-[10px]`}
      >
        {submitted ? "Submitted" : "Not Submitted"}
      </span>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700">
          Upload PDF or MS Word file:
        </label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700">
          Hosted Link:
        </label>
        <input
          type="url"
          value={hostedLink}
          onChange={handleLinkChange}
          placeholder="https://example.com"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div className="mt-6">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Submit Assignment
        </button>
      </div>
    </div>
  );
}

export default AssignmentPage;
