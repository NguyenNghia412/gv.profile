import React from "react";
import { DataTable } from "@/components/pages/data-table";
import { IViewRowQuaTrinhCongTac } from "@/models/profile.model";

interface QuaTrinhCongTacProps {
    loading?: boolean;
    data: IViewRowQuaTrinhCongTac[];
}

const QuaTrinhCongTac: React.FC<QuaTrinhCongTacProps> = ({ data, loading }) => {
    return (
        <DataTable
            hideTitle
            showStt={false}
            data={data ?? []}
            loading={loading}
            columns={[
                { label: "Thời gian", field: "thoiGian", className: "font-bold" },
                { label: "Đơn vị công tác", field: "donViCongTac", className: "font-bold" },
                { label: "Công việc đảm nhiệm", field: "congViecDamNhiem", className: "font-bold" },
            ]}
        />
    );
};

export default QuaTrinhCongTac;
