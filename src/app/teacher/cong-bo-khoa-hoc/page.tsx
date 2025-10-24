import TeacherNameBlock from "@/components/pages/teacher/teacher-name-block";
import TeacherSectionTitle from "@/components/pages/teacher/teacher-section-title";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IDeTaiNckh } from "@/models/de-tai-nckh.model";
import { Link } from "lucide-react";

const CongBoKhoaHoc = () => {
  const listDeTai: IDeTaiNckh[] = [
    {
      stt: 1,
      tenDeTai:
        "Nghiên cứu thiết kế chế tạo hệ thộng tự động bổ sung khí cho động cơ Điezen tăng áp bằng tua bin khí xả",
      vaiTro: "Chủ nhiệm",
      namHoanThanh: "2004",
      deTaiCap: "Cấp Bộ",
    },
    {
      stt: 2,
      tenDeTai:
        "Nghiên cứu chế tạo thiết bị kiểm tra ECU của các xe ô tô đời mới",
      vaiTro: "Chủ nhiệm",
      namHoanThanh: "2005",
      deTaiCap: "Cấp Bộ",
    },
    {
      stt: 3,
      tenDeTai:
        'Đề án "Xây dựng Sổ tay hướng dẫn đánh giá phát thải và kiểm soát ô nhiễm phương tiện cơ giới đường bộ"',
      vaiTro: "Chủ nhiệm",
      namHoanThanh: "2008",
      deTaiCap: "Cấp Bộ",
    },
    {
      stt: 4,
      tenDeTai:
        'Dự án "Chế tạo thử nghiệm ô tô hybrid điện trên cơ sở hoán cải một mẫu xe đang sử dụng phổ biến tại Việt Nam"',
      vaiTro: "Chủ nhiệm",
      namHoanThanh: "2010",
      deTaiCap: "Cấp Bộ",
    },
    {
      stt: 5,
      tenDeTai:
        'Dự án "Xây dựng sổ tay hướng dẫn nâng cao hiệu quả sử dụng nhiên liệu trong hệ thống động lực tàu thuỷ"',
      vaiTro: "Chủ nhiệm",
      namHoanThanh: "2010",
      deTaiCap: "Cấp Bộ",
    },
  ];

  return (
    <div>
      <TeacherNameBlock
        hoTen="Vũ Ngọc Khiêm"
        donVi="Hội đồng Trường"
        hocHam="PGS.TS"
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
                  <TableCell className="text-center">{item.stt}</TableCell>
                  <TableCell>
                    <p>{item.tenDeTai}</p>
                    <p>
                      <span className="text-slate-400">Vai trò:</span>&nbsp;
                      <span className="text-red-600">{item.vaiTro}</span>
                    </p>
                  </TableCell>
                  <TableCell className="text-center">{item.namHoanThanh}</TableCell>
                  <TableCell className="text-center">{item.deTaiCap}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CongBoKhoaHoc;
