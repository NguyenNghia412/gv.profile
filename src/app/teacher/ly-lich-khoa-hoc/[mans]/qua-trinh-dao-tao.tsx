import React from "react";
import { DataTable } from "@/components/pages/data-table";
import { IViewRowQuaTrinhDaoTao } from "@/models/profile.model";

interface QuaTrinhDaoTaoProps {
    loading?: boolean;
    data: IViewRowQuaTrinhDaoTao[];
}

const QuaTrinhDaoTao: React.FC<QuaTrinhDaoTaoProps> = ({ data, loading }) => {
    return (
        <DataTable
            hideTitle
            showStt={false}
            data={data ?? []}
            loading={loading}
            columns={[
                { label: "Nơi đào tạo", field: "noiDaoTao", className: "font-bold" },
                { label: "Ngành đào tạo", field: "nganhDaoTao", className: "font-bold" },
                { label: "Năm", field: "nam", className: "font-bold" },
            ]}
        />
    );
};

export default QuaTrinhDaoTao;
