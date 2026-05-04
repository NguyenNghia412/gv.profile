"use client";

import { CommonUtils } from "@/lib/common";
import { useSession, signOut, signIn } from "next-auth/react";

const UserMenuButton = () => {
  const { data: session } = useSession();

  if (!session) {
    return <button onClick={() => signIn("openiddict")}>Đăng nhập</button>;
  }

  console.log("User session:", session); // Debugging log

  const fullname = CommonUtils.getUserFullname((session as any).access_token);

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-white">
        {fullname}
      </span>
      <button
        onClick={() => signOut()}
        className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 rounded text-white transition"
      >
        Đăng xuất
      </button>
    </div>
  );
};

export default UserMenuButton;
