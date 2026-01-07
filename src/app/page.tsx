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

export default function Home() {

  const [dataUser, setDataUser] = useState<IProfile | null>(null);

  useEffect(() => {
    ProfileUserApi.getListProfile(25, 1).then(res => console.log(res))

  })

  const data: IProfile[] = [
    {
      stt: 1,
      hoTen: "Vũ Ngọc Khiêm",
      donVi: "Hội đồng Trường",
      coSo: "Hà Nội",
      lyLichKhoaHoc: "Xem chi tiết",
    },
    {
      stt: 2,
      hoTen: "Nguyễn Hoàng Long",
      donVi: "Ban Giám hiệu",
      coSo: "Hà Nội",
      lyLichKhoaHoc: "Xem chi tiết",
    },
    {
      stt: 3,
      hoTen: "Nguyễn Văn Lâm",
      donVi: "Ban Giám hiệu",
      coSo: "Hà Nội",
      lyLichKhoaHoc: "Xem chi tiết",
    },
    {
      stt: 4,
      hoTen: "Trần Hà Thanh",
      donVi: "Ban Giám hiệu",
      coSo: "Hà Nội",
      lyLichKhoaHoc: "Xem chi tiết",
    },
    {
      stt: 5,
      hoTen: "Lê Thu Sao",
      donVi: "Công Đoàn",
      coSo: "Hà Nội",
      lyLichKhoaHoc: "Xem chi tiết",
    },
    {
      stt: 6,
      hoTen: "Tạ Thị Hồng Nhung",
      donVi: "Khoa Công trình",
      coSo: "Hà Nội",
      lyLichKhoaHoc: "Xem chi tiết",
    },
    {
      stt: 7,
      hoTen: "Phùng Bá Thắng",
      donVi: "Khoa Công trình",
      coSo: "Hà Nội",
      lyLichKhoaHoc: "Xem chi tiết",
    },
    {
      stt: 8,
      hoTen: "Nguyễn Anh Tuấn",
      donVi: "Khoa Công trình",
      coSo: "Hà Nội",
      lyLichKhoaHoc: "Xem chi tiết",
    },
    {
      stt: 9,
      hoTen: "Nguyễn Thanh Hưng",
      donVi: "Khoa Công trình",
      coSo: "Hà Nội",
      lyLichKhoaHoc: "Xem chi tiết",
    },
    {
      stt: 10,
      hoTen: "Nguyễn Tiến Hưng",
      donVi: "Khoa Công trình",
      coSo: "Hà Nội",
      lyLichKhoaHoc: "Xem chi tiết",
    },
    {
      stt: 11,
      hoTen: "Lê Văn Mạnh",
      donVi: "Khoa Công trình",
      coSo: "Hà Nội",
      lyLichKhoaHoc: "Xem chi tiết",
    },
    {
      stt: 12,
      hoTen: "Trần Anh Tuấn",
      donVi: "Khoa Công trình",
      coSo: "Hà Nội",
      lyLichKhoaHoc: "Xem chi tiết",
    },
    {
      stt: 13,
      hoTen: "Nguyễn Hữu Giang",
      donVi: "Khoa Công trình",
      coSo: "Hà Nội",
      lyLichKhoaHoc: "Xem chi tiết",
    },
    {
      stt: 14,
      hoTen: "Nguyễn Hữu May",
      donVi: "Khoa Công trình",
      coSo: "Hà Nội",
      lyLichKhoaHoc: "Xem chi tiết",
    },
    {
      stt: 15,
      hoTen: "Đào Quang Huy",
      donVi: "Khoa Công trình",
      coSo: "Hà Nội",
      lyLichKhoaHoc: "Xem chi tiết",
    },
  ];

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
        <TableBody>
          {data &&
            data.map((item, i) => (
              <TableRow key={`${i}`}>
                <TableCell>{item.stt}</TableCell>
                <TableCell>{item.hoTen}</TableCell>
                <TableCell>{item.donVi}</TableCell>
                <TableCell>{item.coSo}</TableCell>
                <TableCell>
                  <Link
                    href={"/teacher/thong-tin-chung"}
                    target="_blank"
                    className="underline text-blue-500 cursor-pointer"
                  >
                    {item.lyLichKhoaHoc}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
