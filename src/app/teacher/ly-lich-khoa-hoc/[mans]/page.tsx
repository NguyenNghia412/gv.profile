"use client";
import { ProfileUserApi } from "@/app/services/profile_user";
import { CELL_VIEW_TYPES, DataTable } from "@/components/pages/data-table";
import LoginToView from "@/components/pages/login-to-view";
import TeacherItemInfo from "@/components/pages/teacher/teacher-item-info";
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
  IBaiBaoCongBoGroup,
  ICongBoKhoaHoc,
  IDetailProfile,
  IGIaiThuongKHCN,
  ISachXuatBan,
  ITriTue,
  IViewRowQuaTrinhCongTac,
  IViewRowQuaTrinhDaoTao,
} from "@/models/profile.model";
import {
  LocateFixed,
  Mail,
  MapPin,
  MapPinned,
  Phone,
  VenusAndMars,
} from "lucide-react";
import { Fragment, ReactNode, useEffect, useState } from "react";
import QuaTrinhCongTac from "./qua-trinh-cong-tac";
import QuaTrinhDaoTao from "./qua-trinh-dao-tao";

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

type SachXuatBanRow = ISachXuatBan & { loaiSach: string };

const LyLichKhoaHoc = ({ params }: DataIdProfile) => {
  const { mans } = params;
  const [profile, setProfile] = useState<IDetailProfile>();
  const [profileLoading, setProfileLoading] = useState(true);

  const [quaTrinhDaoTao, setQuaTrinhDaoTao] = useState<IViewRowQuaTrinhDaoTao[]>([]);
  const [loadingQuaTrinhDaoTao, setLoadingQuaTrinhDaoTao] = useState(true);

  const [quaTrinhCongTac, setQuaTrinhCongTac] = useState<IViewRowQuaTrinhCongTac[]>([]);
  const [loadingQuaTrinhCongTac, setLoadingQuaTrinhCongTac] = useState(true);

  const deTai = usePagination();
  const [listDeTai, setListDeTai] = useState<ICongBoKhoaHoc[]>([]);
  const [loadingDeTai, setLoadingDeTai] = useState(true);

  const [baiBaoCongBo, setBaiBaoCongBo] = useState<IBaiBaoCongBoGroup>({});
  const [loadingBaiBaoCongBo, setLoadingBaiBaoCongBo] = useState(true);

  const [listGiaiThuongKHCN, setListGiaiThuongKHCN] = useState<IGIaiThuongKHCN[]>([]);
  const [loadingGiaiThuongKHCN, setLoadingGiaiThuongKHCN] = useState(true);

  const sachXB = usePagination(50);
  const [listSachXB, setListSachXB] = useState<SachXuatBanRow[]>([]);
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

    setLoadingQuaTrinhDaoTao(true);
    ProfileUserApi.getQuaTrinhDaoTao(mans)
      .then((res) => setQuaTrinhDaoTao(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoadingQuaTrinhDaoTao(false));

    setLoadingQuaTrinhCongTac(true);
    ProfileUserApi.getQuaTrinhCongTac(mans)
      .then((res) => setQuaTrinhCongTac(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoadingQuaTrinhCongTac(false));
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
    ProfileUserApi.getListBaiBaoCongBoKhoaHoc(mans)
      .then((res) => setBaiBaoCongBo(res.data ?? {}))
      .catch((err) => console.error(err))
      .finally(() => setLoadingBaiBaoCongBo(false));
  }, [mans]);

  useEffect(() => {
    setLoadingGiaiThuongKHCN(true);
    ProfileUserApi.getListGiaiThuongKHCN(mans)
      .then((res) => setListGiaiThuongKHCN(res.data ?? []))
      .catch((err) => console.error(err))
      .finally(() => setLoadingGiaiThuongKHCN(false));
  }, [mans]);

  useEffect(() => {
    setLoadingSachXB(true);
    ProfileUserApi.getListSachXuatBan(
      sachXB.tableProps.pageSize, sachXB.tableProps.currentPage, mans
    )
      .then((res) => {
        setListSachXB(
          (res.data.items ?? []).map((item) => ({
            ...item,
            loaiSach: [item.tenNhomTheLoai, item.chiSoISBN].filter(Boolean).join(", "),
          }))
        );
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

  // Số thứ tự các bảng được đánh tự động theo vị trí trong mảng
  const researchSections: { title: string; render: (no: number) => ReactNode }[] = [
    {
      title: "Hướng nghiên cứu chính",
      render: (no) => (
        <div className="border shadow-md">
          <div className="bg-secondaryBlue text-white font-myriad w-full py-3 px-5">
            {no}. Hướng nghiên cứu chính
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
      ),
    },
    {
      title: "Các dự án, nhiệm vụ KHCN",
      render: (no) => (
        <DataTable<ICongBoKhoaHoc>
          title={`${no}. Các dự án, nhiệm vụ KHCN`}
          columns={[
            { label: "Tên đề tài", field: "tenDeTai" },
            { label: "Năm hoàn thành", field: "ngayKetThuc", cellClass: "text-center", viewType: CELL_VIEW_TYPES.DATE },
            { label: "Lĩnh vực", field: "tenLinhVuc", cellClass: "text-center" },
          ]}
          data={listDeTai}
          loading={loadingDeTai}
          {...deTai.tableProps}
        />
      ),
    },
    {
      title: "Công bố khoa học trên tạp chí trong nước, quốc tế",
      render: (no) => (
        <DataTable<IBaiBaoCongBo>
          title={`${no}. Công bố khoa học trên tạp chí trong nước, quốc tế`}
          columns={[
            { label: "Tên bài báo", field: "tenBaiBao" },
            { label: "Tên các tác giả", field: "tenTacGia" },
            { label: "Tên tạp chí/hội thảo, số, tập, trang, số ISSN, số DOI, chỉ số H Index", field: "tenTapChi" },
            { label: "Năm công bố", field: "ngayXuatBan", cellClass: "text-center", viewType: CELL_VIEW_TYPES.YEAR },
          ]}
          groups={[
            { title: "Bài báo quốc tế thuộc danh mục ISI", data: baiBaoCongBo.isi ?? [] },
            { title: "Bài báo quốc tế thuộc danh mục Scopus", data: baiBaoCongBo.scopus ?? [] },
            { title: "Bài báo tạp chí, hội thảo quốc tế khác", data: baiBaoCongBo.quocTeKhac ?? [] },
            { title: "Bài báo trên tạp chí khoa học trong nước thuộc danh mục HDGSNN", data: baiBaoCongBo.hdgsnn ?? [] },
            { title: "Bài báo tạp chí, hội thảo khoa học khác", data: baiBaoCongBo.khac ?? [] },
          ].map((group, j) => ({ ...group, title: `${no}.${j + 1}. ${group.title}` }))}
          loading={loadingBaiBaoCongBo}
        />
      ),
    },
    {
      title: "Sở hữu trí tuệ",
      render: (no) => (
        <DataTable<ITriTue>
          title={`${no}. Sở hữu trí tuệ`}
          columns={[
            { label: "Tên và nội dung văn bằng", field: "tenTaiSanTriTue" },
            { label: "Tác giả", field: "thanhPhanThamGia" },
            { label: "Số bằng", field: "soHieu", cellClass: "text-center" },
            { label: "Ngày cấp bằng", field: "ngayCapBang", cellClass: "text-center", viewType: CELL_VIEW_TYPES.DATE },
          ]}
          data={listTriTue}
          loading={loadingTriTue}
          {...triTue.tableProps}
        />
      ),
    },
    {
      title: "Sách xuất bản",
      render: (no) => (
        <DataTable<SachXuatBanRow>
          title={`${no}. Sách xuất bản`}
          columns={[
            { label: "Tên sách", field: "ten" },
            { label: "Nhà xuất bản", field: "nhaXuatBan", cellClass: "text-center" },
            { label: "Tên các tác giả", field: "dsThanhPhanThamGia" },
            { label: "Loại sách", field: "loaiSach" },
          ]}
          data={listSachXB}
          loading={loadingSachXB}
          {...sachXB.tableProps}
        />
      ),
    },
    {
      title: "Giải thưởng khoa học công nghệ",
      render: (no) => (
        <DataTable<IGIaiThuongKHCN>
          title={`${no}. Giải thưởng khoa học công nghệ`}
          columns={[
            { label: "Tên giải thưởng, tên công trình", field: "tenGiaiThuong" },
            { label: "Thứ hạng", field: "thuHang", cellClass: "text-center" },
            { label: "Năm tặng thưởng", field: "ngayCap", cellClass: "text-center", viewType: CELL_VIEW_TYPES.YEAR },
            { label: "Mô tả", field: "moTa", className: "font-bold text-center w-1/4", cellClass: "w-1/4 break-words" },
          ]}
          data={listGiaiThuongKHCN}
          loading={loadingGiaiThuongKHCN}
        />
      ),
    },
    {
      title: "Các thông tin về chỉ số nghiên cứu",
      render: (no) => {
        const chiSo = profile?.chiSoNghienCuu;
        const items = [
          {
            label: "Chỉ số định danh ORCID",
            rows: [
              { label: "Mã số tài khoản", value: chiSo?.orcidAccount },
              { label: "Link", value: chiSo?.linkOrcidAccount, isLink: true },
            ],
          },
          {
            label: "Hồ sơ Google scholar",
            rows: [
              { label: "Tên tài khoản", value: chiSo?.gScholarAccount },
              { label: "Link", value: chiSo?.linkGScholarAccount, isLink: true },
            ],
          },
        ];
        return (
          <div className="border shadow-md">
            <div className="bg-secondaryBlue text-white font-myriad w-full py-3 px-5">
              {no}. Các thông tin về chỉ số nghiên cứu
            </div>
            <ul className="px-5 py-3 space-y-3 text-sm text-slate-600">
              {items.map((item) => (
                <li key={item.label}>
                  <p className="font-bold">- {item.label}:</p>
                  <ul className="pl-6 mt-1 space-y-1">
                    {item.rows.map((row) => (
                      <li key={row.label}>
                        + {row.label}:{" "}
                        {row.value && row.isLink ? (
                          <a href={row.value} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
                            {row.value}
                          </a>
                        ) : (
                          row.value
                        )}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        );
      },
    },
  ];

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

          {/* ===== Thông tin chung ===== */}
          <TeacherSectionTitle label={"Lý lịch sơ lược"} />
          <div className="grid grid-cols-2 gap-2 text-slate-600">
            <div className="border shadow-md">
              <TeacherItemInfo icon={VenusAndMars} label="Giới tính" value={profile?.gioiTinh ? "Nam" : "Nữ"} />
              <hr />
              <TeacherItemInfo icon={MapPin} label="Tỉnh/Thành phố" value={profile?.noiSinh} />
              <hr />
              <TeacherItemInfo icon={Mail} label="Email" value={profile?.email} />
            </div>
            <div className="border shadow-md">
              <TeacherItemInfo icon={MapPinned} label="Cơ sở" value="Hà Nội" />
              <hr />
              <TeacherItemInfo icon={LocateFixed} label="Đơn vị" value={profile?.tenPhongBan} />
              <hr />
              <TeacherItemInfo icon={Phone} label="Điện thoại" isNeedLogin={false} value={profile?.soDienThoai} />
            </div>
          </div>

          <TeacherSectionTitle label={"Quá trình đào tạo"} />
          <LoginToView>
            <QuaTrinhDaoTao data={quaTrinhDaoTao} loading={loadingQuaTrinhDaoTao} />
          </LoginToView>

          <h3 className="my-8 font-semibold text-3xl text-slate-600">
            Quá trình công tác chuyên môn
          </h3>
          <LoginToView>
            <QuaTrinhCongTac data={quaTrinhCongTac} loading={loadingQuaTrinhCongTac} />
          </LoginToView>

          {/* ===== Công bố khoa học ===== */}
          <TeacherSectionTitle label={"Quá trình nghiên cứu khoa học"} />

          {researchSections.map((section, i) => (
            <Fragment key={section.title}>
              {section.render(i + 1)}
              <div className="p-5" />
            </Fragment>
          ))}
        </div>
      )}
    </>
  );
};

export default LyLichKhoaHoc;
