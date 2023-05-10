import React, { useState, useEffect, useContext } from "react";

import { Context } from "../context";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const ChatEngine = dynamic(() =>
  import("react-chat-engine").then((module) => module.ChatEngine)
);
const MessageFormSocial = dynamic(() =>
  import("react-chat-engine").then((module) => module.MessageFormSocial)
);

export default function Home() {
  const { username, secret } = useContext(Context);
  const [showChat, setShowChat] = useState(false);
  const router = useRouter();
 
  useEffect(() => {
    if (typeof document !== undefined) { 
      setShowChat(true);
    }
  }, []);

  useEffect(() => {
    if (username === "" || secret === "") {
      router.push("/");
    }
  }, [username, secret]);

  if (!showChat) return <div />;

  return (
    <div className="background">
      <div>
        <div className="shadow">
          <ChatEngine
            height="calc(100vh - 212px)"
            projectID="b0fd507e-5a07-427b-b826-a5f6d77aafc1"
            userName={username}
            userSecret={secret}
            renderNewMessageForm={() => <MessageFormSocial />}
          />
        </div>
        
      </div>
      <div style={{marginTop: '30px', marginLeft: '1140px', display: 'flex', gap:'10px'}}>
        <div 
          className="botscta"
          style={{backgroundImage: "url('https://logowik.com/content/uploads/images/discord-new-20218785.jpg')"}} 
          onClick={() => {window.open('https://discord.com/api/oauth2/authorize?client_id=1097497102692655165&permissions=8&scope=bot', '_blank');}}
        />
        <div 
          className="botscta"
          style={{backgroundImage: "url('https://www.pngkit.com/png/detail/52-520508_telegram-icon-telegram-logo-png.png')"}}
          onClick={() => {window.open('https://t.me/Learn_mate_bot', '_blank');}}
        />
      </div>
    </div>
  );
}
