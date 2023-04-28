import React, { useState, useContext } from "react";
import { Context } from "../context";

import { useRouter } from "next/router";
import LoadingDots from "./LoadingDots";

import axios from "axios";

const Auth = () => {
  const { username, setUsername, secret, setSecret } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  function onSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    if (username.length === 1 || secret.length === 1) return;

    axios.put(
        "https://api.chatengine.io/users/",
        { username, secret },
        { headers: { "Private-Key": "8f966b8a-714a-4d45-b502-4753e27a34ab" } }
      ).then((r) => {
        router.push("/chats");
      });
  }

  return (
    <div className="background">
      <div className="auth-container">
        <form className="auth-form" onSubmit={(e) => onSubmit(e)}>
          <div className="auth-title">LearnMate Chat</div>

          <div className="input-container">
            <input
              placeholder="Email or Username"
              className="text-input"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="input-container">
            <input
              type="password"
              placeholder="Password"
              className="text-input"
              onChange={(e) => setSecret(e.target.value)}
            />
          </div>

          <button type="submit" className="submit-button">
            {isLoading ? <LoadingDots />: <>Login / Logon</>} 
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
