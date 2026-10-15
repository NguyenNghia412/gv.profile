import React from "react";
import { DataTable } from "@/components/pages/data-table";
import { IViewRowQuaTrinhDaoTao } from "@/models/profile.model";

interface QuaTrinhDaoTaoProps {
    loading?: boolean;
    data: IViewRowQuaTrinhDaoTao[];
}

type QuaTrinhDaoTaoRow = IViewRowQuaTrinhDaoTao & { thoiGian: string };

function getYear(value?: string | null): string {
    if (!value) return "";
    const date = new Date(value);
    return isNaN(date.getTime()) ? "" : String(date.getFullYear());
}

function formatThoiGian(item: IViewRowQuaTrinhDaoTao): string {
    const batDau = getYear(item.thoiGianBatDau);
    const ketThuc = getYear(item.thoiGianKetThuc);

    if (!batDau && !ketThuc) return "";
    if (!batDau) return ketThuc;
    if (ketThuc) return `${batDau}-${ketThuc}`;
    return item.namTotNghiep != null ? `${batDau}-${item.namTotNghiep}` : batDau;
}

const QuaTrinhDaoTao: React.FC<QuaTrinhDaoTaoProps> = ({ data, loading }) => {
    const rows: QuaTrinhDaoTaoRow[] = (data ?? []).map((item) => ({
        ...item,
        thoiGian: formatThoiGian(item),
    }));

    return (
        <DataTable
            hideTitle
            data={rows}
            loading={loading}
            columns={[
                { label: "Thời gian", field: "thoiGian", className: "font-bold" },
                { label: "Tên cơ sở đào tạo", field: "noiDaoTao", className: "font-bold" },
                { label: "Chuyên ngành", field: "chuyenMon", className: "font-bold" },
                { label: "Học vị", field: "tenHocVi", className: "font-bold" },
            ]}
        />
    );
};

export default QuaTrinhDaoTao;
