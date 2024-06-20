"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { SlHome } from "react-icons/sl";
import { useGlobalContext } from "../_context/Global";

export function Navigation() {
  const pathname = usePathname();
  const { authenticated, setAuthenticated } = useGlobalContext();

  return (
    <nav className="z-10 fixed m-auto w-full h-16 bottom-0 right-0 left-0 p-2 bg-gray-900">
      <ul className="flex gap-2 h-full justify-center md:justify-end">
        <Link
          href="/"
          className="w-1/3 md:w-[160px] bg-gray-400 hover:bg-gray-300 text-gray-900 flex justify-center items-center"
        >
          <SlHome />
        </Link>
        {!authenticated ? (
          <>
            <li className="w-1/3 md:w-[160px] bg-gray-400 hover:bg-gray-300 text-gray-900 font-bold flex justify-center items-center">
              <Link
                className={`link w-full h-full flex justify-center items-center ${
                  pathname === "/sign_in" ? "active" : ""
                }`}
                href="/sign_in"
              >
                SIGN IN
              </Link>
            </li>
            <li className="w-1/3 md:w-[160px] bg-gray-400 hover:bg-gray-300 text-gray-900 font-bold flex justify-center items-center">
              <Link
                className={`link w-full h-full flex justify-center items-center ${
                  pathname === "/sign_up" ? "active" : ""
                }`}
                href="/sign_up"
              >
                SIGN UP
              </Link>
            </li>
          </>
        ) : (
          <li className="w-2/3 md:w-[160px] flex justify-center items-center bg-gray-400 hover:bg-gray-300 text-gray-900 font-bold">
            <button
              className="flex justify-center items-center w-full h-full"
              onClick={() => setAuthenticated(false)}
            >
              SIGN OUT
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
