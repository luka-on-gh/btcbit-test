"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../_context/Global";
import { LoginData, LoginProgress } from "../_types";
import { validateUserData } from "../_helpers";
import { ENDPOINTS } from "../_config";
import MoonLoader from "react-spinners/ClipLoader";

export default function SignIn() {
  const router = useRouter();
  const [loginProgress, setLoginProgress] = useState(LoginProgress.credentials);
  const [loginData, setLoginData] = useState<LoginData>();
  const [OTPData, setOTPData] = useState<string>();
  const [loginMessage, setLoginMessage] = useState<string>();
  const { authenticated, setAuthenticated } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);

  const login = async () => {
    setLoginMessage("");
    if (validateUserData(setLoginMessage, loginData)) {
      try {
        const loginResponse = await fetch(ENDPOINTS.LOGIN, {
          method: "POST",
          body: JSON.stringify(loginData),
        });
        const data = await loginResponse.json();

        if (data.message) setLoginMessage(data.message);
        if (data.token) setLoginProgress(LoginProgress.OTP);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const sendOTP = async () => {
    setLoginMessage("");
    if (validateOTPData()) {
      setIsLoading(true);
      const serverResponse = await imitateServerInteraction();
      setAuthenticated(serverResponse);
      setIsLoading(false);
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  };

  const imitateServerInteraction = async () => {
    const promise = await new Promise((resolve) => setTimeout(resolve, 3000));
    return true;
  };

  const validateOTPData = () => {
    let isValid = true;

    // Validate OTP
    if (!OTPData) {
      setLoginMessage("One-time password is required.");
      isValid = false;
    }

    return isValid;
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 pt-16">
      {loginProgress === LoginProgress.credentials && !authenticated && (
        <>
          <h1 className="text-2xl">Login</h1>
          <div className="z-10 w-full md:w-1/3 mt-12 flex flex-col items-center justify-center gap-2">
            <input
              className="text-black block w-full h-10 p-2 hover:bg-gray-200 outline-none"
              type="text"
              placeholder="email"
              onChange={(e) =>
                setLoginData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
            <input
              className="text-black block w-full h-10 p-2 hover:bg-gray-200 outline-none"
              placeholder="password"
              type="password"
              onChange={(e) =>
                setLoginData((prev) => ({ ...prev, password: e.target.value }))
              }
            />
            <button
              className="w-full border-solid border-2 border-white h-12 hover:bg-gray-700"
              onClick={login}
            >
              Enter
            </button>
            {loginMessage && (
              <div className="font-bold text-pink-600 mt-2">{loginMessage}</div>
            )}
          </div>
        </>
      )}
      {loginProgress === LoginProgress.OTP && !authenticated && (
        <>
          <h1 className="text-2xl">Login</h1>
          <div className="z-10 w-full md:w-1/3 mt-12 flex flex-col items-center justify-center gap-2">
            <input
              className="text-black block w-full h-10 p-2 hover:bg-gray-200 outline-none"
              placeholder="one-time password"
              type="password"
              onChange={(e) => setOTPData(e.target.value)}
            />
            <button
              className="w-full border-solid border-2 border-white h-12 hover:bg-gray-700"
              onClick={sendOTP}
            >
              Enter
            </button>
            {loginMessage && (
              <div className="font-bold text-pink-600 mt-2">{loginMessage}</div>
            )}
          </div>
          {isLoading && (
            <div className="fixed w-[100px] h-[100px] flex justify-center items-center top-1/3">
              <MoonLoader
                color={"gray"}
                loading={true}
                size={100}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          )}
        </>
      )}
      {authenticated && (
        <div className="w-full mt-40 flex items-center justify-center">
          You are now signed in!
        </div>
      )}
    </main>
  );
}
