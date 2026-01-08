'use client'
import { ProfileUserApi } from "@/app/services/profile_user";
import TeacherNameBlock from "@/components/pages/teacher/teacher-name-block";
import TeacherSectionTitle from "@/components/pages/teacher/teacher-section-title";
import Loading from "@/components/ui/loading";
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
import { ICongBoKhoaHoc, IDetailProfile } from "@/models/profile.model";
import { useEffect, useState } from "react";

interface DataIdProfile {
  params: {
    mans: string;
  };
}

const CongBoKhoaHoc = ({ params }: DataIdProfile) => {
  const { mans } = params;
  const [listDeTai, setListDeTai] = useState<ICongBoKhoaHoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [profile, setProfile] = useState<IDetailProfile>();

  useEffect(() => {
    setLoading(true);
    Promise.all(
      [
        ProfileUserApi.getProfileById(mans),
        ProfileUserApi.getListProfileCongBoKhoaHoc(pageSize, currentPage, mans)
      ]).then(([profile, profileCongBoKhoaHoc]) => {
        setProfile(profile.data)
        setListDeTai(profileCongBoKhoaHoc.data.items)
        setTotalItems(profileCongBoKhoaHoc.data.totalItems)
      }).catch(err => console.error(err))
      .finally(() => {
        console.log(totalItems)
        setLoading(false)
      })
  }, [currentPage, pageSize])



  const totalPages = Math.ceil(totalItems / pageSize);
  const startItem = totalItems > 0 ? (currentPage - 1) * pageSize + 1 : 0;
  const endItem = Math.min(currentPage * pageSize, totalItems);
  return (
    <>

      {loading && <Loading size="md" text="Đang tải nội dung" />}
      {!loading && <div>
        <TeacherNameBlock
          hoTen={profile?.hoVaTen ?? ""}
          donVi={profile?.tenPhongBan ?? ""}
          hocHam={profile?.tenChucVu ?? ""}
          avatar={profile?.anhDaiDien}
        />
        <TeacherSectionTitle label={"Quá trình nghiên cứu khoa học"} />
        <div className="border shadow-md">
          <div className="bg-secondaryBlue text-white font-myriad w-full py-3 px-5">1. Các đề tài nghiên cứu khoa học đã tham gia</div>
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
              {listDeTai &&
                listDeTai.map((item, i) => (
                  <TableRow key={`${i}`}>
                    <TableCell className="text-center">{i + 1}</TableCell>
                    <TableCell>
                      <p>{item.tenDeTai}</p>
                      <p>
                        <span className="text-slate-400">Vai trò:</span>&nbsp;
                        <span className="text-red-600">{item.tenVaiTro}</span>
                      </p>
                    </TableCell>
                    <TableCell className="text-center">{item.ngayKetThuc?.split("-")[0]}</TableCell>
                    <TableCell className="text-center">{item.tenDeTai}</TableCell>
                  </TableRow>
                ))}
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
      </div>}

    </>

  );
};

export default CongBoKhoaHoc;
