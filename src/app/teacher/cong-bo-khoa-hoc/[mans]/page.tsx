'use client'
import { ProfileUserApi } from "@/app/services/profile_user";
import TeacherNameBlock from "@/components/pages/teacher/teacher-name-block";
import TeacherSectionTitle from "@/components/pages/teacher/teacher-section-title";
import Loading, { TableSkeleton } from "@/components/ui/loading";
import { Pagination } from "@/components/ui/pagination";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { IBaiBaoCongBo, ICongBoKhoaHoc, IDetailProfile, IGIaiThuongKHCN, ISachXuatBan } from "@/models/profile.model";
import { useEffect, useState } from "react";

interface DataIdProfile {
    params: {
        mans: string;
    };
}

const CongBoKhoaHoc = ({ params }: DataIdProfile) => {
    const { mans } = params;
    const [profile, setProfile] = useState<IDetailProfile>();
    const [profileLoading, setProfileLoading] = useState(true);
    // 
    const [listDeTai, setListDeTai] = useState<ICongBoKhoaHoc[]>([]);
    const [tableLoading, setTableLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    // 
    const [loadingBaiBaoCongBo, setloadingBaiBaoCongBo] = useState(true);
    const [listBaiBaoCongBo, setListBaiBaoCongBo] = useState<IBaiBaoCongBo[]>([]);
    const [currentPageBaiBao, setCurrentPageBaiBao] = useState(1);
    const [pageSizeBaiBao, setPageSizeBaiBao] = useState(10);
    const [totalItemsBaiBao, setTotalItemsBaiBao] = useState(0);
    // 
    const [loadingGiaiThuongKHCN, setloadingGiaiThuongKHCN] = useState(true);
    const [listGiaiThuongKHCN, setListGiaiThuongKHCN] = useState<IGIaiThuongKHCN[]>([]);
    const [currentPageGiaiThuongKHCN, setCurrentPageGiaiThuongKHCN] = useState(1);
    const [pageSizeGiaiThuongKHCN, setPageSizeGiaiThuongKHCN] = useState(10);
    const [totalItemsGiaiThuongKHCN, setTotalItemsGiaiThuongKHCN] = useState(0);
    //
    const [loadingSachXB, setloadingSachXB] = useState(true);
    const [listSachXB, setListSachXB] = useState<ISachXuatBan[]>([]);
    const [currentPageSachXB, setCurrentPageSachXB] = useState(1);
    const [pageSizeSachXB, setPageSizeSachXB] = useState(10);
    const [totalItemsSachXB, setTotalItemsSachXB] = useState(0);

    // 
    useEffect(() => {
        setProfileLoading(true);
        ProfileUserApi.getProfileById(mans)
            .then((res) => {
                setProfile(res.data);
            })
            .catch(err => console.error(err))
            .finally(() => {
                setProfileLoading(false);
            });
    }, [mans]);


    // 
    useEffect(() => {
        setTableLoading(true);
        ProfileUserApi.getListProfileCongBoKhoaHoc(pageSize, currentPage, mans)
            .then((res) => {
                setListDeTai(res.data.items);
                setTotalItems(res.data.totalItems);
            })
            .catch(err => console.error(err))
            .finally(() => {
                setTableLoading(false);
            });
    }, [currentPage, pageSize, mans]);


    // 
    useEffect(() => {
        setloadingBaiBaoCongBo(true);
        ProfileUserApi.getListBaiBaoCongBoKhoaHoc(pageSize, currentPage, mans)
            .then((res) => {
                setListBaiBaoCongBo(res.data.items);
                setTotalItemsBaiBao(res.data.totalItems);
            })
            .catch(err => console.error(err))
            .finally(() => {
                setloadingBaiBaoCongBo(false);
            });
    }, [currentPageBaiBao, pageSizeBaiBao, mans]);

    // 
    useEffect(() => {
        setloadingGiaiThuongKHCN(true);
        ProfileUserApi.getListGiaiThuongKHCN(pageSize, currentPage, mans)
            .then((res) => {
                setListGiaiThuongKHCN(res.data.items);
                setTotalItemsGiaiThuongKHCN(res.data.totalItems);
            })
            .catch(err => console.error(err))
            .finally(() => {
                setloadingGiaiThuongKHCN(false);
            });
    }, [currentPageGiaiThuongKHCN, pageSizeGiaiThuongKHCN, mans]);

    // 
    useEffect(() => {
        setloadingSachXB(true);
        ProfileUserApi.getListSachXuatBan(pageSize, currentPage, mans)
            .then((res) => {
                setListSachXB(res.data.items);
                setTotalItemsSachXB(res.data.totalItems);
            })
            .catch(err => console.error(err))
            .finally(() => {
                setloadingSachXB(false);
            });
    }, [currentPageSachXB, pageSizeSachXB, mans]);

    // 
    const totalPages = Math.ceil(totalItems / pageSize);
    const startItem = totalItems > 0 ? (currentPage - 1) * pageSize + 1 : 0;
    const endItem = Math.min(currentPage * pageSize, totalItems);
    // 
    const totalPagesBaiBao = Math.ceil(totalItems / pageSize);
    const startItemBaiBao = totalItems > 0 ? (currentPage - 1) * pageSize + 1 : 0;
    const endItemBaiBao = Math.min(currentPage * pageSize, totalItems);
    // 
    const totalPagesGiaiThuongKHCN = Math.ceil(totalItems / pageSize);
    const startItemGiaiThuongKHCN = totalItems > 0 ? (currentPage - 1) * pageSize + 1 : 0;
    const endItemGiaiThuongKHCN = Math.min(currentPage * pageSize, totalItems);
    // 
    const totalPagesSachXB = Math.ceil(totalItems / pageSize);
    const startItemSachXB = totalItems > 0 ? (currentPage - 1) * pageSize + 1 : 0;
    const endItemSachXB = Math.min(currentPage * pageSize, totalItems);

    return (
        <>
            {profileLoading && <Loading size="md" text="Đang tải thông tin giảng viên" />}
            {!profileLoading && (
                <div>
                    <TeacherNameBlock
                        hoTen={profile?.hoVaTen ?? ""}
                        donVi={profile?.tenPhongBan ?? ""}
                        hocHam={profile?.tenChucVu ?? ""}
                        avatar={profile?.anhDaiDien}
                    />
                    <TeacherSectionTitle label={"Quá trình nghiên cứu khoa học"} />
                    {/*1. Các đề tài nghiên cứu khoa học đã tham gia */}
                    <div className="border shadow-md">
                        <div className="bg-secondaryBlue text-white font-myriad w-full py-3 px-5">
                            1. Các đề tài nghiên cứu khoa học đã tham gia
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[12px] font-bold">TT</TableHead>
                                    <TableHead className="font-bold text-center">
                                        Tên đề tài
                                    </TableHead>
                                    <TableHead className="font-bold text-center">
                                        Năm hoàn thành
                                    </TableHead>
                                    <TableHead className="font-bold text-center">
                                        Đề tài cấp
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {tableLoading ? (
                                    <TableSkeleton rows={pageSize} columns={4} />
                                ) : (
                                    listDeTai &&
                                    listDeTai.map((item, i) => (
                                        <TableRow key={`${item.tenDeTai}-${i}`}>
                                            <TableCell className="text-center">
                                                {(currentPage - 1) * pageSize + i + 1}
                                            </TableCell>
                                            <TableCell>
                                                <p>{item.tenDeTai}</p>
                                                <p>
                                                    <span className="text-slate-400">Vai trò:</span>&nbsp;
                                                    <span className="text-red-600">{item.tenVaiTro}</span>
                                                </p>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {item.ngayKetThuc?.split("-")[0]}
                                            </TableCell>
                                            <TableCell className="text-center">{item.tenDeTai}</TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                        {/* Pagination */}
                        {!tableLoading && totalItems > 0 && (
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
                    {/*  */}
                    <div className="p-5"></div>
                    {/*2. Các công trình khoa học đã công bố */}
                    <div className="border shadow-md">
                        <div className="bg-secondaryBlue text-white font-myriad w-full py-3 px-5">
                            2. Báo cáo khoa học tại hội nghị, hội thảo
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[12px] font-bold">TT</TableHead>
                                    <TableHead className="font-bold text-center">
                                        Tên bài báo
                                    </TableHead>
                                    <TableHead className="font-bold text-center">
                                        Tên tạp chí
                                    </TableHead>
                                    <TableHead className="font-bold text-center">
                                        Ngày xuất bản
                                    </TableHead>
                                    <TableHead className="font-bold text-center">
                                        Số giờ quy đổi
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loadingBaiBaoCongBo ? (
                                    <TableSkeleton rows={pageSizeBaiBao} columns={4} />
                                ) : (
                                    listBaiBaoCongBo &&
                                    listBaiBaoCongBo.map((item, i) => (
                                        <TableRow key={`${item.tenBaiBao}-${i}`}>
                                            <TableCell className="text-center">
                                                {(currentPage - 1) * pageSize + i + 1}
                                            </TableCell>
                                            <TableCell>
                                                <p>{item.tenBaiBao}</p>
                                            </TableCell>
                                            <TableCell className="text-center">{item.tenTapChi}</TableCell>
                                            <TableCell className="text-center">
                                                {item.ngayXuatBan?.split("-")[0]}
                                            </TableCell>
                                            <TableCell className="text-center">{item.soGioQuyDoi}</TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                        {/* Pagination */}
                        {!loadingBaiBaoCongBo && totalItemsBaiBao > 0 && (
                            <Pagination
                                currentPage={currentPageBaiBao}
                                totalPages={totalPagesBaiBao}
                                pageSize={pageSizeBaiBao}
                                totalItems={totalItemsBaiBao}
                                startItem={startItemBaiBao}
                                endItem={endItemBaiBao}
                                onPageChange={setCurrentPageBaiBao}
                                onPageSizeChange={setPageSizeBaiBao}
                            />
                        )}
                    </div>
                    {/*  */}
                    <div className="p-5"></div>
                    {/* Giải thưởng khoa học công nghệ */}
                    <div className="border shadow-md">
                        <div className="bg-secondaryBlue text-white font-myriad w-full py-3 px-5">
                            3. Giải thưởng khoa học công nghệ
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[12px] font-bold">TT</TableHead>
                                    <TableHead className="font-bold text-center">
                                        Tên giải thưởng
                                    </TableHead>
                                    <TableHead className="font-bold text-center">
                                        Tên công trình
                                    </TableHead>
                                    <TableHead className="font-bold text-center">
                                        Ngày xuất bản
                                    </TableHead>
                                    <TableHead className="font-bold text-center">
                                        Số giờ quy đổi
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loadingGiaiThuongKHCN ? (
                                    <TableSkeleton rows={pageSizeGiaiThuongKHCN} columns={4} />
                                ) : (
                                    listGiaiThuongKHCN &&
                                    listGiaiThuongKHCN.map((item, i) => (
                                        <TableRow key={`${item.tenGiaiThuong}-${i}`}>
                                            <TableCell className="text-center">
                                                {(currentPage - 1) * pageSize + i + 1}
                                            </TableCell>
                                            <TableCell>
                                                <p>{item.tenGiaiThuong}</p>
                                            </TableCell>
                                            <TableCell className="text-center">{item.tenGiaiThuong}</TableCell>
                                            <TableCell className="text-center">
                                                {item.ngayCap?.split("-")[0]}
                                            </TableCell>
                                            <TableCell className="text-center">{item.soGioQuyDoi}</TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                        {/* Pagination */}
                        {!loadingGiaiThuongKHCN && totalItemsGiaiThuongKHCN > 0 && (
                            <Pagination
                                currentPage={currentPageGiaiThuongKHCN}
                                totalPages={totalPagesGiaiThuongKHCN}
                                pageSize={pageSizeGiaiThuongKHCN}
                                totalItems={totalItemsGiaiThuongKHCN}
                                startItem={startItemGiaiThuongKHCN}
                                endItem={endItemGiaiThuongKHCN}
                                onPageChange={setCurrentPageBaiBao}
                                onPageSizeChange={setPageSizeBaiBao}
                            />
                        )}
                    </div>
                    {/*  */}
                    <div className="p-5"></div>
                    {/* Sách xuất bản */}
                    <div className="border shadow-md">
                        <div className="bg-secondaryBlue text-white font-myriad w-full py-3 px-5">
                            4. Sách xuất bản
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[12px] font-bold">TT</TableHead>
                                    <TableHead className="font-bold text-center">
                                        Tên
                                    </TableHead>
                                    <TableHead className="font-bold text-center">
                                        Nhà xuất bản
                                    </TableHead>
                                    <TableHead className="font-bold text-center">
                                        Ngày xuất bản
                                    </TableHead>
                                    <TableHead className="font-bold text-center">
                                        Số giờ quy đổi
                                    </TableHead>
                                    <TableHead className="font-bold text-center">
                                        Niên học
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loadingSachXB ? (
                                    <TableSkeleton rows={pageSizeSachXB} columns={4} />
                                ) : (
                                    listSachXB &&
                                    listSachXB.map((item, i) => (
                                        <TableRow key={`${item.ten}-${i}`}>
                                            <TableCell className="text-center">
                                                {(currentPage - 1) * pageSize + i + 1}
                                            </TableCell>
                                            <TableCell>
                                                <p>{item.ten}</p>
                                            </TableCell>
                                            <TableCell className="text-center">{item.nhaXuatBan}</TableCell>
                                            <TableCell className="text-center">
                                                {item.ngayXuatBan?.split("-")[0]}
                                            </TableCell>
                                            <TableCell className="text-center">{item.soGioQuyDoi}</TableCell>
                                            <TableCell className="text-center">{item.nienHoc}</TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                        {/* Pagination */}
                        {!loadingSachXB && totalItemsSachXB > 0 && (
                            <Pagination
                                currentPage={currentPageSachXB}
                                totalPages={totalPagesSachXB}
                                pageSize={pageSizeSachXB}
                                totalItems={totalItemsSachXB}
                                startItem={startItemSachXB}
                                endItem={endItemSachXB}
                                onPageChange={setCurrentPageSachXB}
                                onPageSizeChange={setPageSizeSachXB}
                            />
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default CongBoKhoaHoc;
