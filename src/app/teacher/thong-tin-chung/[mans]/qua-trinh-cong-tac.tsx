import React from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { IViewRowQuaTrinhCongTac } from "@/models/profile.model";

interface QuaTrinhCongTacProps {
    data: IViewRowQuaTrinhCongTac[];
}

const QuaTrinhCongTac: React.FC<QuaTrinhCongTacProps> = ({ data }) => {
    return (
        <div className="bg-white rounded-lg shadow border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="font-bold">Thời gian</TableHead>
                        <TableHead className="font-bold">Đơn vị công tác</TableHead>
                        <TableHead className="font-bold">Công việc đảm nhiệm</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data && data.length > 0 ? (
                        data.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.thoiGian}</TableCell>
                                <TableCell>{item.donViCongTac}</TableCell>
                                <TableCell>{item.congViecDamNhiem}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={3} className="text-center text-slate-500">
                                Không có dữ liệu
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default QuaTrinhCongTac;
