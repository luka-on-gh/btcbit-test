"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../_context/Global";
import { RegistrationData } from "../_types";
import { ENDPOINTS } from "../_config";
import { validateUserData } from "../_helpers";

export default function SignUp() {
  const [registrationData, setRegistrationData] = useState<RegistrationData>();
  const [registrationMessage, setRegistrationMessage] = useState<string>();
  const router = useRouter();
  const { authenticated, setAuthenticated } = useGlobalContext();

  const register = async () => {
    setRegistrationMessage("");
    if (
      validateUserData(setRegistrationMessage, registrationData) &&
      validatePasswordMatch()
    ) {
      try {
        const registrationResponse = await fetch(ENDPOINTS.REGISTER, {
          method: "POST",
          body: JSON.stringify(registrationData),
        });
        const data = await registrationResponse.json();

        if (data.message) setRegistrationMessage(data.message);
        if (data.token) {
          setAuthenticated(true);
          setTimeout(() => {
            router.push("/");
          }, 2000);
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  const validatePasswordMatch = () => {
    if (registrationData?.password === registrationData?.repPassword)
      return true;
    setRegistrationMessage("Passwords must match.");
    return false;
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 pt-16">
      {!authenticated ? (
        <>
          <h1 className="text-2xl">Register</h1>
          <div className="z-10 w-full md:w-1/3 mt-12 flex flex-col items-center justify-center gap-2">
            <input
              className="text-black block w-full h-10 p-2 hover:bg-gray-200 outline-none"
              type="text"
              placeholder="email"
              onChange={(e) =>
                setRegistrationData((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
            />
            <input
              className="text-black block w-full h-10 p-2 hover:bg-gray-200 outline-none"
              placeholder="password"
              type="password"
              onChange={(e) =>
                setRegistrationData((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
            />
            <input
              className="text-black block w-full h-10 p-2 hover:bg-gray-200 outline-none"
              placeholder="repeat password"
              type="password"
              onChange={(e) =>
                setRegistrationData((prev) => ({
                  ...prev,
                  repPassword: e.target.value,
                }))
              }
            />
            <button
              className="w-full border-solid border-2 border-white h-12 hover:bg-gray-700"
              onClick={register}
            >
              Join
            </button>
          </div>
          {registrationMessage && (
            <div className="font-bold text-pink-600 mt-4">
              {registrationMessage}
            </div>
          )}
        </>
      ) : (
        <div className="w-full mt-40 flex items-center justify-center">
          You are now signed in!
        </div>
      )}
    </main>
  );
}
