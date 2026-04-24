"use client";

import { signIn, useSession } from "next-auth/react";
import React from "react";

export interface LoginToViewProps {
  className?: string;
}

const LoginToView: React.FC<LoginToViewProps> = (props) => {
  const { data: session } = useSession();

  console.log("Session data:", session);

  if (!session) {
    return <button onClick={() => signIn("openiddict")}>Login with SSO</button>;
  }

  return (
    <span className={`cursor-pointer text-slate-400 ${props.className}`}>
      [ Đăng nhập để xem ]
    </span>
  );
};

export default LoginToView;
