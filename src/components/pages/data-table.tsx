"use client";

import { Fragment } from "react";
import { TableSkeleton } from "@/components/ui/loading";
import { Pagination } from "@/components/ui/pagination";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export const CELL_VIEW_TYPES = {
    TEXT: "TEXT",
    DATE: "DATE",
    DATETIME: "DATETIME",
    YEAR: "YEAR",
} as const;

type CellViewType = typeof CELL_VIEW_TYPES[keyof typeof CELL_VIEW_TYPES];

function formatCellValue(value: unknown, viewType: CellViewType): React.ReactNode {
    if (value == null || value === "") return "";
    if (viewType === CELL_VIEW_TYPES.TEXT) return value as React.ReactNode;

    const date = new Date(value as string);
    if (isNaN(date.getTime())) return value as React.ReactNode;

    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();

    if (viewType === CELL_VIEW_TYPES.YEAR) return String(yyyy);
    if (viewType === CELL_VIEW_TYPES.DATE) return `${dd}/${mm}/${yyyy}`;

    const HH = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    const ss = String(date.getSeconds()).padStart(2, "0");
    return `${dd}/${mm}/${yyyy} ${HH}:${min}:${ss}`;
}

interface Column<T> {
    label: string;
    field?: keyof T;
    className?: string;
    cellClass?: string;
    viewType?: CellViewType;
}

export interface DataTableGroup<T> {
    title: string;
    data: T[];
}

interface DataTableProps<T extends object> {
    title?: string;
    hideTitle?: boolean;
    columns: Column<T>[];
    data?: T[];
    groups?: DataTableGroup<T>[];
    loading?: boolean;
    showStt?: boolean;
    currentPage?: number;
    totalPages?: number;
    pageSize?: number;
    totalItems?: number;
    startItem?: number;
    endItem?: number;
    onPageChange?: (page: number) => void;
    onPageSizeChange?: (size: number) => void;
}

export function DataTable<T extends object>({
    title,
    hideTitle = false,
    columns,
    data = [],
    groups,
    loading = false,
    showStt = true,
    currentPage = 1,
    totalPages = 1,
    pageSize = 10,
    totalItems = 0,
    startItem = 0,
    endItem = 0,
    onPageChange,
    onPageSizeChange,
}: DataTableProps<T>) {
    const colCount = columns.length + (showStt ? 1 : 0);

    const renderRows = (rows: T[], sttOffset: number) =>
        rows.map((item, i) => (
            <TableRow key={i}>
                {showStt && (
                    <TableCell className="text-center">{sttOffset + i + 1}</TableCell>
                )}
                {columns.map((col, j) => (
                    <TableCell key={j} className={col.cellClass}>
                        {col.field != null
                            ? formatCellValue(item[col.field], col.viewType ?? CELL_VIEW_TYPES.TEXT)
                            : ""}
                    </TableCell>
                ))}
            </TableRow>
        ));

    return (
        <div className="border shadow-md">
            {!hideTitle && (
                <div className="bg-secondaryBlue text-white font-myriad w-full py-3 px-5">
                    {title}
                </div>
            )}
            <Table>
                <TableHeader>
                    <TableRow>
                        {showStt && (
                            <TableHead className="w-[12px] font-bold">TT</TableHead>
                        )}
                        {columns.map((col, i) => (
                            <TableHead key={i} className={col.className ?? "font-bold text-center"}>
                                {col.label}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading ? (
                        <TableSkeleton rows={pageSize} columns={colCount} />
                    ) : groups ? (
                        groups.map((group, g) => (
                            <Fragment key={g}>
                                <TableRow className="bg-slate-100 hover:bg-slate-100">
                                    <TableCell colSpan={colCount} className="font-bold">
                                        {group.title}
                                    </TableCell>
                                </TableRow>
                                {group.data.length > 0 ? (
                                    renderRows(group.data, 0)
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={colCount} className="text-center">
                                            <p>Không có dữ liệu</p>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </Fragment>
                        ))
                    ) : data.length > 0 ? (
                        renderRows(data, (currentPage - 1) * pageSize)
                    ) : (
                        <TableRow>
                            <TableCell colSpan={colCount} className="text-center">
                                <p>Không có dữ liệu</p>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {!loading && totalItems > 0 && onPageChange && onPageSizeChange && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    pageSize={pageSize}
                    totalItems={totalItems}
                    startItem={startItem}
                    endItem={endItem}
                    onPageChange={onPageChange}
                    onPageSizeChange={onPageSizeChange}
                />
            )}
        </div>
    );
}
