"use client";

import { signIn, useSession } from "next-auth/react";
import React from "react";

export interface LoginToViewProps {
  className?: string;
  children?: React.ReactNode;
}

const LoginToView: React.FC<LoginToViewProps> = (props) => {
  const { data: session } = useSession();

  if (!session) {
    return <button onClick={() => signIn("openiddict")}>[ Đăng nhập để xem ]</button>;
  }

  // If children provided, render them (content only shows when logged in)
  if (props.children) {
    return <div className={props.className}>{props.children}</div>;
  }

  // Fallback message if no children provided
  return (
    <span className={`cursor-pointer text-slate-400 ${props.className}`}>
      [ Đã đăng nhập ]
    </span>
  );
};

export default LoginToView;
