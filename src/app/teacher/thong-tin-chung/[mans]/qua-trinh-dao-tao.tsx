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
import { IViewRowQuaTrinhDaoTao } from "@/models/profile.model";

interface QuaTrinhDaoTaoProps {
    data: IViewRowQuaTrinhDaoTao[];
}

const QuaTrinhDaoTao: React.FC<QuaTrinhDaoTaoProps> = ({ data }) => {
    return (
        <div className="bg-white rounded-lg shadow border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="font-bold">Nơi đào tạo</TableHead>
                        <TableHead className="font-bold">Ngành đào tạo</TableHead>
                        <TableHead className="font-bold">Năm</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data && data.length > 0 ? (
                        data.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.noiDaoTao}</TableCell>
                                <TableCell>{item.nganhDaoTao}</TableCell>
                                <TableCell>{item.nam}</TableCell>
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

export default QuaTrinhDaoTao;
