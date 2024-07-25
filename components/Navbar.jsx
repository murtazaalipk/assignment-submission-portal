"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const linkClasses = "block px-4 py-2 text-sm text-gray-700";

  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link href={"/"}>
        <img
          src="/smit.png"
          alt="Left Image"
          className="w-20 h-16 rounded-full ml-4"
        />
      </Link>
      {session && (
        <div className="relative inline-block text-left">
          <div>
            <button
              onClick={handleToggle}
              type="button"
              className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.8em"
                height="1.8em"
                viewBox="0 0 16 16"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M2.75 12.25h10.5m-10.5-4h10.5m-10.5-4h10.5"
                />
              </svg>
            </button>
          </div>

          {isOpen && (
            <div
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabindex="-1"
            >
              <div className="py-1" role="none">
                <Link
                  href="/profile"
                  className={linkClasses}
                  role="menuitem"
                  tabindex="-1"
                  id="menu-item-0"
                >
                  Profile
                </Link>
              </div>
              <div className="py-1" role="none">
                <Link
                  href="#"
                  className={linkClasses}
                  role="menuitem"
                  tabindex="-1"
                  id="menu-item-2"
                >
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className={linkClasses}
                  role="menuitem"
                  tabindex="-1"
                  id="menu-item-2"
                >
                  Settings
                </Link>
              </div>

              <div className="py-1" role="none">
                <button
                  onClick={signOut}
                  className={linkClasses + " w-full text-left"}
                  role="menuitem"
                  tabindex="-1"
                  id="menu-item-6"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
