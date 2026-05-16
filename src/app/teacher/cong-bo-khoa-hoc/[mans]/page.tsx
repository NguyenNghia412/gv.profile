"use client";
import { ProfileUserApi } from "@/app/services/profile_user";
import { CELL_VIEW_TYPES, DataTable } from "@/components/pages/data-table";
import TeacherNameBlock from "@/components/pages/teacher/teacher-name-block";
import TeacherSectionTitle from "@/components/pages/teacher/teacher-section-title";
import Loading from "@/components/ui/loading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  IBaiBaoCongBo,
  ICongBoKhoaHoc,
  IDetailProfile,
  IGIaiThuongKHCN,
  ISachXuatBan,
  ITriTue,
} from "@/models/profile.model";
import { useEffect, useState } from "react";

interface DataIdProfile {
  params: {
    mans: string;
  };
}

function usePagination(initialPageSize = 10) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [totalItems, setTotalItems] = useState(0);

  const totalPages = Math.ceil(totalItems / pageSize);
  const startItem = totalItems > 0 ? (currentPage - 1) * pageSize + 1 : 0;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return {
    setTotalItems,
    tableProps: {
      currentPage,
      pageSize,
      totalItems,
      totalPages,
      startItem,
      endItem,
      onPageChange: setCurrentPage,
      onPageSizeChange: setPageSize,
    },
  };
}

