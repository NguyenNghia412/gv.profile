"use client";

import { signIn, useSession } from "next-auth/react";
import React from "react";

export interface LoginToViewProps {
  className?: string;
}

const LoginToView: React.FC<LoginToViewProps> = (props) => {
  const { data: session } = useSession();

  if (!session) {
    return <button onClick={() => signIn("openiddict")}>[ Đăng nhập để xem ]</button>;
  }

  return (
    <span className={`cursor-pointer text-slate-400 ${props.className}`}>
      [ Đã đăng nhập ]
    </span>
  );
};

export default LoginToView;
