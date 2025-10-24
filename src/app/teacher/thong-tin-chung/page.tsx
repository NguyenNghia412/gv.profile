import LoginToView from "@/components/pages/login-to-view";
import TeacherItemInfo from "@/components/pages/teacher/teacher-item-info";
import TeacherNameBlock from "@/components/pages/teacher/teacher-name-block";
import TeacherSectionTitle from "@/components/pages/teacher/teacher-section-title";
import {
  Building,
  LocateFixed,
  Mail,
  MapPin,
  MapPinned,
  Phone,
  User,
  VenusAndMars,
} from "lucide-react";

const TeacherThongTinChungPage = () => {
  return (
    <div>
      <TeacherNameBlock
        hoTen="Vũ Ngọc Khiêm"
        donVi="Hội đồng Trường"
        hocHam="PGS.TS"
      />

      <TeacherSectionTitle label={"Lý lịch sơ lược"} />
      <div className="grid grid-cols-2 gap-2 text-slate-600">
        <div className="border shadow-md">
          <TeacherItemInfo icon={User} label="Ngày sinh" isNeedLogin={true} />
          <hr />
          <TeacherItemInfo icon={VenusAndMars} label="Giới tính" value="Nam" />
          <hr />
          <TeacherItemInfo
            icon={MapPin}
            label="Tỉnh/Thành phố"
            value="Thanh Hoá"
          />
          <hr />
          <TeacherItemInfo
            icon={Building}
            label="Địa chỉ"
            value="Số 54 Phố Triều Khúc, phường Thanh Xuân Nam, quận Thanh Xuân, thành phố Hà Nội"
          />
        </div>
        <div className="border shadow-md">
          <TeacherItemInfo icon={MapPinned} label="Cơ sở" value="Hà Nội" />
          <hr />
          <TeacherItemInfo
            icon={LocateFixed}
            label="Đơn vị"
            value="Hội đồng trường"
          />
          <hr />
          <TeacherItemInfo
            icon={Mail}
            label="Email"
            value="khiemvn@utt.edu.vn"
          />
          <hr />
          <TeacherItemInfo icon={Phone} label="Điện thoại" isNeedLogin={true} />
        </div>
      </div>
      <TeacherSectionTitle label={"Quá trình đào tạo"} />
      <div>
        <LoginToView />
      </div>
      <h3 className="my-8 font-semibold text-3xl text-slate-600">
        Quá trình công tác chuyên môn
      </h3>
      <div>
        <LoginToView />
      </div>
    </div>
  );
};

export default TeacherThongTinChungPage;