const CongBoKhoaHoc = ({ params }: DataIdProfile) => {
  const { mans } = params;
  const [profile, setProfile] = useState<IDetailProfile>();
  const [profileLoading, setProfileLoading] = useState(true);

  const deTai = usePagination();
  const [listDeTai, setListDeTai] = useState<ICongBoKhoaHoc[]>([]);
  const [loadingDeTai, setLoadingDeTai] = useState(true);

  const baiBao = usePagination();
  const [listBaiBaoCongBo, setListBaiBaoCongBo] = useState<IBaiBaoCongBo[]>([]);
  const [loadingBaiBaoCongBo, setLoadingBaiBaoCongBo] = useState(true);

  const giaiThuong = usePagination();
  const [listGiaiThuongKHCN, setListGiaiThuongKHCN] = useState<IGIaiThuongKHCN[]>([]);
  const [loadingGiaiThuongKHCN, setLoadingGiaiThuongKHCN] = useState(true);

  const sachXB = usePagination();
  const [listSachXB, setListSachXB] = useState<ISachXuatBan[]>([]);
  const [loadingSachXB, setLoadingSachXB] = useState(true);

  const triTue = usePagination();
  const [listTriTue, setListTriTue] = useState<ITriTue[]>([]);
  const [loadingTriTue, setLoadingTriTue] = useState(true);

  useEffect(() => {
    setProfileLoading(true);
    ProfileUserApi.getProfileById(mans)
      .then((res) => setProfile(res.data))
      .catch((err) => console.error(err))
      .finally(() => setProfileLoading(false));
  }, [mans]);

  useEffect(() => {
    setLoadingDeTai(true);
    ProfileUserApi.getListProfileCongBoKhoaHoc(
      deTai.tableProps.pageSize, deTai.tableProps.currentPage, mans
    )
      .then((res) => {
        setListDeTai(res.data.items);
        deTai.setTotalItems(res.data.totalItems);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoadingDeTai(false));
  }, [deTai.tableProps.currentPage, deTai.tableProps.pageSize, mans]);

  useEffect(() => {
    setLoadingBaiBaoCongBo(true);
    ProfileUserApi.getListBaiBaoCongBoKhoaHoc(
      baiBao.tableProps.pageSize, baiBao.tableProps.currentPage, mans
    )
      .then((res) => {
        setListBaiBaoCongBo(res.data.items);
        baiBao.setTotalItems(res.data.totalItems);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoadingBaiBaoCongBo(false));
  }, [baiBao.tableProps.currentPage, baiBao.tableProps.pageSize, mans]);

  useEffect(() => {
    setLoadingGiaiThuongKHCN(true);
    ProfileUserApi.getListGiaiThuongKHCN(
      giaiThuong.tableProps.pageSize, giaiThuong.tableProps.currentPage, mans
    )
      .then((res) => {
        setListGiaiThuongKHCN(res.data.items);
        giaiThuong.setTotalItems(res.data.totalItems);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoadingGiaiThuongKHCN(false));
  }, [giaiThuong.tableProps.currentPage, giaiThuong.tableProps.pageSize, mans]);

  useEffect(() => {
    setLoadingSachXB(true);
    ProfileUserApi.getListSachXuatBan(
      sachXB.tableProps.pageSize, sachXB.tableProps.currentPage, mans
    )
      .then((res) => {
        setListSachXB(res.data.items);
        sachXB.setTotalItems(res.data.totalItems);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoadingSachXB(false));
  }, [sachXB.tableProps.currentPage, sachXB.tableProps.pageSize, mans]);

  useEffect(() => {
    setLoadingTriTue(true);
    ProfileUserApi.getListTriTue(
      triTue.tableProps.pageSize, triTue.tableProps.currentPage, mans
    )
      .then((res) => {
        setListTriTue(res.data.items);
        triTue.setTotalItems(res.data.totalItems);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoadingTriTue(false));
  }, [triTue.tableProps.currentPage, triTue.tableProps.pageSize, mans]);

  return (
    <>
      {profileLoading && (
        <Loading size="md" text="Đang tải thông tin giảng viên" />
      )}
      {!profileLoading && (
        <div>
          <TeacherNameBlock
            hoTen={profile?.hoVaTen ?? ""}
            donVi={profile?.tenPhongBan ?? ""}
            hocHam={profile?.tenChucVu ?? ""}
            avatar={profile?.anhDaiDien}
          />
          <TeacherSectionTitle label={"Quá trình nghiên cứu khoa học"} />

          {/* 1. Hướng nghiên cứu chính */}
          <div className="border shadow-md">
            <div className="bg-secondaryBlue text-white font-myriad w-full py-3 px-5">
              1. Hướng nghiên cứu chính
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[12px] font-bold">TT</TableHead>
                  <TableHead className="font-bold text-center">Nội dung</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableCell colSpan={2} className="text-center">
                  <p>Không có dữ liệu</p>
                </TableCell>
              </TableBody>
            </Table>
          </div>

          <div className="p-5" />

          {/* 2. Các dự án, nhiệm vụ KHCN */}
          <DataTable<ICongBoKhoaHoc>
            title="2. Các dự án, nhiệm vụ KHCN"
            columns={[
              { label: "Tên đề tài", field: "tenDeTai" },
              { label: "Năm hoàn thành", field: "ngayKetThuc", cellClass: "text-center", viewType: CELL_VIEW_TYPES.DATE },
              { label: "Lĩnh vực", field: "tenLinhVuc", cellClass: "text-center" },
            ]}
            data={listDeTai}
            loading={loadingDeTai}
            {...deTai.tableProps}
          />

          <div className="p-5" />

          {/* 3. Công bố khoa học trên tạp chí trong nước, quốc tế */}
          <DataTable<IBaiBaoCongBo>
            title="3. Công bố khoa học trên tạp chí trong nước, quốc tế"
            columns={[
              { label: "Tên bài báo", field: "tenBaiBao" },
              { label: "Tên tạp chí", field: "tenTapChi", cellClass: "text-center" },
              { label: "Ngày xuất bản", field: "ngayXuatBan", cellClass: "text-center", viewType: CELL_VIEW_TYPES.DATE },
              { label: "Số giờ quy đổi", field: "soGioQuyDoi", cellClass: "text-center" },
            ]}
            data={[]}
            loading={false}
            {...baiBao.tableProps}
          />

          <div className="p-5" />

          {/* 4. Báo cáo khoa học tại hội nghị, hội thảo */}
          <DataTable<IBaiBaoCongBo>
            title="4. Báo cáo khoa học tại hội nghị, hội thảo"
            columns={[
              { label: "Tên bài báo", field: "tenBaiBao" },
              { label: "Tên tạp chí", field: "tenTapChi", cellClass: "text-center" },
              { label: "Ngày xuất bản", field: "ngayXuatBan", cellClass: "text-center", viewType: CELL_VIEW_TYPES.DATE },
              { label: "Số giờ quy đổi", field: "soGioQuyDoi", cellClass: "text-center" },
            ]}
            data={listBaiBaoCongBo}
            loading={loadingBaiBaoCongBo}
            {...baiBao.tableProps}
          />

          <div className="p-5" />

          {/* 5. Sở hữu trí tuệ */}
          <DataTable<ITriTue>
            title="5. Sở hữu trí tuệ"
            columns={[
              { label: "Tên tài sản trí tuệ", field: "tenTaiSanTriTue" },
              { label: "Số hiệu", field: "soHieu", cellClass: "text-center" },
              { label: "Ngày cấp bằng", field: "ngayCapBang", cellClass: "text-center", viewType: CELL_VIEW_TYPES.DATE },
              { label: "Số giờ quy đổi", field: "soGioQuyDoi", cellClass: "text-center" },
              { label: "Niên học", field: "nienHoc", cellClass: "text-center" },
            ]}
            data={listTriTue}
            loading={loadingTriTue}
            {...triTue.tableProps}
          />

          <div className="p-5" />

          {/* 6. Sách xuất bản */}
          <DataTable<ISachXuatBan>
            title="6. Sách xuất bản"
            columns={[
              { label: "Tên", field: "ten" },
              { label: "Nhà xuất bản", field: "nhaXuatBan", cellClass: "text-center" },
              { label: "Ngày xuất bản", field: "ngayXuatBan", cellClass: "text-center", viewType: CELL_VIEW_TYPES.DATE },
              { label: "Số giờ quy đổi", field: "soGioQuyDoi", cellClass: "text-center" },
              { label: "Niên học", field: "nienHoc", cellClass: "text-center" },
            ]}
            data={listSachXB}
            loading={loadingSachXB}
            {...sachXB.tableProps}
          />

          <div className="p-5" />

          {/* 7. Giải thưởng khoa học công nghệ */}
          <DataTable<IGIaiThuongKHCN>
            title="7. Giải thưởng khoa học công nghệ"
            columns={[
              { label: "Tên giải thưởng", field: "tenGiaiThuong" },
              { label: "Tên công trình", field: "tenCongTrinh", cellClass: "text-center" },
              { label: "Ngày cấp", field: "ngayCap", cellClass: "text-center", viewType: CELL_VIEW_TYPES.DATE },
              { label: "Số giờ quy đổi", field: "soGioQuyDoi", cellClass: "text-center" },
            ]}
            data={listGiaiThuongKHCN}
            loading={loadingGiaiThuongKHCN}
            {...giaiThuong.tableProps}
          />

          <div className="p-5" />
        </div>
      )}
    </>
  );
};

export default CongBoKhoaHoc;
