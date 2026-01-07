'use client'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IProfile } from "@/models/profile.model";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ProfileUserApi } from "./services/profile_user";
import { TableSkeleton } from "@/components/ui/loading";

export default function Home() {
  const [dataUser, setDataUser] = useState<IProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    ProfileUserApi.getListProfile(25, 1)
      .then(res => {
        setDataUser(res.data.items)
      }
      )
      .catch(err => console.error(err))
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <div>
      <Table>
        <TableCaption>Danh sách các giảng viên hiện tại</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[8px] font-bold">#</TableHead>
            <TableHead className="font-bold">Giảng viên</TableHead>
            <TableHead className="font-bold">Đơn vị</TableHead>
            <TableHead className="font-bold">Cơ sở khoa học</TableHead>
            <TableHead className="font-bold">Lý lịch khoa học</TableHead>
          </TableRow>
        </TableHeader>

        {/* Skeleton */}

        <TableBody>
          {loading ? (
            <TableSkeleton rows={5} columns={5} />
          ) : (
            dataUser &&
            dataUser.map((item, i) => (
              <TableRow key={`${i}`}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{item.hoTen}</TableCell>
                <TableCell>{item.donVi}</TableCell>
                <TableCell>{item.coSoKhoaHoc}</TableCell>
                <TableCell>
                  <Link
                    href={`/teacher/thong-tin-chung/${item.mans}`}
                    target="_blank"
                    className="underline text-blue-500 cursor-pointer"
                  >
                    {item.mans}
                  </Link>
                </TableCell>
              </TableRow>
            ))
          )}

        </TableBody>
      </Table>
    </div>
  );
}
