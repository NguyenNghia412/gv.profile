"use client";

import { CommonUtils } from "@/lib/common";
import { useSession, signOut, signIn } from "next-auth/react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { User } from "lucide-react";
import Link from 'next/link'


const UserMenuButton = () => {
  const { data: session } = useSession();

  if (!session) {
    return <button onClick={() => signIn("openiddict")}>Đăng nhập</button>;
  }

  const fullname = CommonUtils.getUserFullname((session as any).access_token);
  const currentMans = CommonUtils.getCurrentMans((session as any).access_token);

  return (
    <div className="flex items-center gap-3">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 text-sm text-white cursor-pointer font-semibold hover:underline">
                  <User size={18} />
                  <span>{fullname}</span>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-secondaryBlue border-slate-700">
                <DropdownMenuItem className="!text-white cursor-pointer !hover:text-white hover:underline">
                    <Link href={`/teacher/thong-tin-chung/${currentMans}`} className="w-full h-full">
                        Thông tin chung
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="!text-white cursor-pointer !hover:text-white hover:underline">
                    <Link href={`/teacher/cong-bo-khoa-hoc/${currentMans}`} className="w-full h-full">
                        Công bố khoa học
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-slate-700" />
                <DropdownMenuItem className="!text-white cursor-pointer !hover:text-white hover:underline" onClick={() => signOut()}>Đăng xuất</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
  );
};

export default UserMenuButton;
