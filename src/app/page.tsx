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
import { Pagination } from "@/components/ui/pagination";

export default function Home() {
    const [dataUser, setDataUser] = useState<IProfile[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(25);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        setLoading(true);
        ProfileUserApi.getListProfile(pageSize, currentPage)
            .then(res => {
                setDataUser(res.data.items)
                setTotalItems(res.data.totalItems)
            })
            .catch(err => console.error(err))
            .finally(() => {
                console.log(totalItems)
                setLoading(false)
            })
    }, [currentPage, pageSize])

    const totalPages = Math.ceil(totalItems / pageSize);
    const startItem = totalItems > 0 ? (currentPage - 1) * pageSize + 1 : 0;
    const endItem = Math.min(currentPage * pageSize, totalItems);

    return (
        <div className="container mx-auto py-6 px-4">
            <div className="bg-white rounded-lg shadow border">
                <Table>
                    <TableCaption>Danh sách các giảng viên hiện tại</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[60px] font-bold">#</TableHead>
                            <TableHead className="font-bold">Giảng viên</TableHead>
                            <TableHead className="font-bold">Đơn vị</TableHead>
                            <TableHead className="font-bold">Cơ sở khoa học</TableHead>
                            <TableHead className="font-bold">Thông tin chi tiết</TableHead>
                            <TableHead className="font-bold">Công bố khoa học</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {loading ? (
                            <TableSkeleton rows={5} columns={5} />
                        ) : (
                            dataUser &&
                            dataUser.map((item, i) => (
                                <TableRow key={`${item.mans}-${i}`}>
                                    <TableCell className="font-medium">
                                        {(currentPage - 1) * pageSize + i + 1}
                                    </TableCell>
                                    <TableCell className="font-medium">{item.hoTen}</TableCell>
                                    <TableCell>{item.donVi}</TableCell>
                                    <TableCell>{item.coSoKhoaHoc}</TableCell>
                                    <TableCell>
                                        <Link
                                            href={`/teacher/thong-tin-chung/${item.mans}`}
                                            target="_blank"
                                            className="text-blue-600 hover:text-blue-800 underline"
                                        >
                                            Xem chi tiết
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link
                                            href={`/teacher/cong-bo-khoa-hoc/${item.mans}`}
                                            target="_blank"
                                            className="text-blue-600 hover:text-blue-800 underline"
                                        >
                                            Xem chi tiết
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>

                {/* Pagination */}
                {!loading && totalItems > 0 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        pageSize={pageSize}
                        totalItems={totalItems}
                        startItem={startItem}
                        endItem={endItem}
                        onPageChange={setCurrentPage}
                        onPageSizeChange={setPageSize}
                    />
                )}
            </div>
        </div>
    );
}