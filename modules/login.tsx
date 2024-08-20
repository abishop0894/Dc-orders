"use client";

import React, { useState, useEffect } from "react";
import { Button, Input, Checkbox, Link } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import Home from "./home"; // Import the protected component
import { Providers } from "@/app/providers";

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is already logged in (i.e., localStorage has the 'authenticated' flag)
    const isLoggedIn = localStorage.getItem("isAuthenticated");
    if (isLoggedIn) {
      setIsAuthenticated(true);
    }
  }, []);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const usernameEnv = process.env.NEXT_PUBLIC_USERNAME;
    const passwordEnv = process.env.NEXT_PUBLIC_PASSWORD;

    if (email === usernameEnv && password === passwordEnv) {
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true"); // Set the authentication flag in localStorage
    } else {
      alert("Email or password is incorrect. Please try again.");
    }
  };

  if (isAuthenticated) {
    return <Home />; // Render the protected component if authenticated
  }

  return (
    <Providers>
      <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-rose-400 via-fuchsia-500 to-indigo-500 p-2 sm:p-4 lg:p-8">
        <div className="flex p-5 w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-large">
          <p className="pb-2 text-xl font-medium">Log In</p>
          <form className="flex flex-col p-5 gap-3" onSubmit={handleLogin}>
            <Input
              label="Email Address"
              name="email"
              placeholder="Enter your email"
              type="email"
              variant="bordered"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              endContent={
                <button type="button" onClick={toggleVisibility}>
                  {isVisible ? (
                    <Icon
                      className="pointer-events-none text-2xl text-default-400"
                      icon="solar:eye-closed-linear"
                    />
                  ) : (
                    <Icon
                      className="pointer-events-none text-2xl text-default-400"
                      icon="solar:eye-bold"
                    />
                  )}
                </button>
              }
              label="Password"
              name="password"
              placeholder="Enter your password"
              type={isVisible ? "text" : "password"}
              variant="bordered"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex items-center justify-between px-1 py-2">
              <Checkbox name="remember" size="sm">
                Remember me
              </Checkbox>
              <Link className="text-default-500" href="#" size="sm">
                Forgot password?
              </Link>
            </div>
            <Button color="primary" type="submit">
              Log In
            </Button>
          </form>
        </div>
      </div>
    </Providers>
  );
}
